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
  inputs.find(b => b.addr === 'E41.2'),
  outputs.find(b => b.addr === 'A40.7'),
  outputs.find(b => b.addr === 'A40.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E52.0'),
//   inputs.find(b => b.addr === 'E52.1'),
//   inputs.find(b => b.addr === 'E52.2'),
//   inputs.find(b => b.addr === 'E52.3'),
//   inputs.find(b => b.addr === 'E52.4'),
//   inputs.find(b => b.addr === 'E52.5'),
//   inputs.find(b => b.addr === 'E52.6'),
//   inputs.find(b => b.addr === 'E52.7'),
//   outputs.find(b => b.addr === 'A51.1'),
//   outputs.find(b => b.addr === 'A51.2'),
//   outputs.find(b => b.addr === 'A51.3'),
//   outputs.find(b => b.addr === 'A51.4'),
//   outputs.find(b => b.addr === 'A51.5'),
//   outputs.find(b => b.addr === 'A51.6')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
