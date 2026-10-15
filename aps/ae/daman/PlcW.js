import pino from 'pino'
import snap7 from 'node-snap7'
// import Snap7Driver from '../../../lib/Snap7Driver.js'
import { ReadArea } from '../../../lib/utils7.js'

const logger = pino()

class PLC {
  constructor () {
    this.client = new snap7.S7Client()
    // this.client = new Snap7Driver()
    this.online = false
  }

  async error (e) {
    this.online = false
    try {
      this.client.Disconnect()
    } catch (error) {
      logger.error({ err: error }, 'PLC disconnect failed')
    }
    typeof e === 'number'
      ? logger.error({ code: e }, this.client.ErrorText(e))
      : logger.error(e)
  }

  async read (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      if (this.online) await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
    } catch (e) {
      await this.error(e)
    }
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(
        def.PLC.ip,
        def.PLC.rack,
        def.PLC.slot
      )
    } catch (e) {
      await this.error(e)
    } finally {
      this.forever(def, obj)
    }
  }

  forever (def, obj) {
    setTimeout(async () => {
      try {
        if (this.online) {
          await this.read(def, obj)
        } else {
          this.online = this.client.Connect()
          this.online
            ? logger.info('Connected to PLC %s', def.PLC.ip)
            : logger.info('Connecting to PLC %s ...', def.PLC.ip)
        }
      } catch (e) {
        await this.error(e)
      } finally {
        this.forever(def, obj)
      }
    }, def.PLC.polling_time)
  }

  stall (def, obj) {
    console.log('Stall updated!')
  }
}

export default PLC
