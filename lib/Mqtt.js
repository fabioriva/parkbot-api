const { formatInTimeZone } = require('date-fns-tz')
const EventEmitter = require('events')
const mqtt = require('mqtt')
const Log = require('./Log')

class MQTT extends EventEmitter {
  constructor (clientId) {
    super()
    this.options = {
      host: process.env.MQTT_SERVER,
      port: process.env.MQTT_PORT,
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
      keepalive: 0,
      clientId: clientId + Math.random().toString(16).substr(2, 8),
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
        console.log(
          'connected to the MQTT broker',
          def.MQTT_TOPIC,
          def.MQTT_TZ
        )
        client.subscribe(def.MQTT_TOPIC, function (err, granted) {
          console.log(err, granted)
        })
      })
      client.on('error', function (error) {
        console.log('error: ', error)
      })
      client.on('message', async function (topic, message) {
        const severity = topic.split('/').pop()
        const date = formatInTimeZone(Date.now(), def.MQTT_TZ, 'yyyy-MM-dd HH:mm:ss.SSS')
        console.log(
          date,
          'from',
          topic,
          severity,
          'mesg',
          message.length,
          message,
          message.toString()
        )
        if (severity === 'log') {
          const log = new Log(message)
          mqtt_.emit('log', log)
        } else {
          try {
            const o = JSON.parse(message.toString())
            const device = obj.devices.find((d) => d.id === o.device)
            // console.log(o, device)
            device.message = o.mesg
            mqtt_.publish('aps/mqtt', {
              cycle: o.cycle,
              date,
              device: device.name,
              message: device.message,
              severity
            })
          } catch (e) {
            // console.error(e)
            return false
          }
        }
      })
      client.on('offline', function () {
        console.log('offline')
      })
      client.on('reconnect', function () {
        console.log('reconnecting to broker...')
      })
    }
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

module.exports = MQTT
