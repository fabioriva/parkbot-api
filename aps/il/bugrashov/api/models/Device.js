const util = require('util')

class Device {
  constructor (id, name, card = 0, size = 0, stall = 0, status = 0) {
    this.id = id
    this.name = name
    this.card = card
    this.size = size
    this.stall = stall
    this.status = status
  }

  update (buffer) {
    this.card = buffer.readInt16BE(0)
    this.size = buffer.readInt16BE(2)
    this.stall = buffer.readInt16BE(4)
    this.status = buffer.readInt16BE(6)
  }
}

const updateDevices = util.promisify(
  (start, buffer, offset, devices, callback) => {
    let byte = start
    for (let i = 0; i < devices.length; i++) {
      devices[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, devices)
  }
)

module.exports = { updateDevices, Device }
