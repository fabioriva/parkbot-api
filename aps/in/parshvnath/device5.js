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
  inputs.find(b => b.addr === 'E213.3'),
  outputs.find(b => b.addr === 'A213.7'),
  outputs.find(b => b.addr === 'A213.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E212.0'),
//   inputs.find(b => b.addr === 'E212.1'),
//   inputs.find(b => b.addr === 'E212.2'),
//   inputs.find(b => b.addr === 'E212.3'),
//   inputs.find(b => b.addr === 'E212.4'),
//   inputs.find(b => b.addr === 'E212.5'),
//   inputs.find(b => b.addr === 'E212.6'),
//   inputs.find(b => b.addr === 'E212.7'),
//   outputs.find(b => b.addr === 'A212.1'),
//   outputs.find(b => b.addr === 'A212.2'),
//   outputs.find(b => b.addr === 'A212.3'),
//   outputs.find(b => b.addr === 'A212.4'),
//   outputs.find(b => b.addr === 'A212.5'),
//   outputs.find(b => b.addr === 'A212.6')
// ]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(5, 'SH2', [], lamps, views)

module.exports = { device, drives, motors, positions }