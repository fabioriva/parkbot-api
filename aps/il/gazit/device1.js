const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Hoisting,
  Lock,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E8.3')
// const EN2 = inputs.find(b => b.addr === 'E3.0')

const IV1 = new Drive(1, 'IV1', EN1)
// const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const positions = [LV1, LV2, ENH]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A4.7'),
  outputs.find(b => b.addr === 'A4.6')
]

const RTA = inputs.find(b => b.addr === 'E8.6')
const ASBK = inputs.find(b => b.addr === 'E8.5')
const FSBK = inputs.find(b => b.addr === 'E8.4')
const FSQA = inputs.find(b => b.addr === 'E8.7')
const SBK1 = outputs.find(b => b.addr === 'A4.2')
const SBK2 = outputs.find(b => b.addr === 'A7.5')

const EXPV = inputs.find(b => b.addr === 'E16.3')
// const KEXPV2 = inputs.find(b => b.addr === 'E109.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, FSQA, EXPV],
  [SBK1, SBK2],
  [],
  FSBK
)

const AH = inputs.find(b => b.addr === 'E9.3')
const AHIV = inputs.find(b => b.addr === 'E9.4')
const AKKS = inputs.find(b => b.addr === 'E16.5')
const EMC = inputs.find(b => b.addr === 'E16.2')
const FTCR = inputs.find(b => b.addr === 'E16.6')
const T10 = outputs.find(b => b.addr === 'A15.0')
// const T10F = outputs.find(b => b.addr === 'A0.5')

const M2 = new Traveling(
  0,
  IV1,
  [ENH],
  [AH, AHIV, AKKS, EMC, FTCR],
  [T10],
  [],
  T10
)

const AMM = inputs.find(b => b.addr === 'E14.2')
const EOM = inputs.find(b => b.addr === 'E14.0')
const EZM = inputs.find(b => b.addr === 'E14.1')
const SMA = outputs.find(b => b.addr === 'A14.0')
const SMB = outputs.find(b => b.addr === 'A14.1')

const M3 = new Lock(1, [EZM, EOM, AMM], [SMA, SMB])

const AMM2 = inputs.find(b => b.addr === 'E14.5')
const EOM2 = inputs.find(b => b.addr === 'E14.3')
const EZM2 = inputs.find(b => b.addr === 'E14.4')
const SMA2 = outputs.find(b => b.addr === 'A14.2')
const SMB2 = outputs.find(b => b.addr === 'A14.3')

const M4 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const RMV = inputs.find(b => b.addr === 'E13.0')
const RMH = inputs.find(b => b.addr === 'E13.1')
const RES = inputs.find(b => b.addr === 'E13.2')
const REH = inputs.find(b => b.addr === 'E13.3')
const RCV = inputs.find(b => b.addr === 'E13.4')
const REAV = inputs.find(b => b.addr === 'E13.5')
const REAH = inputs.find(b => b.addr === 'E13.6')
const RCH = inputs.find(b => b.addr === 'E13.7')
const T2 = outputs.find(b => b.addr === 'A15.1')
const TRA = outputs.find(b => b.addr === 'A15.2')
const TRB = outputs.find(b => b.addr === 'A15.3')
const KCS = outputs.find(b => b.addr === 'A16.0')
const KCV = outputs.find(b => b.addr === 'A16.1')
const KCH = outputs.find(b => b.addr === 'A16.2')

const AF8 = inputs.find(b => b.addr === 'E9.2')
const MTC = inputs.find(b => b.addr === 'E16.7')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3, M4])

const views = [main, silomat]

const device = new Device(1, 'EL', [], lamps, motors, views)

module.exports = { device, drives, positions }
