const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Hoisting, Lock, Rotation, Traveling } = require('../../models/Motor')
const { Position } = require('../../models/Position')
const { Main, Silomat } = require('../../models/View')

const EN1 = inputs.find(b => b.addr === 'E2.0')
const EN2 = inputs.find(b => b.addr === 'E2.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(3, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

// const steps = [
//   { key: 'step-1', color: 'gray', tooltip: 'step-1' },
//   { key: 'step-2', color: 'gray', tooltip: 'step-2' },
//   { key: 'step-3', color: 'gray', tooltip: 'step-3' },
//   { key: 'step-4', color: 'gray', tooltip: 'step-4' },
//   { key: 'step-5', color: 'gray', tooltip: 'step-5' },
//   { key: 'step-6', color: 'gray', tooltip: 'step-6' },
//   { key: 'step-7', color: 'gray', tooltip: 'step-7' },
//   { key: 'step-8', color: 'gray', tooltip: 'step-8' },
//   { key: 'step-9', color: 'gray', tooltip: 'step-9' }
// ]

// device.steps = steps
// device.alarms = alarms[0]._active

const RTA = inputs.find(b => b.addr === 'E2.2')
const ASBK = inputs.find(b => b.addr === 'E2.7')
const FSBK = inputs.find(b => b.addr === 'E2.6')
// const KBA11 = outputs.find(b => b.addr === 'A1.0')
// const KBA12 = outputs.find(b => b.addr === 'A6.0')
const SBK1 = outputs.find(b => b.addr === 'A6.7')
const SBK2 = outputs.find(b => b.addr === 'A7.7')

const Hoisting1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const ASBK2 = inputs.find(b => b.addr === 'E16.0')
const AH = inputs.find(b => b.addr === 'E16.1')
const T10 = outputs.find(b => b.addr === 'A12.0')
// const KBA21 = outputs.find(b => b.addr === 'A1.0')
// const KBA22 = outputs.find(b => b.addr === 'A6.0')

const Traveling1 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, ASBK2],
  [T10],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E16.2')
// const AIV2 = inputs.find(b => b.addr === 'E2.3')
const EXD = inputs.find(b => b.addr === 'E15.0')
const TD = outputs.find(b => b.addr === 'A12.1')

const Rotation1 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const AMM = inputs.find(b => b.addr === 'E13.1')
const EOM = inputs.find(b => b.addr === 'E14.0')
const EZM = inputs.find(b => b.addr === 'E14.1')
const SMA = outputs.find(b => b.addr === 'A11.0')
const SMB = outputs.find(b => b.addr === 'A11.1')

const Lock1 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

const RMV = inputs.find(b => b.addr === 'E17.0')
const RMH = inputs.find(b => b.addr === 'E17.1')
const RES = inputs.find(b => b.addr === 'E17.2')
const REH = inputs.find(b => b.addr === 'E17.3')
const RCV = inputs.find(b => b.addr === 'E17.4')
const REAV = inputs.find(b => b.addr === 'E17.5')
const REAH = inputs.find(b => b.addr === 'E17.6')
const RCH = inputs.find(b => b.addr === 'E17.7')
const T2 = outputs.find(b => b.addr === 'A12.2')
const TRA = outputs.find(b => b.addr === 'A12.3')
const TRB = outputs.find(b => b.addr === 'A12.4')
const KCS = outputs.find(b => b.addr === 'A12.5')
const KCV = outputs.find(b => b.addr === 'A12.6')
const KCH = outputs.find(b => b.addr === 'A12.7')

const AF8 = inputs.find(b => b.addr === 'E2.4')
const MTC = inputs.find(b => b.addr === 'E16.4')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [Hoisting1, Traveling1, Rotation1, Lock1, ...silomat.motors]

const main = new Main(drives, [Hoisting1, Traveling1, Rotation1, Lock1])

const views = [main, silomat]

const device = new Device(3, 'EL', [], lamps, motors, views)

module.exports = { device, drives, positions }
