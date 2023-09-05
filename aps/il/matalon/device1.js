const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
// const {
//   DoorVFD,
//   Flap,
//   Lock,
//   Hoisting,
//   Rotation,
//   Traveling
// } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E3.0')
const EN2 = inputs.find(b => b.addr === 'E3.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const ENR = new Position(4, 'ENR')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

// ....

const RMV = inputs.find(b => b.addr === 'E14.0')
const RMH = inputs.find(b => b.addr === 'E14.1')
const RES = inputs.find(b => b.addr === 'E14.2')
const REH = inputs.find(b => b.addr === 'E14.3')
const RCV = inputs.find(b => b.addr === 'E14.4')
const REAV = inputs.find(b => b.addr === 'E14.5')
const REAH = inputs.find(b => b.addr === 'E14.6')
const RCH = inputs.find(b => b.addr === 'E14.7')
const T2 = outputs.find(b => b.addr === 'A12.0')
const TRA = outputs.find(b => b.addr === 'A12.1')
const TRB = outputs.find(b => b.addr === 'A12.2')
const KCS = outputs.find(b => b.addr === 'A12.3')
const KCV = outputs.find(b => b.addr === 'A12.4')
const KCH = outputs.find(b => b.addr === 'A12.5')

const AF8 = inputs.find(b => b.addr === 'E3.5')
const MTC = inputs.find(b => b.addr === 'E13.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

// const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9, ...silomat.motors]
const motors = [...silomat.motors]

// const main = new Main(drives, [M1, M2, M3, M4, M5, M6, M7])
const main = new Main(drives, [])

const views = [main, silomat]

const device = new Device(1, 'T', [], lamps, motors, views)

module.exports = { device, drives, positions }
