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

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E222.0'),
//   inputs.find(b => b.addr === 'E222.1'),
//   inputs.find(b => b.addr === 'E222.2'),
//   inputs.find(b => b.addr === 'E222.3'),
//   inputs.find(b => b.addr === 'E222.4'),
//   inputs.find(b => b.addr === 'E222.5'),
//   inputs.find(b => b.addr === 'E222.6'),
//   inputs.find(b => b.addr === 'E222.7'),
//   outputs.find(b => b.addr === 'A221.2'),
//   outputs.find(b => b.addr === 'A221.4'),
//   outputs.find(b => b.addr === 'A221.5'),
//   outputs.find(b => b.addr === 'A222.0'),
//   outputs.find(b => b.addr === 'A222.1'),
//   outputs.find(b => b.addr === 'A222.2')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
