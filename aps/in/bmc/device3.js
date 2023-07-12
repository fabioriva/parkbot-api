const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.1'),
  outputs.find(b => b.addr === 'A101.0'),
  outputs.find(b => b.addr === 'A101.1')
]

const drives = []

const motors = []

const views = []

const device = new Device(3, 'E1', [], lamps, views)

module.exports = { device, drives, motors, positions }
