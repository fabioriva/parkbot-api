const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Position } = require('../../../models/Position')
const { Main } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E11.1')

const IV1 = new Drive(1, 'IV1', EN1)

const LV1 = new Position(1, 'LV')

const positions = [LV1]

const lamps = [
  inputs.find(b => b.addr === 'E11.2'),
  outputs.find(b => b.addr === 'A10.7'),
  outputs.find(b => b.addr === 'A10.6')
]

const drives = [IV1]

const motors = []

const main = new Main(drives, [])

const views = [main]

const device = new Device(1, 'EL1', [], lamps, motors, views)

module.exports = { device, drives, positions }
