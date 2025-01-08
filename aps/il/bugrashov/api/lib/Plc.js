const EventEmitter = require('events')
const net = require('net')
const logger = require('pino')()
const snap7 = require('node-snap7')
const { getPlcDateTime, readArea } = require('./utils7')
const { updateBays } = require('../models/Bay')
const { updateBits } = require('../models/Bit')
const { updateDevices } = require('../models/Device')
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

  async data (def, obj) {
    try {
      const { area, dbNumber, start, amount, wordLen } = def.DATA_READ
      const buffer = await readArea(
        this.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen
      )
      await Promise.all([
        updateBays(def.DB_DATA_INIT_BAY, buffer, def.BAY_OFFSET, obj.bays),
        updateBits(def.DB_DATA_INIT_MB, buffer, obj.mb),
        updateDevices(
          def.DB_DATA_INIT_DEVICE,
          buffer,
          def.DEVICE_OFFSET,
          obj.devices
        ),
        updateQueue(
          def.DB_DATA_INIT_QUEUE,
          buffer,
          def.QUEUE_OFFSET,
          obj.queue
        )
      ])
    } catch (e) {
      this.error(e)
    } finally {
      // obj.bays.forEach((b, i) => b.update(obj.mb[i]))
    }
  }

  async map (def, obj) {
    if (def.MAP_READ !== undefined) {
      try {
        const { area, dbNumber, start, amount, wordLen } = def.MAP_READ
        const buffer = await readArea(
          this.client,
          area,
          dbNumber,
          start,
          amount,
          wordLen
        )
        const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
        // const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.cards, obj.stalls)
        const data = occupancy(0, stalls, def.STALL_STATUS)
        obj.map.occupancy = data
        // this.publish('aps/map', obj.map)
      } catch (e) {
        this.error(e)
      }
    }
  }

  async run (def, obj) {
    try {
      this.online = this.client.ConnectTo(
        this.params.ip,
        this.params.rack,
        this.params.slot
      )
      // await this.alarms(def, obj);
      // await this.cards(def, obj);
      // await this.map(def, obj);
      this.forever(def, obj)
      // this.log(def, obj);
    } catch (e) {
      this.error(e)
    }
  }

  forever (def, obj) {
    setTimeout(async () => {
      // console.log(this.online)
      if (this.online) {
        await this.data(def, obj)
        await this.map(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online
          ? logger.info('Connected to PLC %s', this.params.ip)
          : logger.info('Connecting to PLC %s ...', this.params.ip)
      }
      this.forever(def, obj)
    }, this.params.polling_time)
  }

  log (def, obj) {
    const plc = this
    const server = net.createServer()
    server.listen(def.PORT, def.HOST, () =>
      logger.info('TCP log server is running on port ' + def.PORT + '.')
    )
    server.on('connection', function (sock) {
      const client = sock.remoteAddress + ':' + sock.remotePort
      logger.info('socket connected ' + client)
      sock.on('data', function (data) {
        logger.info('socket data ' + sock.remoteAddress + ': ' + data)
        const buffer = Buffer.alloc(LOG_LEN, data)
        const log = new Log(buffer)
        if (log.etx === 0x03 && log.stx === 0x264) {
          switch (log.operation) {
            case 1: // alarm in
            case 2: // alarm out
              plc.alarms(def, obj)
              break
            case 4: // PIN
              plc.cards(def, obj)
              break
            case 5: // in
            case 6: // out
            case 7: // shuffle in
            case 8: // shuffle out
            case 9: // reserve stall
              plc.stall(def, obj, log.stall) // plc.map(def, obj)
              break
          }
        }
        plc.emit('log', log)
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

module.exports = PLC
