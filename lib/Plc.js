const EventEmitter = require('events')
const net = require('net')
const logger = require('pino')()
const snap7 = require('node-snap7')
const { getPlcDateTime, ReadArea } = require('./utils7')
const { countAlarms, updateAlarms } = require('../models/Alarm')
const { updateBits } = require('../models/Bit')
const { updateCards } = require('../models/Card')
const { updateDevices } = require('../models/Device')
const { updatePositions } = require('../models/Position')
const { updateQueue } = require('../models/Queue')
const { updateStalls, occupancy } = require('../models/Stall')

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
    this.date = getPlcDateTime(buffer.readInt16BE(20), buffer.readInt32BE(22))
    this.elapsed = buffer.readInt32BE(26)
    this.etx = buffer.readInt16BE(30)
  }
}

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

  async alarms (def, obj) {
    if (def.DBS_ALARM.length > 0) {
      try {
        await Promise.all(
          obj.alarms.forEach(async (item, index) => {
            const buffer = await this.client.ReadArea(
              0x84,
              def.DBS_ALARM[index],
              def.DB_ALARM_INIT,
              def.DB_ALARM_LEN,
              0x02
            )
            const alarms = await updateAlarms(
              0,
              buffer,
              def.ALARM_LEN,
              item.alarms
            )
            item._active = alarms
            obj.overview.devices[index].alarms = item._active
          })
        )
      } catch (error) {
        this.error(error)
      } finally {
        this.publish('aps/alarms', obj.alarms)
      }
    }
  }

  async cards (def, obj) {
    if (def.CARD_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.CARD_READ
        const buffer = await this.client.ReadArea(area, dbNumber, start, amount, wordLen)
        const cards = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
        this.publish('aps/cards', cards)
      } catch (e) {
        this.error(e)
      }
    }
  }

  async map (def, obj) {
    if (def.MAP_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.MAP_READ
        const buffer = await this.client.ReadArea(area, dbNumber, start, amount, wordLen)
        const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
        const data = occupancy(0, stalls, def.STALL_STATUS)
        obj.map.occupancy = data
        this.publish('aps/map', obj.map)
      } catch (e) {
        this.error(e)
      }
    }
  }

  async main (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      const buffer = await ReadArea(this.client, area, dbNumber, start, amount, wordLen)
      await Promise.all([
        updateBits(def.DB_DATA_INIT_AB, buffer, obj.ab),
        updateBits(def.DB_DATA_INIT_EB, buffer, obj.eb),
        updateBits(def.DB_DATA_INIT_MB, buffer, obj.mb),
        updateDevices(
          def.DB_DATA_INIT_DEVICE,
          buffer,
          16,
          obj.devices,
          obj.modes
        ),
        updatePositions(def.DB_DATA_INIT_POS, buffer, 4, obj.positions),
        updateQueue(def.DB_DATA_INIT_QUEUE, buffer, 4, obj.queue)
      ])
    } catch (e) {
      this.error(e)
    } finally {
      this.publish('aps/overview', obj.overview)
      obj.racks.forEach((rack, key) => this.publish('aps/racks/' + key, rack))
    }
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(this.params.ip, this.params.rack, this.params.slot)
      await this.cards(def, obj)
      await this.map(def, obj)
      this.forever(def, obj)
      this.log(def, obj)
    } catch (e) {
      this.error(e)
    }
  }

  async stall (def, obj, stall) {
    try {
      if (stall < 1 || stall > def.STALLS) return
      const { area, dbNumber, wordLen } = def.MAP_READ
      const start = stall === 1 ? 0 : (stall - 1) * def.STALL_LEN
      const amount = def.STALL_LEN
      const buffer = await this.client.ReadArea(area, dbNumber, start, amount, wordLen)
      obj.stalls[stall - 1].update(buffer)
      const data = occupancy(0, obj.stalls, def.STALL_STATUS)
      obj.map.occupancy = data
      this.publish('aps/map', obj.map)
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
        this.online ? logger.info('Connected to PLC %s', this.params.ip) : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      this.publish('aps/info', {
        comm: this.online,
        diag: countAlarms(obj.alarms),
        map: obj.map.occupancy,
        expired: obj.merkers.find(m => m.addr === 'M7.7').status
      })
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  log (def, obj) {
    const server = net.createServer()
    server.listen(def.LOG_PORT, '127.0.0.1', () => logger.info('TCP log server is running on port ' + def.LOG_PORT + '.'))
    server.on('connection', function (sock) {
      logger.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort)
      sock.on('data', function (data) {
        logger.log('DATA ' + sock.remoteAddress + ': ' + data)
        const buffer = Buffer.alloc(LOG_LEN, data)
        const log = new Log(buffer)
        if (log.etx === 0x03 && log.stx === 0x264) {
          switch (log.operation) {
            case 1: // alarm in
            case 2: // alarm out
              this.alarms(def, obj)
              break
            case 4:
              this.cards(def, obj)
              break
            case 5: // in
            case 6: // out
            case 7: // shuffle in
            case 8: // shuffle out
            case 9: // reserve stall
              this.stall(def, obj, log.stall) // this.map(def, obj)
              break
          }
          this.emit('log', log)
        }
      })
      sock.on('close', function (data) {
        logger.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort)
      })
      sock.on('end', function () {
        logger.info('%s socket end', sock.remoteAddress + ':' + sock.remotePort)
      })
    })
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: JSON.stringify(data) })
  }
}

module.exports = PLC
