const { formatInTimeZone } = require('date-fns-tz')
const EventEmitter = require('events')
const mqtt = require('mqtt')

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
    // this.topic = topic
    // this.tz = tz
  }

  run (topic, tz) {
    if (topic !== undefined) {
      const client = mqtt.connect(this.options)
      const mqtt_ = this
      client.on('connect', function () {
        console.log('connected to the MQTT broker', topic, tz)
        client.subscribe(topic, function (err, granted) {
          console.log(err, granted)
        })
      })
      client.on('error', function (error) {
        console.log('error: ', error)
      })
      client.on('message', async function (topic, message) {
        const date = formatInTimeZone(Date.now(), tz, 'yyyy-MM-dd HH:mm:ss.SSS')
        // console.log(date, 'from', topic, 'message', message.toString())
        mqtt_.publish('aps/mqtt', {
          date,
          message: message.toString(),
          topic
        })
      })
      client.on('offline', function () {
        console.log('offline')
      })
      client.on('reconnect', function () {
        console.log('reconnect')
      })
    }
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: Buffer.from(JSON.stringify(data)) })
  }
}

module.exports = MQTT
