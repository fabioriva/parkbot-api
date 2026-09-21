// import { EventEmitter } from 'events'
import pino from 'pino'
// import snap7 from 'node-snap7'
import Snap7Driver from '../../../lib/Snap7Driver.js'
// import { ReadArea } from '../../../lib/utils7.js'

const logger = pino()

// class PLC extends EventEmitter {
class PLC {
  constructor (plc) {
    // super()
    // this.client = new snap7.S7Client()
    this.client = new Snap7Driver()

    this.online = false
    // this.params = plc
  }

  async error (e) {
    // this.online = !this.client.Disconnect()
    try {
      await this.client.Disconnect()
      this.online = false
    } catch (err) {
      this.online = false
    }
    isNaN(e) ? logger.error(e) : logger.error(this.client.ErrorText(e))
  }

  async read (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      // this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
      this.online ? await this.client.ReadArea(area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
    } catch (e) {
      this.error(e)
    }
  }

  async run (def, obj) {
    try {
      // this.online = this.client.ConnectTo(this.params.ip, this.params.rack, this.params.slot)
      this.online = this.client.ConnectTo(
        def.PLC.ip,
        def.PLC.rack,
        def.PLC.slot
      )
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
        this.online
          ? logger.info('Connected to PLC %s', def.PLC.ip)
          : logger.info('Connecting to PLC %s ...', def.PLC.ip)
      }
      this.forever(def, obj)
    }, def.PLC.polling_time)
  }

  stall (def, obj) {
    console.log('Stall updated!')
  }
}

export default PLC
