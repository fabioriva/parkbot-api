import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage, Silomat } from '../../../models/View.js'

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6'),
  inputs.find(b => b.addr === 'E112.3')
]

const EN1 = inputs.find(b => b.addr === 'E102.3')
const EN2 = inputs.find(b => b.addr === 'E102.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

// const FTXV = inputs.find(b => b.addr === 'E111.6')
// const FTXH = inputs.find(b => b.addr === 'E111.7')
// const EM = inputs.find(b => b.addr === 'E111.0')
// const LC = [EM, FTXV, FTXH]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E102.4')
const ASBK = inputs.find(b => b.addr === 'E102.5')
const RTA = inputs.find(b => b.addr === 'E102.6')
const SQA = outputs.find(b => b.addr === 'A102.2')
const SBK1 = outputs.find(b => b.addr === 'A100.2')
const SBK2 = outputs.find(b => b.addr === 'A102.4')

const M1 = new Hoisting(
  0,
  IV1,
  [LV],
  [RTA, ASBK, FSBK],
  [SQA, SBK1, SBK2],
  [],
  FSBK
)

/**
 * Rotation
 */
const AKKM = inputs.find(b => b.addr === 'E101.5')
const ASBK2 = inputs.find(b => b.addr === 'E102.1')
const TD = outputs.find(b => b.addr === 'A102.6')

const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [AKKM, ASBK2],
  [TD],
  [],
  TD
)

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E110.3')
const EZM = inputs.find(b => b.addr === 'E110.4')
const AMM = inputs.find(b => b.addr === 'E110.5')
const SMA = outputs.find(b => b.addr === 'A111.0')
const SMB = outputs.find(b => b.addr === 'A111.1')

const M3 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E110.0')
const ECB = inputs.find(b => b.addr === 'E110.1')
const AMC = inputs.find(b => b.addr === 'E110.2')
const SCA = outputs.find(b => b.addr === 'A111.2')
const SCB = outputs.find(b => b.addr === 'A111.3')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E106.0')
const EOE = inputs.find(b => b.addr === 'E106.1')
const FBE = inputs.find(b => b.addr === 'E106.2')
const APE = inputs.find(b => b.addr === 'E101.6')
const SZE = outputs.find(b => b.addr === 'A100.4')
const SOE = outputs.find(b => b.addr === 'A100.5')

const M5 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E101.0')
const EOA = inputs.find(b => b.addr === 'E101.1')
const FBA = inputs.find(b => b.addr === 'E101.2')
const APA = inputs.find(b => b.addr === 'E101.3')
const SZA = outputs.find(b => b.addr === 'A102.0')
const SOA = outputs.find(b => b.addr === 'A102.1')

const M6 = new Door(0, [EZA, EOA, FBA, APA], [SZA, SOA])

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E112.0')
const RMH = inputs.find(b => b.addr === 'E112.1')
const RES = inputs.find(b => b.addr === 'E112.2')
const REH = inputs.find(b => b.addr === 'E112.3')
const RCV = inputs.find(b => b.addr === 'E112.4')
const REAV = inputs.find(b => b.addr === 'E112.5')
const REAH = inputs.find(b => b.addr === 'E112.6')
const RCH = inputs.find(b => b.addr === 'E112.7')
const T2 = outputs.find(b => b.addr === 'A100.0')
const TRA = outputs.find(b => b.addr === 'A110.2')
const TRB = outputs.find(b => b.addr === 'A110.3')
const KCS = outputs.find(b => b.addr === 'A110.4')
const KCV = outputs.find(b => b.addr === 'A110.5')
const KCH = outputs.find(b => b.addr === 'A110.6')

const AF8 = inputs.find(b => b.addr === 'E103.7')
const MTC = inputs.find(b => b.addr === 'E111.5')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const L1 = outputs.find(b => b.addr === 'A101.0')
const L2 = outputs.find(b => b.addr === 'A101.1')
const L3 = outputs.find(b => b.addr === 'A101.2')
const L4 = outputs.find(b => b.addr === 'A101.3')
const L5 = outputs.find(b => b.addr === 'A101.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const EPZ = inputs.find(b => b.addr === 'E110.6')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')

const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M4, M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)
const views = [main, garage, silomat]

const device = new Device(1, 'EVT1', [], lamps, motors, views)

export default { device, drives, positions }
