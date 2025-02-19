import { EventEmitter } from 'events'
import pino from 'pino'
import snap7 from 'node-snap7'
import { ReadArea } from '../../../lib/utils7.js'
import { updateBits } from '../../../models/Bit.js'

const logger = pino()

class PLC extends EventEmitter {
  constructor (plc) {
    super()
    this.client = new snap7.S7Client()
    this.online = false
    this.params = plc
  }

  async error (e) {
    this.online = !this.client.Disconnect()
    isNaN(e) ? logger.error(e) : logger.error(this.client.ErrorText(e))
  }

  async main (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ_SH
      const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
      await Promise.all([
        updateBits(def.DB_DATA_INIT_AB_SH, buffer, obj.abSH),
        updateBits(def.DB_DATA_INIT_EB_SH, buffer, obj.ebSH)
      ])
    } catch (e) {
      this.error(e)
    } finally {
      // obj.racks.forEach((rack, key) => rack?.rack && this.publish('aps/racks/' + key, rack.rack))
    }
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(this.params.ip, this.params.rack, this.params.slot)
      this.forever(def, obj)
    } catch (e) {
      this.error(e)
    }
  }

  forever (def, obj) {
    setTimeout(() => {
      // const ping = process.hrtime()
      if (this.online) {
        this.main(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', this.params.ip) : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      if (this.online_ !== this.online) {
        this.online_ = this.online
      }
      // main cycle execution time
      // const pong = process.hrtime(ping)
      // const latency = (pong[0] * 1000000000 + pong[1]) / 1000000
      // console.log('forever execution time in millisecond is: ', latency)
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

export default PLC
