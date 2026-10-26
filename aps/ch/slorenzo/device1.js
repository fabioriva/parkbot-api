import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Door,
  Flap,
  Lock,
  Hoisting,
  Rotation,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E2.0')
const EN2 = inputs.find(b => b.addr === 'E2.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const RTA = inputs.find(b => b.addr === 'E2.4')
const ASBK = inputs.find(b => b.addr === 'E3.2')
const FSBK = inputs.find(b => b.addr === 'E3.1')
const KEXPV1 = inputs.find(b => b.addr === 'E11.7')
const KEXPV2 = inputs.find(b => b.addr === 'E13.7')
const SBK1 = outputs.find(b => b.addr === 'A4.7')
const SBK2 = outputs.find(b => b.addr === 'A7.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, KEXPV1, KEXPV2],
  [SBK1, SBK2],
  [],
  FSBK
)

const AIV = inputs.find(b => b.addr === 'E2.5')
const ASBK2 = inputs.find(b => b.addr === 'E12.2')
const AH = inputs.find(b => b.addr === 'E12.4')
const EHP = inputs.find(b => b.addr === 'E9.2')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T10 = outputs.find(b => b.addr === 'A9.0')
const T10F = outputs.find(b => b.addr === 'A10.7')

const M6 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AIV, ASBK2, AH, EHP],
  [T10, T10F],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E12.5')
const ASBK3 = inputs.find(b => b.addr === 'E12.3')
const EXD = inputs.find(b => b.addr === 'E9.1')
const TD = outputs.find(b => b.addr === 'A9.2')

const M7 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E10.4')
const ECB = inputs.find(b => b.addr === 'E10.5')
const AMC = inputs.find(b => b.addr === 'E13.2')
const SCA = outputs.find(b => b.addr === 'A11.4')
const SCB = outputs.find(b => b.addr === 'A11.5')

const M8 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E7.0')
const EZ = inputs.find(b => b.addr === 'E4.0')
const EO = inputs.find(b => b.addr === 'E4.1')
const FB = inputs.find(b => b.addr === 'E4.2')
const AP = inputs.find(b => b.addr === 'E6.6')
const KX = outputs.find(b => b.addr === 'A6.3')
const SP = outputs.find(b => b.addr === 'A6.0')
const SZ = outputs.find(b => b.addr === 'A6.1')
const SO = outputs.find(b => b.addr === 'A6.2')

const M9 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const AMM1 = inputs.find(b => b.addr === 'E13.0')
const EOM1 = inputs.find(b => b.addr === 'E10.0')
const EZM1 = inputs.find(b => b.addr === 'E10.1')
const SMA1 = outputs.find(b => b.addr === 'A11.0')
const SMB1 = outputs.find(b => b.addr === 'A11.1')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])


const AMM2 = inputs.find(b => b.addr === 'E13.1')
const EOM2 = inputs.find(b => b.addr === 'E10.2')
const EZM2 = inputs.find(b => b.addr === 'E10.3')
const SMA2 = outputs.find(b => b.addr === 'A11.2')
const SMB2 = outputs.find(b => b.addr === 'A11.3')

const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const AMD = inputs.find(b => b.addr === 'E7.0')
const EOMD = inputs.find(b => b.addr === 'E6.2')
const EZMD = inputs.find(b => b.addr === 'E6.3')
const SMAD = outputs.find(b => b.addr === 'A8.4')
const SMBD = outputs.find(b => b.addr === 'A8.5')

const M4 = new Lock(3, [EZMD, EOMD, AMD], [SMAD, SMBD])

const RMV = inputs.find(b => b.addr === 'E14.0')
const RMH = inputs.find(b => b.addr === 'E14.1')
const RES = inputs.find(b => b.addr === 'E14.2')
const REH = inputs.find(b => b.addr === 'E14.3')
const RCV = inputs.find(b => b.addr === 'E14.4')
const REAV = inputs.find(b => b.addr === 'E14.5')
const REAH = inputs.find(b => b.addr === 'E14.6')
const RCH = inputs.find(b => b.addr === 'E14.7')
const T2 = outputs.find(b => b.addr === 'A10.0')
const TRA = outputs.find(b => b.addr === 'A10.1')
const TRB = outputs.find(b => b.addr === 'A10.2')
const KCS = outputs.find(b => b.addr === 'A10.3')
const KCV = outputs.find(b => b.addr === 'A10.4')
const KCH = outputs.find(b => b.addr === 'A10.5')

const AF8 = inputs.find(b => b.addr === 'E2.6')
const MTC = inputs.find(b => b.addr === 'E12.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M6, M7, M8, M9, ...silomat.motors]

const L1 = outputs.find(b => b.addr === 'A2.0')
const L2 = outputs.find(b => b.addr === 'A2.1')
const L3 = outputs.find(b => b.addr === 'A2.2')
const L4 = outputs.find(b => b.addr === 'A2.3')
const L5 = outputs.find(b => b.addr === 'A2.4')

const EPZ = inputs.find(b => b.addr === 'E10.6')
const FPE = inputs.find(b => b.addr === 'E4.3')
const FLA = inputs.find(b => b.addr === 'E5.2')
const FLP = inputs.find(b => b.addr === 'E5.0')
const FDR = inputs.find(b => b.addr === 'E4.4')
const FDL = inputs.find(b => b.addr === 'E4.5')
const FTA1 = inputs.find(b => b.addr === 'E11.4')
const FTA2 = inputs.find(b => b.addr === 'E11.5')

const main = new Main(drives, [M1, M2, M3, M4, M6, M7])

const garage = new Garage(
  [IV2],
  [M8, M9],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage, silomat]

const device = new Device(1, 'T', [], lamps, motors, views)

export default { device, drives, positions }
