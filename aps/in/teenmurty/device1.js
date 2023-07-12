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
const LH = new Position(3, 'LH')
const positions = [LV1, LV2, LH]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
]

// const sensors = [
//   inputs.find(b => b.addr === 'E12.0'),
//   inputs.find(b => b.addr === 'E12.1'),
//   inputs.find(b => b.addr === 'E12.2'),
//   inputs.find(b => b.addr === 'E12.3'),
//   inputs.find(b => b.addr === 'E12.4'),
//   inputs.find(b => b.addr === 'E12.5'),
//   inputs.find(b => b.addr === 'E12.6'),
//   inputs.find(b => b.addr === 'E12.7'),
//   outputs.find(b => b.addr === 'A12.1'),
//   outputs.find(b => b.addr === 'A11.2'),
//   outputs.find(b => b.addr === 'A11.3'),
//   outputs.find(b => b.addr === 'A11.4'),
//   outputs.find(b => b.addr === 'A11.5'),
//   outputs.find(b => b.addr === 'A11.6')
// ]

// const AF8 = inputs.find(b => b.addr === 'E9.2')
// const MTC = inputs.find(b => b.addr === 'E15.2')

// const silomat = new Silomat(
//   IV2,
//   [],
//   [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
//   [AF8, MTC]
// )

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(1, 'EL1', [], lamps, views)

module.exports = { device, drives, motors, positions }
