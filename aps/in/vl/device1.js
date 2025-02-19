import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Barrier,
  Door,
  Flap,
  Lock,
  Hoisting,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E1.0')
const EN2 = inputs.find(b => b.addr === 'E13.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH = new Position(3, 'LH')
const positions = [LV1, LV2, LH]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const RTA = inputs.find(b => b.addr === 'E2.6')
const ASBK = inputs.find(b => b.addr === 'E2.5')
const FSBK = inputs.find(b => b.addr === 'E2.4')
const SBK1 = outputs.find(b => b.addr === 'A0.0')
const SBK2 = outputs.find(b => b.addr === 'A0.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E8.2')
const EOM = inputs.find(b => b.addr === 'E8.4')
const EZM = inputs.find(b => b.addr === 'E8.5')
const SMA = outputs.find(b => b.addr === 'A6.0')
const SMB = outputs.find(b => b.addr === 'A6.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E8.0')
const AH = inputs.find(b => b.addr === 'E14.0')
// const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E8.6')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A9.0')
const T102 = outputs.find(b => b.addr === 'A9.1')
const T10F = outputs.find(b => b.addr === 'A10.1')

const M3 = new Traveling(
  0,
  IV2,
  [LH],
  [AH, AGK, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E12.0')
const RMH = inputs.find(b => b.addr === 'E12.1')
const RES = inputs.find(b => b.addr === 'E12.2')
const REH = inputs.find(b => b.addr === 'E12.3')
const RCV = inputs.find(b => b.addr === 'E12.4')
const REAV = inputs.find(b => b.addr === 'E12.5')
const REAH = inputs.find(b => b.addr === 'E12.6')
const RCH = inputs.find(b => b.addr === 'E12.7')
const T2 = outputs.find(b => b.addr === 'A10.0')
const TRA = outputs.find(b => b.addr === 'A9.2')
const TRB = outputs.find(b => b.addr === 'A9.3')
const KCS = outputs.find(b => b.addr === 'A9.4')
const KCV = outputs.find(b => b.addr === 'A9.5')
const KCH = outputs.find(b => b.addr === 'A9.6')

const AF8 = inputs.find(b => b.addr === 'E8.3')
const MTC = inputs.find(b => b.addr === 'E14.1')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const ECA = inputs.find(b => b.addr === 'E2.0')
const ECB = inputs.find(b => b.addr === 'E2.1')
const AMC = inputs.find(b => b.addr === 'E2.2')
const SCA = outputs.find(b => b.addr === 'A2.0')
const SCB = outputs.find(b => b.addr === 'A2.1')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E4.7')
const EZ = inputs.find(b => b.addr === 'E4.4')
const EO = inputs.find(b => b.addr === 'E4.5')
const FB = inputs.find(b => b.addr === 'E4.6')
const SZ = outputs.find(b => b.addr === 'A4.2')
const SO = outputs.find(b => b.addr === 'A4.3')
const KX = outputs.find(b => b.addr === 'A2.3')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E4.3')
const EZB = inputs.find(b => b.addr === 'E4.0')
const EOB = inputs.find(b => b.addr === 'E4.1')
const FBB = inputs.find(b => b.addr === 'E4.2')
const SZB = outputs.find(b => b.addr === 'A4.0')
const SOB = outputs.find(b => b.addr === 'A4.1')
const KXB = outputs.find(b => b.addr === 'A2.2')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const L1 = outputs.find(b => b.addr === 'A3.0')
const L2 = outputs.find(b => b.addr === 'A3.1')
const L3 = outputs.find(b => b.addr === 'A3.2')
const L4 = outputs.find(b => b.addr === 'A3.3')
const L5 = outputs.find(b => b.addr === 'A3.4')

const FDL = inputs.find(b => b.addr === 'E6.2')
const FDR = inputs.find(b => b.addr === 'E6.3')
const FLA = inputs.find(b => b.addr === 'E6.4')
const FLP = inputs.find(b => b.addr === 'E6.1')
const FPE = inputs.find(b => b.addr === 'E6.0')
const EPZ = inputs.find(b => b.addr === 'E7.6')
// const EPZH = inputs.find(b => b.addr === 'E7.7')
const FTA1 = inputs.find(b => b.addr === 'E6.5')
const FTA2 = inputs.find(b => b.addr === 'E6.6')

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M4, M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)
const views = [main, garage, silomat]

const device = new Device(1, 'EL', [], lamps, motors, views)

export default { device, drives, positions }
