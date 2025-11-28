import { EventEmitter } from 'events'
import snap7 from 'node-snap7'
import pino from 'pino'
import util from 'util'

const logger = pino()

const readArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, callback) => {
    client.ReadArea(
      area,
      dbNumber,
      start,
      amount,
      wordLen,
      function (err, s7data) {
        if (err) return callback(err)
        callback(err, s7data)
      }
    )
  }
)

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

  forever (def, obj) {
    setTimeout(async () => {
      if (this.online) {
        const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
        const buffer = await readArea(
          this.client,
          area,
          dbNumber,
          start,
          amount,
          wordLen
        )
        console.log(buffer)
      } else {
        this.online = this.client.Connect()
        this.online
          ? logger.info('Connected to PLC %s', this.params.ip)
          : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(
        this.params.ip,
        this.params.rack,
        this.params.slot
      )
    } catch (e) {
      this.error(e)
    }
  }
}

export default PLC
