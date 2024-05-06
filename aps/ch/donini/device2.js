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

const EN1 = inputs.find(b => b.addr === 'E11.4')
const EN2 = inputs.find(b => b.addr === 'E11.6')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LH1 = new Position(3, 'LH1')
const positions = [LV1, LH1]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

// const RTA = inputs.find(b => b.addr === 'E3.3')
const ASBK = inputs.find(b => b.addr === 'E12.7')
const FSBK = inputs.find(b => b.addr === 'E12.6')
const EXD = inputs.find(b => b.addr === 'E11.0')
const EXPV = inputs.find(b => b.addr === 'E11.2')
const EFB = inputs.find(b => b.addr === 'E11.3')

const SBK1 = outputs.find(b => b.addr === 'A10.6')
const SBK2 = outputs.find(b => b.addr === 'A13.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1],
  [ASBK, FSBK, EXD, EXPV, EFB],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E15.4')
const EOM1 = inputs.find(b => b.addr === 'E15.5')
const EZM1 = inputs.find(b => b.addr === 'E15.6')
const SMA1 = outputs.find(b => b.addr === 'A10.0')
const SMB1 = outputs.find(b => b.addr === 'A10.1')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])

// const AIV = inputs.find(b => b.addr === 'E3.4')
// const AKKU = inputs.find(b => b.addr === 'E3.6')
const ASBK2 = inputs.find(b => b.addr === 'E14.1')

const AH = inputs.find(b => b.addr === 'E14.0')
const EHP = inputs.find(b => b.addr === 'E11.1')
const T10 = outputs.find(b => b.addr === 'A11.0')
const T10F = outputs.find(b => b.addr === 'A13.6')

const M3 = new Traveling(
  0,
  IV1,
  [LH1],
  [AH, ASBK2, EHP],
  [T10, T10F],
  [],
  T10
)

const RMV = inputs.find(b => b.addr === 'E13.0')
const RMH = inputs.find(b => b.addr === 'E13.1')
const RES = inputs.find(b => b.addr === 'E13.2')
const REH = inputs.find(b => b.addr === 'E13.3')
const RCV = inputs.find(b => b.addr === 'E13.4')
const REAV = inputs.find(b => b.addr === 'E13.5')
const REAH = inputs.find(b => b.addr === 'E13.6')
const RCH = inputs.find(b => b.addr === 'E13.7')
const T2 = outputs.find(b => b.addr === 'A11.1')
const TRA = outputs.find(b => b.addr === 'A11.2')
const TRB = outputs.find(b => b.addr === 'A11.3')
const KCS = outputs.find(b => b.addr === 'A11.4')
const KCV = outputs.find(b => b.addr === 'A11.5')
const KCH = outputs.find(b => b.addr === 'A11.6')

const AF8 = inputs.find(b => b.addr === 'E15.7')
const MTC = inputs.find(b => b.addr === 'E15.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3])

const views = [main, silomat]

const device = new Device(1, 'T', [], lamps, motors, views)

module.exports = { device, drives, positions }
