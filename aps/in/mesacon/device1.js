const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
//   inputs.find(b => b.addr === 'E4.3') // FPE
]

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.1'),
  key: 'action-entry'
}

const drives = []

const motors = []

const views = []

const device = new Device(1, 'EU1', [A0], lamps, views)

module.exports = { device, drives, motors, positions }