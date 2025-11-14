import { EventEmitter } from 'events'
import net from 'net'
import pino from 'pino'
import snap7 from 'node-snap7'
import { Log, LOG_LEN } from '../../../lib/Log.js'
import { ReadArea } from '../../../lib/utils7.js'
import { countAlarms, updateAlarms } from '../../../models/Alarm.js'
import { updateBits } from '../../../models/Bit.js'
import { updateCards } from '../../../models/Card.js'
import { updateDevices } from '../../../models/Device.js'
import { updateDrives } from '../../../models/Drive.js'
import { updatePositions } from '../../../models/Position.js'
import { updateQueue } from '../../../models/Queue.js'
// import { occupancy, updateStalls } from '../../../models/Stall.js'

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

  async alarms (def, obj, opts = {}) {
    try {
      // console.log('0', opts)
      await Promise.all(
        obj.alarms.filter(a => opts.id ? a.id === opts.id : a.id).map(async item => {
          // console.log('1', item.id)
          const buffer = this.online
            ? await ReadArea(
              this.client,
              0x84,
              def.DBS_ALARM[item.id - 1],
              def.DB_ALARM_INIT,
              def.DB_ALARM_LEN,
              0x02
            )
            : Buffer.alloc(def.DB_ALARM_LEN)
          // console.log('2', item.id, buffer)
          await updateAlarms(
            0,
            buffer,
            def.ALARM_LEN,
            item.alarms
          )
        }))
    } catch (e) {
      this.error(e)
    } finally {
      this.publish('aps/alarms', obj.alarms)
    }
  }

  async cards (def, obj) {
    if (def.CARD_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.CARD_READ
        const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
        const cards = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
        this.publish('aps/cards', cards)
      } catch (e) {
        this.error(e)
      }
    }
  }

  // async dss (def, obj, buffer) {
  //   try {
  //     if (obj.exits !== undefined) {
  //       await updateExits(def.DB_DATA_INIT_EXITS, buffer, 4, obj.exits)
  //     }
  //     if (obj.exitScreen !== undefined) {
  //       await obj.exitScreen.update(obj.exits, obj.queue)
  //     }
  //     if (obj.screens !== undefined) {
  //       await updateGarageScreens(def.DB_DATA_INIT_SCREENS, buffer, 10, obj.screens, obj.occupancy)
  //     }
  //     if (obj.occupancy !== undefined) {
  //       await updateOccupancy(def.DB_DATA_INIT_OCCUPANCY, buffer, 6, obj.occupancy)
  //     }
  //   } catch (e) {
  //     this.error(e)
  //   }
  // }

  // async map (def, obj) {
  //   if (def.MAP_READ !== undefined) {
  //     try {
  //       const { area, dbNumber, start, amount, wordLen } = def.MAP_READ
  //       const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
  //       // const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
  //       const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.cards, obj.stalls)
  //       const data = occupancy(0, stalls, def.STALL_STATUS)
  //       obj.map.occupancy = data
  //       this.publish('aps/map', obj.map)
  //     } catch (e) {
  //       this.error(e)
  //     }
  //   }
  // }

  async stall (def, obj, stallNr) {
    console.log('Updated stall', stallNr)
  }

  // async stall (def, obj, stallNr) {
  //   try {
  //     const stall = obj.stalls.find(stall => stall.nr === stallNr)
  //     if (stall !== undefined) {
  //       const { area, dbNumber, wordLen } = def.MAP_READ
  //       const start = stallNr === 1 ? 0 : (stallNr - 1) * def.STALL_LEN
  //       const amount = def.STALL_LEN
  //       const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
  //       stall.update(buffer)
  //       obj.map.occupancy = occupancy(0, obj.stalls, def.STALL_STATUS)
  //       const card = obj.cards.find(card => card.nr === stall.status)
  //       if (card !== undefined) {
  //         card.status = stall.nr // update card status
  //         this.publish('aps/cards', obj.cards)
  //       }
  //     }
  //   } catch (e) {
  //     this.error(e)
  //   } finally {
  //     this.publish('aps/map', obj.map)
  //   }
  // }

  async main (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      const buffer = this.online ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen) : Buffer.alloc(amount)
      await Promise.all([
        updateBits(def.DB_DATA_INIT_AB, buffer, obj.ab),
        updateBits(def.DB_DATA_INIT_EB, buffer, obj.eb),
        updateBits(def.DB_DATA_INIT_MB, buffer, obj.mb),
        updateDevices(
          def.DB_DATA_INIT_DEVICE,
          buffer,
          16,
          obj.alarms,
          obj.devices,
          obj.modes
        ),
        updateDrives(def.DB_DATA_INIT_DRIVE, buffer, 10, obj.drives),
        updatePositions(def.DB_DATA_INIT_POS, buffer, 4, obj.positions),
        updateQueue(def.DB_DATA_INIT_QUEUE, buffer, 4, obj.queue)
      ])
      // await this.dss(def, obj, buffer)
    } catch (e) {
      this.error(e)
    } finally {
      this.publish('aps/overview', obj.overview)
      obj.racks.forEach((rack, key) => rack?.rack && this.publish('aps/racks/' + key, rack.rack))
    }
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(this.params.ip, this.params.rack, this.params.slot)
      // await this.alarms(def, obj)
      // await this.cards(def, obj)
      // await this.map(def, obj)
      this.forever(def, obj)
      this.log(def, obj)
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
        this.alarms(def, obj)
        this.cards(def, obj)
        this.main(def, obj)
        // this.map(def, obj)
        this.online_ = this.online
      }
      const entries = [...new Map(obj.devices.filter(item => item.card !== 0 && item.operation === 1).map(v => [v.card, v])).values()]
      const exits = [...new Map(obj.devices.filter(item => item.card !== 0 && item.operation === 2).map(v => [v.card, v])).values()]
      this.publish('aps/info', {
        comm: this.online,
        diag: countAlarms(obj.alarms),
        map: obj.map.occupancy,
        operations: { entries, exits }
        // expired: Boolean(obj.merkers.find(m => m.addr === 'M7.7').status)
      })
      // // main cycle execution time
      // const pong = process.hrtime(ping)
      // const latency = (pong[0] * 1000000000 + pong[1]) / 1000000
      // console.log('forever execution time in millisecond is: ', latency)
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  log (def, obj) {
    const plc_ = this
    const server = net.createServer()
    server.listen(def.PORT, def.HOST, () => logger.info('TCP log server is running on port ' + def.PORT + '.'))
    server.on('connection', function (sock) {
      const client = sock.remoteAddress + ':' + sock.remotePort
      logger.info('socket connected ' + client)
      sock.on('data', function (data) {
        logger.info('socket data ' + sock.remoteAddress + ': ' + data)
        const buffer = Buffer.alloc(LOG_LEN, data)
        const log = new Log(buffer)
        plc_.emit('log', log)
      })
      sock.on('close', function () {
        logger.info('socket close ' + client)
      })
      sock.on('end', function () {
        logger.info('socket end ', client)
      })
      sock.on('error', function (e) {
        logger.error('socket error ', client, e)
      })
    })
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

export default PLC
