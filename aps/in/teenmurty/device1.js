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
const EN2 = inputs.find(b => b.addr === 'E11.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH = new Position(3, 'LH')
const positions = [LV1, LV2, LH]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
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

const AMM = inputs.find(b => b.addr === 'E14.4')
const EOM = inputs.find(b => b.addr === 'E13.3')
const EZM = inputs.find(b => b.addr === 'E13.4')
const SMA = outputs.find(b => b.addr === 'A12.3')
const SMB = outputs.find(b => b.addr === 'A12.4')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E14.0')
const AH = inputs.find(b => b.addr === 'E14.2')
// const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E13.5')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A11.0')
const T102 = outputs.find(b => b.addr === 'A11.1')
// const T10F = outputs.find(b => b.addr === 'A12.2')

const M3 = new Traveling(
  0,
  IV2,
  [LH],
  [AH, AGK, EMC],
  [T101, T102], //, T10F],
  [],
  T101 // T10F
)

const RMV = inputs.find(b => b.addr === 'E12.0')
const RMH = inputs.find(b => b.addr === 'E12.1')
const RES = inputs.find(b => b.addr === 'E12.2')
const REH = inputs.find(b => b.addr === 'E12.3')
const RCV = inputs.find(b => b.addr === 'E12.4')
const REAV = inputs.find(b => b.addr === 'E12.5')
const REAH = inputs.find(b => b.addr === 'E12.6')
const RCH = inputs.find(b => b.addr === 'E12.7')
const T2 = outputs.find(b => b.addr === 'A12.1')
const TRA = outputs.find(b => b.addr === 'A11.2')
const TRB = outputs.find(b => b.addr === 'A11.3')
const KCS = outputs.find(b => b.addr === 'A11.4')
const KCV = outputs.find(b => b.addr === 'A11.5')
const KCH = outputs.find(b => b.addr === 'A11.6')

const AF8 = inputs.find(b => b.addr === 'E14.0')
const MTC = inputs.find(b => b.addr === 'E14.3')

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
  { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(1, 'EL', [], lamps, views)

module.exports = { device, drives, motors, positions }
