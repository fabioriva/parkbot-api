const { formatInTimeZone } = require('date-fns-tz')
const EventEmitter = require('events')
const logger = require('pino')()
const mqtt = require('mqtt')
const { Log } = require('./Log')

class MQTT extends EventEmitter {
  constructor (id) {
    super()
    this.options = {
      host: process.env.MQTT_SERVER,
      port: process.env.MQTT_PORT,
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
      keepalive: 0,
      clientId: id + Math.random().toString(16).substr(2, 8),
      clean: false,
      reconnectPeriod: 1000 * 1
    }
    // this.online = false
  }

  run (def, obj) {
    if (def.MQTT_TOPIC !== undefined) {
      const client = mqtt.connect(this.options)
      const mqtt_ = this
      client.on('connect', function () {
        logger.info('Connected to MQTT broker %s:%d', process.env.MQTT_SERVER, process.env.MQTT_PORT)
        client.subscribe(def.MQTT_TOPIC, function (error, granted) {
          if (error) logger.error('MQTT client subscription error: ', error)
          logger.info('Suscribed to %o', granted)
        })
      })
      client.on('error', function (error) {
        logger.error('MQTT client error: ', error)
      })
      client.on('message', async function (topic, message) {
        const date = formatInTimeZone(Date.now(), def.MQTT_TZ, 'yyyy-MM-dd HH:mm:ss.SSS')
        const severity = topic.split('/').pop()
        // console.log(date, topic, message)
        if (severity === 'log') {
          const log = new Log(message)
          mqtt_.emit('log', log)
        } else {
          try {
            const o = JSON.parse(message.toString())
            const device = obj.devices.find((d) => d.id === o.device)
            // severity === 'clear' ? device.messages = [] : device.messages.push(o.mesg)
            severity === 'clear' ? device.messages = [] : device.messages.push({ date, mesg: o.mesg, severity })
            mqtt_.publish('aps/mqtt', {
              cycle: o.cycle,
              date,
              device: device.name,
              message: o.mesg,
              severity
            })
          } catch (e) {
            // console.error(e)
            return false
          }
        }
      })
      client.on('offline', function () {
        logger.info('Client disconnected')
      })
      client.on('reconnect', function () {
        logger.info('Reconnecting to MQTT broker %s:%d', process.env.MQTT_SERVER, process.env.MQTT_PORT)
      })
    }
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

module.exports = MQTT
