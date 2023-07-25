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

const EN1 = inputs.find(b => b.addr === 'E210.2')
const EN2 = inputs.find(b => b.addr === 'E215.2')

const IV1 = new Drive(3, 'IV1', EN1)
const IV2 = new Drive(4, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E210.3'),
  outputs.find(b => b.addr === 'A210.0'),
  outputs.find(b => b.addr === 'A210.1')
]

const RTA = inputs.find(b => b.addr === 'E210.3')
const ASBK = inputs.find(b => b.addr === 'E210.4')
const FSBK = inputs.find(b => b.addr === 'E210.5')
const SBK1 = outputs.find(b => b.addr === 'A210.3')
const SBK2 = outputs.find(b => b.addr === 'A210.4')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E212.1')
const EOM = inputs.find(b => b.addr === 'E213.0')
const EZM = inputs.find(b => b.addr === 'E213.1')
const SMA = outputs.find(b => b.addr === 'A212.0')
const SMB = outputs.find(b => b.addr === 'A212.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ASH = inputs.find(b => b.addr === 'E212.0')
const AH = inputs.find(b => b.addr === 'E215.4')
const EMC = inputs.find(b => b.addr === 'E213.2')
const T101 = outputs.find(b => b.addr === 'A215.3')
const T102 = outputs.find(b => b.addr === 'A215.4')
const T10F = outputs.find(b => b.addr === 'A216.0')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, ASH, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E216.0')
const RMH = inputs.find(b => b.addr === 'E216.1')
const RES = inputs.find(b => b.addr === 'E216.2')
const REH = inputs.find(b => b.addr === 'E216.3')
const RCV = inputs.find(b => b.addr === 'E216.4')
const REAV = inputs.find(b => b.addr === 'E216.5')
const REAH = inputs.find(b => b.addr === 'E216.6')
const RCH = inputs.find(b => b.addr === 'E216.7')
const T2 = outputs.find(b => b.addr === 'A215.5')
const TRA = outputs.find(b => b.addr === 'A215.6')
const TRB = outputs.find(b => b.addr === 'A215.7')
const KCS = outputs.find(b => b.addr === 'A216.1')
const KCV = outputs.find(b => b.addr === 'A216.2')
const KCH = outputs.find(b => b.addr === 'A216.3')

const AF8 = inputs.find(b => b.addr === 'E212.0') // ASH
const MTC = inputs.find(b => b.addr === 'E215.5')

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

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
