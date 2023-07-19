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

const LV1 = new Position(9, 'LV1')
const LV2 = new Position(10, 'LV2')
const LH1 = new Position(11, 'LH1')
const LH2 = new Position(12, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E60.1'),
  outputs.find(b => b.addr === 'A60.5'),
  outputs.find(b => b.addr === 'A60.4')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E116.0'),
//   inputs.find(b => b.addr === 'E116.1'),
//   inputs.find(b => b.addr === 'E116.2'),
//   inputs.find(b => b.addr === 'E116.3'),
//   inputs.find(b => b.addr === 'E116.4'),
//   inputs.find(b => b.addr === 'E116.5'),
//   inputs.find(b => b.addr === 'E116.6'),
//   inputs.find(b => b.addr === 'E116.7'),
//   outputs.find(b => b.addr === 'A115.5'),
//   outputs.find(b => b.addr === 'A115.6'),
//   outputs.find(b => b.addr === 'A115.7'),
//   outputs.find(b => b.addr === 'A116.1'),
//   outputs.find(b => b.addr === 'A116.2'),
//   outputs.find(b => b.addr === 'A116.3')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(4, 'ELB', [], lamps, views)

module.exports = { device, drives, motors, positions }