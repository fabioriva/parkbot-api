const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const ENR = new Position(5, 'ENR')

const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
]

const drives = []

const motors = []

const views = []

const device = new Device(3, 'U', [], lamps, views)

module.exports = { device, drives, motors, positions }
