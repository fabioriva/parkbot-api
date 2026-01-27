import { EventEmitter } from 'events'
// import net from 'net'
import pino from 'pino'
import snap7 from 'node-snap7'
// import { Log, LOG_LEN } from './Log.js'
// import { ReadArea } from './utils7.js'
// import { countAlarms, updateAlarms } from '../models/Alarm.js'
// import { updateBits } from '../models/Bit.js'
// import { updateCards } from '../models/Card.js'
// import { updateDevices } from '../models/Device.js'
// import { updateDrives } from '../models/Drive.js'
// import { updatePositions } from '../models/Position.js'
// import { updateQueue } from '../models/Queue.js'
// import { occupancy, updateStalls } from '../models/Stall.js'

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

  async stall (def, obj) {
    console.log('Stall updated!')
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
      } else {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', this.params.ip) : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      // if (this.online_ !== this.online) {
      //   // this.alarms(def, obj)
      //   // this.cards(def, obj)
      //   // this.main(def, obj)
      //   // this.map(def, obj)
      //   this.online_ = this.online
      // }
      this.forever(def, obj)
    }, this.params.polling_time)
  }
}

export default PLC
