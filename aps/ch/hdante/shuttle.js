import pino from 'pino'
import snap7 from 'node-snap7'
import { ReadArea } from '../../../lib/utils7.js'
import { updateBits } from '../../../models/Bit.js'

const logger = pino()

class PLC {
  constructor () {
    this.client = new snap7.S7Client()
    this.online = false
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
      this.online = this.client.ConnectTo(def.PLC_SH.ip, def.PLC_SH.rack, def.PLC_SH.slot)
      this.forever(def, obj)
    } catch (e) {
      this.error(e)
    }
  }

  forever (def, obj) {
    setTimeout(() => {
      if (this.online) {
        this.main(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', def.PLC_SH.ip) : logger.info('Connecting to PLC %s ...', def.PLC_SH.ip)
      }
      if (this.online_ !== this.online) {
        this.online_ = this.online
      }
      this.forever(def, obj)
    }, def.PLC_SH.polling_time)
  }
}

export default PLC
