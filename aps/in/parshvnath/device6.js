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

const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const ENR = new Position(9, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E313.3'),
  outputs.find(b => b.addr === 'A313.7'),
  outputs.find(b => b.addr === 'A313.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E312.0'),
//   inputs.find(b => b.addr === 'E312.1'),
//   inputs.find(b => b.addr === 'E312.2'),
//   inputs.find(b => b.addr === 'E312.3'),
//   inputs.find(b => b.addr === 'E312.4'),
//   inputs.find(b => b.addr === 'E312.5'),
//   inputs.find(b => b.addr === 'E312.6'),
//   inputs.find(b => b.addr === 'E312.7'),
//   outputs.find(b => b.addr === 'A312.1'),
//   outputs.find(b => b.addr === 'A312.2'),
//   outputs.find(b => b.addr === 'A312.3'),
//   outputs.find(b => b.addr === 'A312.4'),
//   outputs.find(b => b.addr === 'A312.5'),
//   outputs.find(b => b.addr === 'A312.6')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(6, 'SH3', [], lamps, views)

module.exports = { device, drives, motors, positions }
