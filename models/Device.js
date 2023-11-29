const util = require('util')

class Device {
  #motors
  constructor (
    id,
    name,
    actions,
    lamps,
    motors,
    views,
    card = 0,
    mode = { id: 0, key: 'mode-no' },
    motor = 0,
    operation = 0,
    position = 0,
    size = 0,
    stall = 0,
    step = 0
  ) {
    this.id = id
    this.name = name
    this.card = card
    this.messages = []
    this.mode = mode
    this.motor = motor // used to switch view
    this.operation = operation
    this.position = position // not used
    this.size = size
    this.stall = stall
    this.step = step
    this.d = actions
    this.c = lamps
    this.views = views
    this.#motors = motors // needed to update motor message
  }

  update (buffer, alarms, modes) {
    this.card = buffer.readInt16BE(0)
    this.mode = modes.find(mode => mode.id === buffer.readInt16BE(2)) || { id: 0, key: 'mode-no' }
    this.motor = buffer.readInt16BE(4)
    this.operation = buffer.readInt16BE(6)
    this.position = buffer.readInt16BE(8)
    this.size = buffer.readInt16BE(10)
    this.stall = buffer.readInt16BE(12)
    this.step = buffer.readInt16BE(14)
    this.alarms = alarms.find(a => a.id === this.id)._active // get active alarms
    this.#motors.forEach(m => m.update()) // update motors message
  }
}

const updateDevices = util.promisify(
  (start, buffer, offset, alarms, devices, modes, callback) => {
    let byte = start
    for (let i = 0; i < devices.length; i++) {
      devices[i].update(buffer.slice(byte, byte + offset), alarms, modes)
      byte += offset
    }
    callback(null, devices)
  }
)

module.exports = { updateDevices, Device }
