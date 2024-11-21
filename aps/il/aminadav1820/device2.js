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

const EN1 = inputs.find(b => b.addr === 'E103.0')
const EN2 = inputs.find(b => b.addr === 'E103.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const RTA = inputs.find(b => b.addr === 'E103.2')
const ASBK = inputs.find(b => b.addr === 'E114.2')
const FSBK = inputs.find(b => b.addr === 'E114.1')
const SBK1 = outputs.find(b => b.addr === 'A111.4')
const SBK2 = outputs.find(b => b.addr === 'A112.6')

const KEXPV1 = inputs.find(b => b.addr === 'E113.7')
const KEXPV2 = inputs.find(b => b.addr === 'E115.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, KEXPV1, KEXPV2],
  [SBK1, SBK2],
  [],
  FSBK
)

const AIV = inputs.find(b => b.addr === 'E103.3')
const AKKU = inputs.find(b => b.addr === 'E103.5')
const ASBK2 = inputs.find(b => b.addr === 'E114.3')

const AH = inputs.find(b => b.addr === 'E114.4')
const EHP = inputs.find(b => b.addr === 'E111.2')
const T10 = outputs.find(b => b.addr === 'A111.0')
const T10F = outputs.find(b => b.addr === 'A112.7')

const M2 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, ASBK2, AIV, AKKU, EHP],
  [T10, T10F],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E114.5')
const EXD = inputs.find(b => b.addr === 'E111.1')
const TD = outputs.find(b => b.addr === 'A111.2')

const M3 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, AIV, AKKU, EXD],
  [TD],
  [],
  TD
)

const RMV = inputs.find(b => b.addr === 'E116.0')
const RMH = inputs.find(b => b.addr === 'E116.1')
const RES = inputs.find(b => b.addr === 'E116.2')
const REH = inputs.find(b => b.addr === 'E116.3')
const RCV = inputs.find(b => b.addr === 'E116.4')
const REAV = inputs.find(b => b.addr === 'E116.5')
const REAH = inputs.find(b => b.addr === 'E116.6')
const RCH = inputs.find(b => b.addr === 'E116.7')
const T2 = outputs.find(b => b.addr === 'A112.0')
const TRA = outputs.find(b => b.addr === 'A112.1')
const TRB = outputs.find(b => b.addr === 'A112.2')
const KCS = outputs.find(b => b.addr === 'A112.3')
const KCV = outputs.find(b => b.addr === 'A112.4')
const KCH = outputs.find(b => b.addr === 'A112.5')

const AF8 = inputs.find(b => b.addr === 'E103.4')
const MTC = inputs.find(b => b.addr === 'E114.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const AMM1 = inputs.find(b => b.addr === 'E115.0')
const EOM1 = inputs.find(b => b.addr === 'E112.0')
const EZM1 = inputs.find(b => b.addr === 'E112.1')
const SMA1 = outputs.find(b => b.addr === 'A113.0')
const SMB1 = outputs.find(b => b.addr === 'A113.1')
const M4 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])

const AMM2 = inputs.find(b => b.addr === 'E115.1')
const EOM2 = inputs.find(b => b.addr === 'E112.2')
const EZM2 = inputs.find(b => b.addr === 'E112.3')
const SMA2 = outputs.find(b => b.addr === 'A113.2')
const SMB2 = outputs.find(b => b.addr === 'A113.3')

const M5 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const ECA = inputs.find(b => b.addr === 'E112.4')
const ECB = inputs.find(b => b.addr === 'E112.5')
const AMC = inputs.find(b => b.addr === 'E115.2')
const SCA = outputs.find(b => b.addr === 'A113.4')
const SCB = outputs.find(b => b.addr === 'A113.5')

const M6 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

const views = [main, silomat]

const device = new Device(2, 'T2', [], lamps, motors, views)

module.exports = { device, drives, positions }
