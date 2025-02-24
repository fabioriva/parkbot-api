import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Lock, Hoisting, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage } from '../../../models/View.js'

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENR = new Position(3, 'ENR')
const positions = [LV1, LV2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E201.4'),
  outputs.find(b => b.addr === 'A201.7'),
  outputs.find(b => b.addr === 'A201.6')
]

const EN1 = inputs.find(b => b.addr === 'E202.0')
const EN2 = inputs.find(b => b.addr === 'E202.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E202.6')
const ASBK = inputs.find(b => b.addr === 'E202.7')
const RTA = inputs.find(b => b.addr === 'E202.2')
const SBK1 = outputs.find(b => b.addr === 'A204.7')
const SBK2 = outputs.find(b => b.addr === 'A203.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Rotation
 */
const ASBK2 = inputs.find(b => b.addr === 'E203.5')
const TDF = outputs.find(b => b.addr === 'A201.2')
const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [ASBK2],
  [TDF],
  [],
  TDF
)

/**
 * Lock V1/2
 */
const AMM1 = inputs.find(b => b.addr === 'E203.0')
const EOM1 = inputs.find(b => b.addr === 'E204.0')
const EZM1 = inputs.find(b => b.addr === 'E204.1')
const SMA1 = outputs.find(b => b.addr === 'A203.0')
const SMB1 = outputs.find(b => b.addr === 'A203.1')

const M3 = new Lock(
  1,
  [EZM1, EOM1, AMM1],
  [SMA1, SMB1]
)

const AMM2 = inputs.find(b => b.addr === 'E203.1')
const EOM2 = inputs.find(b => b.addr === 'E204.2')
const EZM2 = inputs.find(b => b.addr === 'E204.3')
const SMA2 = outputs.find(b => b.addr === 'A203.2')
const SMB2 = outputs.find(b => b.addr === 'A203.3')

const M4 = new Lock(
  2,
  [EZM2, EOM2, AMM2],
  [SMA2, SMB2]
)

/**
 * Lock R1/2
 */
const AMM3 = inputs.find(b => b.addr === 'E203.3')
const EOM3 = inputs.find(b => b.addr === 'E205.4')
const EZM3 = inputs.find(b => b.addr === 'E205.5')
const SMA3 = outputs.find(b => b.addr === 'A207.4')
const SMB3 = outputs.find(b => b.addr === 'A207.5')

const M5 = new Lock(
  3,
  [EZM3, EOM3, AMM3],
  [SMA3, SMB3]
)

const AMM4 = inputs.find(b => b.addr === 'E203.4')
const EOM4 = inputs.find(b => b.addr === 'E212.3')
const EZM4 = inputs.find(b => b.addr === 'E212.4')
const SMA4 = outputs.find(b => b.addr === 'A207.6')
const SMB4 = outputs.find(b => b.addr === 'A207.7')

const M6 = new Lock(
  4,
  [EZM4, EOM4, AMM4],
  [SMA4, SMB4]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E203.2')
const ECB = inputs.find(b => b.addr === 'E204.4')
const AMC = inputs.find(b => b.addr === 'E204.5')
const SCA = outputs.find(b => b.addr === 'A203.4')
const SCB = outputs.find(b => b.addr === 'A203.5')

const M7 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door
 */
const EZE = inputs.find(b => b.addr === 'E206.0')
const EOE = inputs.find(b => b.addr === 'E206.1')
const FBE = inputs.find(b => b.addr === 'E206.2')
const APE = inputs.find(b => b.addr === 'E211.0')
const SZE = outputs.find(b => b.addr === 'A206.1')
const SOE = outputs.find(b => b.addr === 'A206.2')
const SPE = outputs.find(b => b.addr === 'A206.0')
const KXPE = outputs.find(b => b.addr === 'A206.3')

const M8 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE, SPE, KXPE])

/**
 * Barrier
 */
const EBZE = inputs.find(b => b.addr === 'E208.2')
const EBOE = inputs.find(b => b.addr === 'E208.3')
const FBBE = inputs.find(b => b.addr === 'E208.4')
const APBE = inputs.find(b => b.addr === 'E211.1')
const SBZE = outputs.find(b => b.addr === 'A206.5')
const SBOE = outputs.find(b => b.addr === 'A206.6')
const SPBE = outputs.find(b => b.addr === 'A206.4')

const M9 = new Barrier(0, [EBZE, EBOE, FBBE, APBE], [SBZE, SBOE, SPBE])

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9]

const L1 = outputs.find(b => b.addr === 'A202.0')
const L2 = outputs.find(b => b.addr === 'A202.1')
const L3 = outputs.find(b => b.addr === 'A202.2')
const L4 = outputs.find(b => b.addr === 'A202.3')
const L5 = outputs.find(b => b.addr === 'A202.4')

const FDL = inputs.find(b => b.addr === 'E206.5')
const FDR = inputs.find(b => b.addr === 'E206.4')
const FLA = inputs.find(b => b.addr === 'E207.2')
const FLP = inputs.find(b => b.addr === 'E207.0')
const FPE = inputs.find(b => b.addr === 'E206.3')
const FRE1 = inputs.find(b => b.addr === 'E204.6')
const FRE2 = inputs.find(b => b.addr === 'E204.6')
const FTA1 = inputs.find(b => b.addr === 'E206.6')
const FTA2 = inputs.find(b => b.addr === 'E206.7')
const FTA3 = inputs.find(b => b.addr === 'E208.7')

const main = new Main(drives, [M1, M3, M4, M2, M5, M6])

const garage = new Garage(
  [],
  [M7, M8, M9],
  [L1, L2, L3, L4, L5],
  [FRE1, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FRE2]
)
const views = [main, garage]

const device = new Device(2, 'VT2', [], lamps, motors, views)

export default { device, drives, positions }
