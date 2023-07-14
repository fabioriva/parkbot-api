const util = require('util')

class Device {
  constructor (
    id,
    name,
    actions = [], lamps = [], views = [],
    card = 0,
    mode = { id: 0, mode: 'mode-no-func' },
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
    this.mode = mode
    this.motor = motor
    this.operation = operation
    this.position = position
    this.size = size
    this.stall = stall
    this.step = step
    this.d = actions
    this.c = lamps
    this.views = views
  }

  update (buffer, modes) {
    this.card = buffer.readInt16BE(0)
    this.mode = modes.find(mode => mode.id === buffer.readInt16BE(2))
    this.motor = buffer.readInt16BE(4)
    this.operation = buffer.readInt16BE(6)
    this.position = buffer.readInt16BE(8)
    this.size = buffer.readInt16BE(10)
    this.stall = buffer.readInt16BE(12)
    this.step = buffer.readInt16BE(14)
  }
}

const updateDevices = util.promisify(
  (start, buffer, offset, devices, modes, callback) => {
    let byte = start
    for (let i = 0; i < devices.length; i++) {
      devices[i].update(buffer.slice(byte, byte + offset), modes)
      byte += offset
    }
    callback(null, devices)
  }
)

module.exports = { updateDevices, Device }
