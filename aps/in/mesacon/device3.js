const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Lock,
  Hoisting,
  Silomat,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')

const EN1 = inputs.find(b => b.addr === 'E1.2')
const EN2 = inputs.find(b => b.addr === 'E15.2')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(2, 'LV1')
const LV2 = new Position(3, 'LV2')
const LH1 = new Position(4, 'LH1')
const LH2 = new Position(5, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E15.3'),
  outputs.find(b => b.addr === 'A15.0'),
  outputs.find(b => b.addr === 'A15.1')
]

const RTA = inputs.find(b => b.addr === 'E1.5')
const ASBK = inputs.find(b => b.addr === 'E1.4')
const FSBK = inputs.find(b => b.addr === 'E2.1')
const SBK1 = outputs.find(b => b.addr === 'A1.5')
const SBK2 = outputs.find(b => b.addr === 'A1.6')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E12.1')
const EOM = inputs.find(b => b.addr === 'E13.0')
const EZM = inputs.find(b => b.addr === 'E13.1')
const SMA = outputs.find(b => b.addr === 'A12.0')
const SMB = outputs.find(b => b.addr === 'A12.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E12.0')
const AH = inputs.find(b => b.addr === 'E15.4')
// const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E13.2')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A15.3')
const T102 = outputs.find(b => b.addr === 'A15.4')
const T10F = outputs.find(b => b.addr === 'A16.0')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, AGK, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E16.0')
const RMH = inputs.find(b => b.addr === 'E16.1')
const RES = inputs.find(b => b.addr === 'E16.2')
const REH = inputs.find(b => b.addr === 'E16.3')
const RCV = inputs.find(b => b.addr === 'E16.4')
const REAV = inputs.find(b => b.addr === 'E16.5')
const REAH = inputs.find(b => b.addr === 'E16.6')
const RCH = inputs.find(b => b.addr === 'E16.7')
const T2 = outputs.find(b => b.addr === 'A15.5')
const TRA = outputs.find(b => b.addr === 'A15.6')
const TRB = outputs.find(b => b.addr === 'A15.7')
const KCS = outputs.find(b => b.addr === 'A16.1')
const KCV = outputs.find(b => b.addr === 'A16.2')
const KCH = outputs.find(b => b.addr === 'A16.3')

const AF8 = inputs.find(b => b.addr === 'E12.0') // ASH
const MTC = inputs.find(b => b.addr === 'E15.5')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3] },
  silomat.view
]

const device = new Device(3, 'EL', [], lamps, views)

module.exports = { device, drives, motors, positions }
