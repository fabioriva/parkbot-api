import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting, Rotation, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E4.0')
const EN2 = inputs.find(b => b.addr === 'E4.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH = new Position(3, 'LH')
const ENR = new Position(4, 'ENR')
const positions = [LV1, LV2, LH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const RTA = inputs.find(b => b.addr === 'E4.2')
const ASBK = inputs.find(b => b.addr === 'E4.7')
const FSBK = inputs.find(b => b.addr === 'E4.6')
const SBK1 = outputs.find(b => b.addr === 'A4.7')
const SBK2 = outputs.find(b => b.addr === 'A5.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E5.0')
const AMM2 = inputs.find(b => b.addr === 'E5.1')
const AMM3 = inputs.find(b => b.addr === 'E5.2')
const AMM4 = inputs.find(b => b.addr === 'E5.3')
const EOM1 = inputs.find(b => b.addr === 'E10.0')
const EZM1 = inputs.find(b => b.addr === 'E10.1')
const EOM2 = inputs.find(b => b.addr === 'E10.2')
const EZM2 = inputs.find(b => b.addr === 'E10.3')
const EOM3 = inputs.find(b => b.addr === 'E10.4')
const EZM3 = inputs.find(b => b.addr === 'E10.5')
const EOM4 = inputs.find(b => b.addr === 'E10.6')
const EZM4 = inputs.find(b => b.addr === 'E10.7')
const SMA1 = outputs.find(b => b.addr === 'A7.0')
const SMB1 = outputs.find(b => b.addr === 'A7.1')
const SMA2 = outputs.find(b => b.addr === 'A7.2')
const SMB2 = outputs.find(b => b.addr === 'A7.3')
const SMA3 = outputs.find(b => b.addr === 'A7.4')
const SMB3 = outputs.find(b => b.addr === 'A7.5')
const SMA4 = outputs.find(b => b.addr === 'A7.6')
const SMB4 = outputs.find(b => b.addr === 'A7.7')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])
const M4 = new Lock(3, [EZM3, EOM3, AMM3], [SMA3, SMB3])
const M5 = new Lock(4, [EZM4, EOM4, AMM4], [SMA4, SMB4])

const AKKP = inputs.find(b => b.addr === 'E4.5')
const AIV = inputs.find(b => b.addr === 'E4.3')
const AH = inputs.find(b => b.addr === 'E17.4')
const EMC = inputs.find(b => b.addr === 'E12.1')
const MNR = inputs.find(b => b.addr === 'E12.2')
const MNL = inputs.find(b => b.addr === 'E12.3')
const EFLR = inputs.find(b => b.addr === 'E16.2')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T10 = outputs.find(b => b.addr === 'A10.4')

const M6 = new Traveling(
  0,
  IV2,
  [LH],
  [AKKP, AIV, AH, EMC, MNR, MNL, EFLR],
  [T10],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E13.3')
const ASBK2 = inputs.find(b => b.addr === 'E13.1')
const EXD = inputs.find(b => b.addr === 'E12.0')
const TD = outputs.find(b => b.addr === 'A8.1')

const M7 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const AMMD = inputs.find(b => b.addr === 'E14.0')
const EOMD = inputs.find(b => b.addr === 'E12.6')
const EZMD = inputs.find(b => b.addr === 'E12.7')
const SMAD = outputs.find(b => b.addr === 'A9.0')
const SMBD = outputs.find(b => b.addr === 'A9.1')

const M8 = new Lock(0, [EZMD, EOMD, AMMD], [SMAD, SMBD])

const ECA = inputs.find(b => b.addr === 'E16.4')
const ECB = inputs.find(b => b.addr === 'E16.5')
const AMC = inputs.find(b => b.addr === 'E17.2')
const SCA = outputs.find(b => b.addr === 'A10.4')
const SCB = outputs.find(b => b.addr === 'A10.5')

const M9 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E8.0')
const EZ = inputs.find(b => b.addr === 'E6.0')
const EO = inputs.find(b => b.addr === 'E6.1')
const FB = inputs.find(b => b.addr === 'E6.2')
const AP = inputs.find(b => b.addr === 'E5.5')
const KX = outputs.find(b => b.addr === 'A6.3')
const SZ = outputs.find(b => b.addr === 'A6.1')
const SO = outputs.find(b => b.addr === 'A6.2')
const SP = outputs.find(b => b.addr === 'A6.0')

const M10 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const RMV = inputs.find(b => b.addr === 'E15.0')
const RMH = inputs.find(b => b.addr === 'E15.1')
const RES = inputs.find(b => b.addr === 'E15.2')
const REH = inputs.find(b => b.addr === 'E15.3')
const RCV = inputs.find(b => b.addr === 'E15.4')
const REAV = inputs.find(b => b.addr === 'E15.5')
const REAH = inputs.find(b => b.addr === 'E15.6')
const RCH = inputs.find(b => b.addr === 'E15.7')
const T2 = outputs.find(b => b.addr === 'A10.0')
const TRA = outputs.find(b => b.addr === 'A10.1')
const TRB = outputs.find(b => b.addr === 'A10.1')
const KCS = outputs.find(b => b.addr === 'A8.5')
const KCV = outputs.find(b => b.addr === 'A8.6')
const KCH = outputs.find(b => b.addr === 'A8.7')

const AF8 = inputs.find(b => b.addr === 'E4.4')
const MTC = inputs.find(b => b.addr === 'E17.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10]

const L1 = outputs.find(b => b.addr === 'A2.0')
const L2 = outputs.find(b => b.addr === 'A2.1')
const L3 = outputs.find(b => b.addr === 'A2.2')
const L4 = outputs.find(b => b.addr === 'A2.3')
const L5 = outputs.find(b => b.addr === 'A2.4')

const FDR = inputs.find(b => b.addr === 'E6.4')
const FDL = inputs.find(b => b.addr === 'E6.5')
const FLA = inputs.find(b => b.addr === 'E7.3')
const FLP = inputs.find(b => b.addr === 'E7.2')
const FPE = inputs.find(b => b.addr === 'E6.3')
// const EPZ = inputs.find(b => b.addr === 'E104.6')
const FRE1 = inputs.find(b => b.addr === 'E16.6')
const FRE2 = inputs.find(b => b.addr === 'E16.7')
const FTA1 = inputs.find(b => b.addr === 'E7.0')
const FTA2 = inputs.find(b => b.addr === 'E7.1')
const FDL2 = inputs.find(b => b.addr === 'E6.6')
const FDR2 = inputs.find(b => b.addr === 'E6.7')
// const FTA3 = inputs.find(b => b.addr === 'E108.3')

const main = new Main(drives, [M1, M6, M7, M8])

const garage = new Garage(
  [],
  [M2, M3, M4, M5, M9, M10],
  [L1, L2, L3, L4, L5],
  [FRE1, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FDL2, FDR2, FRE2]
)

const views = [main, garage, silomat]

const device = new Device(1, 'EL', [], lamps, motors, views)

export default { device, drives, positions }
