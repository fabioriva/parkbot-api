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

const EN1 = inputs.find(b => b.addr === 'E30.0')
const EN2 = inputs.find(b => b.addr === 'E37.0')

const IV1 = new Drive(5, 'IV1', EN1)
const IV2 = new Drive(6, 'IV2', EN2)

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E30.1'),
  outputs.find(b => b.addr === 'A30.5'),
  outputs.find(b => b.addr === 'A30.4')
]

const RTA = inputs.find(b => b.addr === 'E30.4')
const ASBK = inputs.find(b => b.addr === 'E30.3')
const FSBK = inputs.find(b => b.addr === 'E30.2')
const SBK1 = outputs.find(b => b.addr === 'A30.0')
const SBK2 = outputs.find(b => b.addr === 'A30.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E33.2')
const EOM = inputs.find(b => b.addr === 'E33.3')
const EZM = inputs.find(b => b.addr === 'E33.4')
const SMA = outputs.find(b => b.addr === 'A32.0')
const SMB = outputs.find(b => b.addr === 'A32.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ASH = inputs.find(b => b.addr === 'E32.0')
const AH = inputs.find(b => b.addr === 'E38.6')
const EMC = inputs.find(b => b.addr === 'E33.5')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A35.0')
const T102 = outputs.find(b => b.addr === 'A36.4')
const T10F = outputs.find(b => b.addr === 'A36.5')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, ASH, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E36.0')
const RMH = inputs.find(b => b.addr === 'E36.1')
const RES = inputs.find(b => b.addr === 'E36.2')
const REH = inputs.find(b => b.addr === 'E36.3')
const RCV = inputs.find(b => b.addr === 'E36.4')
const REAV = inputs.find(b => b.addr === 'E36.5')
const REAH = inputs.find(b => b.addr === 'E36.6')
const RCH = inputs.find(b => b.addr === 'E36.7')
const T2 = outputs.find(b => b.addr === 'A35.1')
const TRA = outputs.find(b => b.addr === 'A35.2')
const TRB = outputs.find(b => b.addr === 'A35.3')
const KCS = outputs.find(b => b.addr === 'A35.4')
const KCV = outputs.find(b => b.addr === 'A35.5')
const KCH = outputs.find(b => b.addr === 'A35.6')

const AF8 = inputs.find(b => b.addr === 'E32.0')
const MTC = inputs.find(b => b.addr === 'E38.7')

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

const device = new Device(3, 'ELA', [], lamps, views)

module.exports = { device, drives, motors, positions }
