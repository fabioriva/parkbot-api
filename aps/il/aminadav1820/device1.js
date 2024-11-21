const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Flap,
  Lock,
  Hoisting,
  Rotation,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E3.0')
const EN2 = inputs.find(b => b.addr === 'E3.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const RTA = inputs.find(b => b.addr === 'E3.2')
const ASBK = inputs.find(b => b.addr === 'E14.2')
const FSBK = inputs.find(b => b.addr === 'E14.1')
const SBK1 = outputs.find(b => b.addr === 'A11.4')
const SBK2 = outputs.find(b => b.addr === 'A12.6')

const KEXPV1 = inputs.find(b => b.addr === 'E13.7')
const KEXPV2 = inputs.find(b => b.addr === 'E15.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, KEXPV1, KEXPV2],
  [SBK1, SBK2],
  [],
  FSBK
)

const AIV = inputs.find(b => b.addr === 'E3.3')
const AKKU = inputs.find(b => b.addr === 'E3.5')
const ASBK2 = inputs.find(b => b.addr === 'E14.3')

const AH = inputs.find(b => b.addr === 'E14.4')
const EHP = inputs.find(b => b.addr === 'E11.2')
const T10 = outputs.find(b => b.addr === 'A11.0')
const T10F = outputs.find(b => b.addr === 'A12.7')

const M2 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, ASBK2, AIV, AKKU, EHP],
  [T10, T10F],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E14.5')
const EXD = inputs.find(b => b.addr === 'E11.1')
const TD = outputs.find(b => b.addr === 'A11.2')

const M3 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, AIV, AKKU, EXD],
  [TD],
  [],
  TD
)

const RMV = inputs.find(b => b.addr === 'E16.0')
const RMH = inputs.find(b => b.addr === 'E16.1')
const RES = inputs.find(b => b.addr === 'E16.2')
const REH = inputs.find(b => b.addr === 'E16.3')
const RCV = inputs.find(b => b.addr === 'E16.4')
const REAV = inputs.find(b => b.addr === 'E16.5')
const REAH = inputs.find(b => b.addr === 'E16.6')
const RCH = inputs.find(b => b.addr === 'E16.7')
const T2 = outputs.find(b => b.addr === 'A12.0')
const TRA = outputs.find(b => b.addr === 'A12.1')
const TRB = outputs.find(b => b.addr === 'A12.2')
const KCS = outputs.find(b => b.addr === 'A12.3')
const KCV = outputs.find(b => b.addr === 'A12.4')
const KCH = outputs.find(b => b.addr === 'A12.5')

const AF8 = inputs.find(b => b.addr === 'E3.4')
const MTC = inputs.find(b => b.addr === 'E14.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const AMM1 = inputs.find(b => b.addr === 'E15.0')
const EOM1 = inputs.find(b => b.addr === 'E12.0')
const EZM1 = inputs.find(b => b.addr === 'E12.1')
const SMA1 = outputs.find(b => b.addr === 'A13.0')
const SMB1 = outputs.find(b => b.addr === 'A13.1')
const M4 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])

const AMM2 = inputs.find(b => b.addr === 'E15.1')
const EOM2 = inputs.find(b => b.addr === 'E12.2')
const EZM2 = inputs.find(b => b.addr === 'E12.3')
const SMA2 = outputs.find(b => b.addr === 'A13.2')
const SMB2 = outputs.find(b => b.addr === 'A13.3')

const M5 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const ECA = inputs.find(b => b.addr === 'E12.4')
const ECB = inputs.find(b => b.addr === 'E12.5')
const AMC = inputs.find(b => b.addr === 'E15.2')
const SCA = outputs.find(b => b.addr === 'A13.4')
const SCB = outputs.find(b => b.addr === 'A13.5')

const M6 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

const views = [main, silomat]

const device = new Device(1, 'T1', [], lamps, motors, views)

module.exports = { device, drives, positions }
