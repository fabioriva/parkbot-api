const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')

const device = new Device(2, 'U1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
