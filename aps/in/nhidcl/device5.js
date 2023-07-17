const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const drives = []

const motors = []

const positions = []

const views = []

const device = new Device(5, 'E2', [], lamps, views)

module.exports = { device, drives, motors, positions }
