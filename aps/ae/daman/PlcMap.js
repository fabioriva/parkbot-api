import { EventEmitter } from 'events'
import pino from 'pino'
import snap7 from 'node-snap7'
import { ReadArea } from '../../../lib/utils7.js'
import { occupancy, updateStalls } from '../../../models/Stall.js'

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

  async map (def, obj) {
    if (def.MAP_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.MAP_READ
        const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
        // const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
        const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.cards, obj.stalls)
        const data = occupancy(0, stalls, def.STALL_STATUS)
        obj.map.occupancy = data
        this.publish('aps/map', obj.map)
      } catch (e) {
        this.error(e)
      }
    }
  }

  async stall (def, obj, stallNr) {
    try {
      const stall = obj.stalls.find(stall => stall.nr === stallNr)
      if (stall !== undefined) {
        const { area, dbNumber, wordLen } = def.MAP_READ
        const start = stallNr === 1 ? 0 : (stallNr - 1) * def.STALL_LEN
        const amount = def.STALL_LEN
        const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
        stall.update(buffer)
        obj.map.occupancy = occupancy(0, obj.stalls, def.STALL_STATUS)
        const card = obj.cards.find(card => card.nr === stall.status)
        if (card !== undefined) {
          card.status = stall.nr // update card status
          this.publish('aps/cards', obj.cards)
        }
      }
    } catch (e) {
      this.error(e)
    } finally {
      this.publish('aps/map', obj.map)
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
      if (!this.online) {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', this.params.ip) : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      if (this.online_ !== this.online) {
        this.map(def, obj)
        this.online_ = this.online
      }
      // main cycle execution time
      // const pong = process.hrtime(ping)
      // const latency = (pong[0] * 1000000000 + pong[1]) / 1000000
      // console.log('forever execution time in millisecond is: ', latency)
      this.forever(def, obj)
    }, 500) // this.params.polling_time)
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

export default PLC
