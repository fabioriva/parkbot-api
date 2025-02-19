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

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const ENH = new Position(7, 'ENH')
const ENR = new Position(8, 'ENR')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E203.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const EN1 = inputs.find(b => b.addr === 'E204.3')
const IV1 = new Drive(1, 'IV1', EN1)

const RTA = inputs.find(b => b.addr === 'E204.6')
const ASBK = inputs.find(b => b.addr === 'E204.5')
const FSBK = inputs.find(b => b.addr === 'E204.4')
const FSQA = inputs.find(b => b.addr === 'E204.7')
const SBK1 = outputs.find(b => b.addr === 'A200.2')
const SBK2 = outputs.find(b => b.addr === 'A203.5')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, FSQA],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E211.2')
const EOM1 = inputs.find(b => b.addr === 'E211.0')
const EZM1 = inputs.find(b => b.addr === 'E211.1')
const AMM2 = inputs.find(b => b.addr === 'E211.5')
const EOM2 = inputs.find(b => b.addr === 'E211.3')
const EZM2 = inputs.find(b => b.addr === 'E211.4')
const SMA1 = outputs.find(b => b.addr === 'A210.0')
const SMB1 = outputs.find(b => b.addr === 'A210.1')
const SMA2 = outputs.find(b => b.addr === 'A210.2')
const SMB2 = outputs.find(b => b.addr === 'A210.3')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const ASH = inputs.find(b => b.addr === 'E205.3')
const AIV = inputs.find(b => b.addr === 'E205.4')
const EMC = inputs.find(b => b.addr === 'E213.6')
const MNR = inputs.find(b => b.addr === 'E213.3')
const MNL = inputs.find(b => b.addr === 'E213.4')
const T10 = outputs.find(b => b.addr === 'A212.0')
const TLIV = outputs.find(b => b.addr === 'A203.6')

const M4 = new Traveling(
  0,
  IV1,
  [ENH],
  [ASH, AIV, EMC, MNR, MNL],
  [T10, TLIV],
  [],
  T10
)

const AD = inputs.find(b => b.addr === 'E212.0')
const AKKS = inputs.find(b => b.addr === 'E212.5')
const EXD = inputs.find(b => b.addr === 'E211.7')
const TD = outputs.find(b => b.addr === 'A211.0')

const M5 = new Rotation(
  0,
  IV1,
  [ENR],
  [AD, AKKS, EXD],
  [TD],
  [],
  TD
)

const EOMD = inputs.find(b => b.addr === 'E212.1')
const EZMD = inputs.find(b => b.addr === 'E212.2')
const AMMD = inputs.find(b => b.addr === 'E212.3')
const SMAD = outputs.find(b => b.addr === 'A210.4')
const SMBD = outputs.find(b => b.addr === 'A210.5')

const M6 = new Lock(
  2,
  [EZMD, EOMD, AMMD],
  [SMAD, SMBD]
)

const ECA = inputs.find(b => b.addr === 'E214.3')
const ECB = inputs.find(b => b.addr === 'E214.4')
const AMC = inputs.find(b => b.addr === 'E214.6')
const SCA = outputs.find(b => b.addr === 'A212.5')
const SCB = outputs.find(b => b.addr === 'A212.6')

const M7 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const EZE = inputs.find(b => b.addr === 'E206.0')
const EOE = inputs.find(b => b.addr === 'E206.1')
const FBE = inputs.find(b => b.addr === 'E206.2')
const APE = inputs.find(b => b.addr === 'E202.7')
const SZE = outputs.find(b => b.addr === 'A200.4')
const SOE = outputs.find(b => b.addr === 'A200.5')

const M8 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E210.0')
const RMH = inputs.find(b => b.addr === 'E210.1')
const RES = inputs.find(b => b.addr === 'E210.2')
const REH = inputs.find(b => b.addr === 'E210.3')
const RCV = inputs.find(b => b.addr === 'E210.4')
const REAV = inputs.find(b => b.addr === 'E210.5')
const REAH = inputs.find(b => b.addr === 'E210.6')
const RCH = inputs.find(b => b.addr === 'E210.7')
const T2 = outputs.find(b => b.addr === 'A212.1')
const TRA = outputs.find(b => b.addr === 'A212.2')
const TRB = outputs.find(b => b.addr === 'A212.3')
const KCS = outputs.find(b => b.addr === 'A211.2')
const KCV = outputs.find(b => b.addr === 'A211.3')
const KCH = outputs.find(b => b.addr === 'A211.4')

const AF8 = inputs.find(b => b.addr === 'E205.2')
const MTC = inputs.find(b => b.addr === 'E214.7')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, ...silomat.motors]

const L1 = outputs.find(b => b.addr === 'A201.0')
const L2 = outputs.find(b => b.addr === 'A201.1')
const L3 = outputs.find(b => b.addr === 'A201.2')
const L4 = outputs.find(b => b.addr === 'A201.3')
const L5 = outputs.find(b => b.addr === 'A201.4')

const FDL = inputs.find(b => b.addr === 'E206.4')
const FDR = inputs.find(b => b.addr === 'E206.5')
const FLA = inputs.find(b => b.addr === 'E207.4')
const FLP = inputs.find(b => b.addr === 'E207.1')
const FPE = inputs.find(b => b.addr === 'E206.3')
const EPZ = inputs.find(b => b.addr === 'E214.2')
const FTA1 = inputs.find(b => b.addr === 'E206.6')
const FTA2 = inputs.find(b => b.addr === 'E206.7')
const FTA3 = inputs.find(b => b.addr === 'E207.0')
const FTA4 = inputs.find(b => b.addr === 'E207.2')

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

const garage = new Garage(
  [],
  [M7, M8],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FTA4]
)

const views = [main, garage, silomat]

const device = new Device(2, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
