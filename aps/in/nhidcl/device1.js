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

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E122.0'),
//   inputs.find(b => b.addr === 'E122.1'),
//   inputs.find(b => b.addr === 'E122.2'),
//   inputs.find(b => b.addr === 'E122.3'),
//   inputs.find(b => b.addr === 'E122.4'),
//   inputs.find(b => b.addr === 'E122.5'),
//   inputs.find(b => b.addr === 'E122.6'),
//   inputs.find(b => b.addr === 'E122.7'),
//   outputs.find(b => b.addr === 'A121.2'),
//   outputs.find(b => b.addr === 'A121.4'),
//   outputs.find(b => b.addr === 'A121.5'),
//   outputs.find(b => b.addr === 'A122.0'),
//   outputs.find(b => b.addr === 'A122.1'),
//   outputs.find(b => b.addr === 'A122.2')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(1, 'EL1', [], lamps, views)

module.exports = { device, drives, motors, positions }
