const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const drives = []

const motors = []

const positions = []

const views = []

const device = new Device(4, 'U1', [], lamps, views)

module.exports = { device, drives, motors, positions }
