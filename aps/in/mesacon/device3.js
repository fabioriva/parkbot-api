const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
// const { Drive } = require('../../models/Drive')
// const {
//   DoorVFD,
//   Flap,
//   Lock,
//   Hoisting,
//   Rotation,
//   Silomat,
//   Traveling
// } = require('../../models/Motor')
const { Position } = require('../../../models/Position')

const LV1 = new Position(2, 'LV1')
const LV2 = new Position(3, 'LV2')
const LH1 = new Position(4, 'LH1')
const LH2 = new Position(5, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E16.0'),
//   inputs.find(b => b.addr === 'E16.1'),
//   inputs.find(b => b.addr === 'E16.2'),
//   inputs.find(b => b.addr === 'E16.3'),
//   inputs.find(b => b.addr === 'E16.4'),
//   inputs.find(b => b.addr === 'E16.5'),
//   inputs.find(b => b.addr === 'E16.6'),
//   inputs.find(b => b.addr === 'E16.7'),
//   outputs.find(b => b.addr === 'A15.5'),
//   outputs.find(b => b.addr === 'A15.6'),
//   outputs.find(b => b.addr === 'A15.7'),
//   outputs.find(b => b.addr === 'A16.1'),
//   outputs.find(b => b.addr === 'A16.2'),
//   outputs.find(b => b.addr === 'A16.3')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(3, 'EL', [], lamps, views)

module.exports = { device, drives, motors, positions }
