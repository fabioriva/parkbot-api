import pino from 'pino'
import snap7 from 'node-snap7'
import PlcConnection from '../../../lib/PlcConnection.js'
import { ReadArea } from '../../../lib/utils7.js'

const logger = pino()

class PLC {
  constructor ({ isDataReady = () => true } = {}) {
    this.connection = new PlcConnection(new snap7.S7Client(), {
      canCommand: isDataReady,
      onUnavailable: () => { this.online = false },
      onDisconnectError: error => logger.error({ err: error }, 'PLC disconnect failed')
    })
    this.client = this.connection.client
    this.online = false
  }

  async error (e) {
    this.online = false
    await this.connection.disconnect()
    typeof e === 'number'
      ? logger.error({ code: e }, this.client.ErrorText(e))
      : logger.error(e)
  }

  async read (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      if (this.online) {
        await this.connection.run(client => ReadArea(client, area, dbNumber, start, amount, wordLen))
        this.connection.markReady()
      }
    } catch (e) {
      await this.error(e)
    }
  }

  async run (def, obj) {
    try {
      this.online = await this.connection.connectTo(
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
          this.online = await this.connection.connect()
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
