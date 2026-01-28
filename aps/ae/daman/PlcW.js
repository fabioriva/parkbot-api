import { EventEmitter } from 'events'
import pino from 'pino'
import snap7 from 'node-snap7'
import { ReadArea } from '../../../lib/utils7.js'

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

  async read (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
    } catch (e) {
      this.error(e)
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
      if (this.online) {
        // logger.info('Connected to PLC %s', this.params.ip)
        this.read(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', this.params.ip) : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  stall (def, obj) {
    console.log('Stall updated!')
  }
}

export default PLC
