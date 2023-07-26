const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const {
  DoorVFD,
  Flap,
  Lock,
  Hoisting,
  Rotation,
  Traveling
} = require('../../models/Motor')
const { Position } = require('../../models/Position')
const { Main, Garage, Silomat } = require('../../models/View')

const EN1 = inputs.find(b => b.addr === 'E8.3')
const EN2 = inputs.find(b => b.addr === 'E8.5')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const ENR = new Position(4, 'ENR')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A4.7'),
  outputs.find(b => b.addr === 'A4.6')
]

const RTA = inputs.find(b => b.addr === 'E8.6')
const ASBK = inputs.find(b => b.addr === 'E15.0')
const FSBK = inputs.find(b => b.addr === 'E15.1')
const SBK1 = outputs.find(b => b.addr === 'A15.7')
const SBK2 = outputs.find(b => b.addr === 'A14.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AKKS = inputs.find(b => b.addr === 'E17.4')
const ASH = inputs.find(b => b.addr === 'E9.3')
// const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E17.1')
const MNR = inputs.find(b => b.addr === 'E17.6')
const MNL = inputs.find(b => b.addr === 'E17.7')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T10 = outputs.find(b => b.addr === 'A15.0')

const M6 = new Traveling(
  0,
  IV2,
  [ENH],
  [ASH, AKKS, EMC, MNR, MNL],
  [T10],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E16.7')
const ASBK2 = inputs.find(b => b.addr === 'E15.4')
const EXD = inputs.find(b => b.addr === 'E17.0')
const TD = outputs.find(b => b.addr === 'A14.0')

const M7 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E16.4')
const ECB = inputs.find(b => b.addr === 'E16.5')
const AMC = inputs.find(b => b.addr === 'E16.6')
const SCA = outputs.find(b => b.addr === 'A15.5')
const SCB = outputs.find(b => b.addr === 'A15.6')

const M8 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E8.1')
const EX = inputs.find(b => b.addr === 'E8.4')
const EZ = inputs.find(b => b.addr === 'E10.0')
const EO = inputs.find(b => b.addr === 'E10.1')
const FB = inputs.find(b => b.addr === 'E10.2')
const AP = inputs.find(b => b.addr === 'E9.1')
const KX = outputs.find(b => b.addr === 'A4.5')
// const SZ = merkers.find(b => b.addr === 'M1.0')
// const SO = merkers.find(b => b.addr === 'M1.1')

const M9 = new DoorVFD(
  0,
  IV2,
  [],
  [EZ, EO, AP, FB, EX, FX],
  [KX],
  [EZ, EO],
  KX
)

const AMM = inputs.find(b => b.addr === 'E7.0')
const EOM1 = inputs.find(b => b.addr === 'E6.0')
const EZM1 = inputs.find(b => b.addr === 'E6.1')
const EOM2 = inputs.find(b => b.addr === 'E6.2')
const EZM2 = inputs.find(b => b.addr === 'E6.3')
const EOM3 = inputs.find(b => b.addr === 'E6.4')
const EZM3 = inputs.find(b => b.addr === 'E6.5')
const EOM4 = inputs.find(b => b.addr === 'E6.6')
const EZM4 = inputs.find(b => b.addr === 'E6.7')
const SMA1 = outputs.find(b => b.addr === 'A8.0')
const SMB1 = outputs.find(b => b.addr === 'A8.1')
const SMA2 = outputs.find(b => b.addr === 'A8.2')
const SMB2 = outputs.find(b => b.addr === 'A8.3')
const SMA3 = outputs.find(b => b.addr === 'A8.4')
const SMB3 = outputs.find(b => b.addr === 'A8.5')
const SMA4 = outputs.find(b => b.addr === 'A8.6')
const SMB4 = outputs.find(b => b.addr === 'A8.7')

const M2 = new Lock(1, [EZM1, EOM1, AMM], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM], [SMA2, SMB2])
const M4 = new Lock(3, [EZM3, EOM3, AMM], [SMA3, SMB3])
const M5 = new Lock(4, [EZM4, EOM4, AMM], [SMA4, SMB4])

const RMV = inputs.find(b => b.addr === 'E14.0')
const RMH = inputs.find(b => b.addr === 'E14.1')
const RES = inputs.find(b => b.addr === 'E14.2')
const REH = inputs.find(b => b.addr === 'E14.3')
const RCV = inputs.find(b => b.addr === 'E14.4')
const REAV = inputs.find(b => b.addr === 'E14.5')
const REAH = inputs.find(b => b.addr === 'E14.6')
const RCH = inputs.find(b => b.addr === 'E14.7')
const T2 = outputs.find(b => b.addr === 'A15.1')
const TRA = outputs.find(b => b.addr === 'A15.2')
const TRB = outputs.find(b => b.addr === 'A15.3')
const KCS = outputs.find(b => b.addr === 'A14.4')
const KCV = outputs.find(b => b.addr === 'A14.5')
const KCH = outputs.find(b => b.addr === 'A14.6')

const AF8 = inputs.find(b => b.addr === 'E9.2')
const MTC = inputs.find(b => b.addr === 'E15.2')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6, M7])

const L1 = outputs.find(b => b.addr === 'A5.0')
const L2 = outputs.find(b => b.addr === 'A5.1')
const L3 = outputs.find(b => b.addr === 'A5.2')
const L4 = outputs.find(b => b.addr === 'A5.3')
const L5 = outputs.find(b => b.addr === 'A5.4')

const EPZ = inputs.find(b => b.addr === 'E16.2')
const FPE = inputs.find(b => b.addr === 'E10.3')
const FLA = inputs.find(b => b.addr === 'E11.1')
const FLP = inputs.find(b => b.addr === 'E11.0')
const FDR = inputs.find(b => b.addr === 'E10.4')
const FDL = inputs.find(b => b.addr === 'E10.5')
const FTA1 = inputs.find(b => b.addr === 'E10.6')
const FTA2 = inputs.find(b => b.addr === 'E10.7')

const garage = new Garage(
  [IV2],
  [M8, M9],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage, silomat]

const device = new Device(1, 'EL1', [], lamps, motors, views)

module.exports = { device, drives, positions }
