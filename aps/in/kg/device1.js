const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const LV1 = new Position(1, 'LV')

const positions = [LV1]

const lamps = [
  inputs.find(b => b.addr === 'E11.2'),
  outputs.find(b => b.addr === 'A10.7'),
  outputs.find(b => b.addr === 'A10.6')
]

const drives = []

const motors = []

const views = []

const device = new Device(1, 'EL1', [], lamps, views)

module.exports = { device, drives, motors, positions }
