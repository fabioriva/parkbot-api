const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E201.1'),
  outputs.find(b => b.addr === 'A201.0'),
  outputs.find(b => b.addr === 'A201.1')
]

const drives = []

const motors = []

const views = []

const device = new Device(4, 'E2', [], lamps, views)

module.exports = { device, drives, motors, positions }
