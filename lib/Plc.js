import pino from 'pino'
import snap7 from 'node-snap7'
import { getPlcDateTime, ReadArea, WriteArea } from './utils7.js'
import { countAlarms, updateAlarms } from '../models/Alarm.js'
import { updateBits } from '../models/Bit.js'
import { updateCards } from '../models/Card.js'
import { updateDevices } from '../models/Device.js'
import { updateDrives } from '../models/Drive.js'
import { updatePositions } from '../models/Position.js'
import { updateQueue } from '../models/Queue.js'
import { occupancy, updateStalls } from '../models/Stall.js'

const logger = pino()

const LOG_LEN = 32

class Log {
  constructor (buffer) {
    this.stx = buffer.readInt16BE(0)
    this.system = buffer.readInt16BE(2)
    this.device = buffer.readInt16BE(4)
    this.mode = buffer.readInt16BE(6)
    this.operation = buffer.readInt16BE(8)
    this.stall = buffer.readInt16BE(10)
    this.card = buffer.readInt16BE(12)
    this.size = buffer.readInt16BE(14)
    this.alarm = buffer.readInt16BE(16)
    this.event = buffer.readInt16BE(18)
    this.date = getPlcDateTime(buffer.readUInt16BE(20), buffer.readUInt32BE(22))
    this.elapsed = buffer.readInt32BE(26)
    this.etx = buffer.readInt16BE(30)
  }
}

class PLC {
  constructor (app, history, notifications) {
    this.client = new snap7.S7Client()
    this.app = app
    this.history = history
    this.notifications = notifications
    this.online = false
  }

  async error (e) {
    this.online = !this.client.Disconnect()
    isNaN(e) ? logger.error(e) : logger.error(this.client.ErrorText(e))
  }

  async alarms (def, obj, opts = {}) {
    try {
      await Promise.all(
        obj.alarms
          .filter((a) => (opts.id ? a.id === opts.id : a.id))
          .map(async (item) => {
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
            await updateAlarms(0, buffer, def.ALARM_LEN, item.alarms)
          })
      )
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
        const buffer = this.online
          ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
          : Buffer.alloc(amount)
        const cards = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
        this.publish('aps/cards', cards)
      } catch (e) {
        this.error(e)
      }
    }
  }

  async log (buffer, def, obj) {
    const log = new Log(Buffer.alloc(LOG_LEN, buffer))
    if (log.etx === 0x03 && log.stx === 0x264) {
      const res = await WriteArea(
        this.client,
        def.DATA_READ.area,
        def.DATA_READ.dbNumber,
        0,
        LOG_LEN,
        def.DATA_READ.wordLen,
        Buffer.alloc(LOG_LEN)
      )
      if (res) {
        switch (log.operation) {
          case 1: // alarm in
          case 2: // alarm out
            this.alarms(def, obj, { id: log.device })
            break
          case 4: // PIN
          case 12: // UID
            this.cards(def, obj)
            break
          case 5: // in
          case 6: // out
          case 7: // shuffle in
          case 8: // shuffle out
          case 9: // reserve stall
            this.stall(def, obj, log.stall)
            // plc.map(def, obj)
            break
        }
        const doc = await this.history.saveLog(log)
        this.publish('aps/info', { notification: doc })
        if (doc.operation.id === 1) {
          this.notifications.send(def.APS, doc).catch(error => {
            logger.error({ err: error, aps: def.APS }, 'Notification delivery failed')
          })
        }
      }
    }
  }

  async map (def, obj) {
    if (def.MAP_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.MAP_READ
        const buffer = this.online
          ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
          : Buffer.alloc(amount)
        // const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
        const stalls = await updateStalls(
          0,
          buffer,
          def.STALL_LEN,
          obj.cards,
          obj.stalls
        )
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
      const stall = obj.stalls.find((stall) => stall.nr === stallNr)
      if (stall !== undefined) {
        const { area, dbNumber, wordLen } = def.MAP_READ
        const start = stallNr === 1 ? 0 : (stallNr - 1) * def.STALL_LEN
        const amount = def.STALL_LEN
        const buffer = this.online
          ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
          : Buffer.alloc(amount)
        stall.update(buffer)
        obj.map.occupancy = occupancy(0, obj.stalls, def.STALL_STATUS)
        const card = obj.cards.find((card) => card.nr === stall.status)
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

  async readPlcClock (def, obj) {
    if (!def.CLOCK_READ) {
      obj.plcDTL = Date.now()
    } else {
      const { area, dbNumber, start, amount, wordLen } = def.CLOCK_READ
      // DBx 12 byte DTL + 2 byte ReadStatus
      const data = await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
      const status = data.readInt16BE(12)
      if (status !== 0) {
        throw new Error(`Lettura orologio PLC non valida: ${status}`)
      }
      // const date = new Date(Date.UTC(
      //   data.readUInt16BE(0), // Anno
      //   data[2] - 1, // Mese: JS usa 0–11
      //   data[3], // Giorno
      //   data[5], // Ora; byte 4 = giorno settimana
      //   data[6], // Minuti
      //   data[7], // Secondi
      //   Math.floor(data.readUInt32BE(8) / 1e6) // Nanosecondi → millisecondi
      // ))
      // console.log('msecs since epoch = January 1, 1970, UTC', date.getTime())
      // console.log('Ora PLC UTC:', date.toISOString())
      // console.log('Ora Dubai:', date.toLocaleString('en-US', {
      //   timeZone: def.MQTT_TZ // 'Asia/Dubai'
      // }))
      const date = Date.UTC(
        data.readUInt16BE(0), // Anno
        data[2] - 1, // Mese: JS usa 0–11
        data[3], // Giorno
        data[5], // Ora; byte 4 = giorno settimana
        data[6], // Minuti
        data[7], // Secondi
        Math.floor(data.readUInt32BE(8) / 1e6) // Nanosecondi → millisecondi
      )
      obj.plcDTL = date
    }
  }

  async main (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      const buffer = this.online
        ? await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
        : Buffer.alloc(amount)

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

      // Plc Log
      this.log(buffer, def, obj)
    } catch (e) {
      this.error(e)
    } finally {
      this.publish('aps/overview', obj.overview)
      obj.racks.forEach(
        (rack, key) =>
          rack?.rack && this.publish('aps/racks/' + key, rack.rack)
      )
    }
  }

  async run (def, obj) {
    try {
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
    setTimeout(async () => {
      if (this.online) {
        await this.readPlcClock(def, obj)
        await this.main(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online
          ? logger.info('Connected to PLC %s', def.PLC.ip)
          : logger.info('Connecting to PLC %s ...', def.PLC.ip)
      }
      if (this.online_ !== this.online) {
        this.alarms(def, obj)
        this.cards(def, obj)
        this.main(def, obj)
        this.map(def, obj)
        this.online_ = this.online
      }
      const entries = [
        ...new Map(
          obj.devices
            .filter((item) => item.card !== 0 && item.operation === 1)
            .map((v) => [v.card, v])
        ).values()
      ]
      const exits = [
        ...new Map(
          obj.devices
            .filter((item) => item.card !== 0 && item.operation === 2)
            .map((v) => [v.card, v])
        ).values()
      ]
      this.publish('aps/info', {
        comm: this.online,
        diag: countAlarms(obj.alarms),
        map: obj.map.occupancy,
        operations: { entries, exits }
      })
      this.forever(def, obj)
    }, def.PLC.polling_time)
  }

  publish (channel, data) {
    this.app.publish(channel, Buffer.from(JSON.stringify(data)))
  }
}

export default PLC
