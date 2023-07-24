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

const EN1 = inputs.find(b => b.addr === 'E201.0')
const EN2 = inputs.find(b => b.addr === 'E223.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const RTA = inputs.find(b => b.addr === 'E202.6')
const ASBK = inputs.find(b => b.addr === 'E202.5')
const FSBK = inputs.find(b => b.addr === 'E202.4')
const SBK1 = outputs.find(b => b.addr === 'A200.0')
const SBK2 = outputs.find(b => b.addr === 'A200.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E210.2')
const EOM = inputs.find(b => b.addr === 'E210.5')
const EZM = inputs.find(b => b.addr === 'E210.6')
const SMA = outputs.find(b => b.addr === 'A210.0')
const SMB = outputs.find(b => b.addr === 'A210.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E210.0')
const AH = inputs.find(b => b.addr === 'E224.0')
const EMC = inputs.find(b => b.addr === 'E210.7')
const T101 = outputs.find(b => b.addr === 'A221.0')
const T102 = outputs.find(b => b.addr === 'A221.1')
const T10F = outputs.find(b => b.addr === 'A221.3')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, AGK, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E222.0')
const RMH = inputs.find(b => b.addr === 'E222.1')
const RES = inputs.find(b => b.addr === 'E222.2')
const REH = inputs.find(b => b.addr === 'E222.3')
const RCV = inputs.find(b => b.addr === 'E222.4')
const REAV = inputs.find(b => b.addr === 'E222.5')
const REAH = inputs.find(b => b.addr === 'E222.6')
const RCH = inputs.find(b => b.addr === 'E222.7')
const T2 = outputs.find(b => b.addr === 'A221.2')
const TRA = outputs.find(b => b.addr === 'A221.4')
const TRB = outputs.find(b => b.addr === 'A221.5')
const KCS = outputs.find(b => b.addr === 'A222.0')
const KCV = outputs.find(b => b.addr === 'A222.1')
const KCH = outputs.find(b => b.addr === 'A222.2')

const AF8 = inputs.find(b => b.addr === 'E210.0') // AGK
const MTC = inputs.find(b => b.addr === 'E224.1')

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

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
