const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Position } = require('../../../models/Position')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E20.1'),
  outputs.find(b => b.addr === 'A20.5'),
  outputs.find(b => b.addr === 'A20.4')
]

const drives = []

const motors = []

const views = [
  // { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7, M8, M9] },
  // { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(2, 'EL2', [], lamps, motors, views)

module.exports = { device, drives, positions }
