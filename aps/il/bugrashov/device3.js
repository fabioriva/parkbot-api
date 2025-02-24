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
  inputs.find(b => b.addr === 'E301.4'),
  outputs.find(b => b.addr === 'A301.7'),
  outputs.find(b => b.addr === 'A301.6')
]

const EN1 = inputs.find(b => b.addr === 'E302.0')
const EN2 = inputs.find(b => b.addr === 'E302.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E302.6')
const ASBK = inputs.find(b => b.addr === 'E302.7')
const RTA = inputs.find(b => b.addr === 'E302.2')
const SBK1 = outputs.find(b => b.addr === 'A304.7')
const SBK2 = outputs.find(b => b.addr === 'A303.7')

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
const ASBK2 = inputs.find(b => b.addr === 'E303.5')
const TDF = outputs.find(b => b.addr === 'A301.2')
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
const AMM1 = inputs.find(b => b.addr === 'E303.0')
const EOM1 = inputs.find(b => b.addr === 'E304.0')
const EZM1 = inputs.find(b => b.addr === 'E304.1')
const SMA1 = outputs.find(b => b.addr === 'A303.0')
const SMB1 = outputs.find(b => b.addr === 'A303.1')

const M3 = new Lock(
  1,
  [EZM1, EOM1, AMM1],
  [SMA1, SMB1]
)

const AMM2 = inputs.find(b => b.addr === 'E303.1')
const EOM2 = inputs.find(b => b.addr === 'E304.2')
const EZM2 = inputs.find(b => b.addr === 'E304.3')
const SMA2 = outputs.find(b => b.addr === 'A303.2')
const SMB2 = outputs.find(b => b.addr === 'A303.3')

const M4 = new Lock(
  2,
  [EZM2, EOM2, AMM2],
  [SMA2, SMB2]
)

/**
 * Lock R1/2
 */
const AMM3 = inputs.find(b => b.addr === 'E303.3')
const EOM3 = inputs.find(b => b.addr === 'E305.4')
const EZM3 = inputs.find(b => b.addr === 'E305.5')
const SMA3 = outputs.find(b => b.addr === 'A307.4')
const SMB3 = outputs.find(b => b.addr === 'A307.5')

const M5 = new Lock(
  3,
  [EZM3, EOM3, AMM3],
  [SMA3, SMB3]
)

const AMM4 = inputs.find(b => b.addr === 'E303.4')
const EOM4 = inputs.find(b => b.addr === 'E312.3')
const EZM4 = inputs.find(b => b.addr === 'E312.4')
const SMA4 = outputs.find(b => b.addr === 'A307.6')
const SMB4 = outputs.find(b => b.addr === 'A307.7')

const M6 = new Lock(
  4,
  [EZM4, EOM4, AMM4],
  [SMA4, SMB4]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E303.2')
const ECB = inputs.find(b => b.addr === 'E304.4')
const AMC = inputs.find(b => b.addr === 'E304.5')
const SCA = outputs.find(b => b.addr === 'A303.4')
const SCB = outputs.find(b => b.addr === 'A303.5')

const M7 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E306.0')
const EOE = inputs.find(b => b.addr === 'E306.1')
const FBE = inputs.find(b => b.addr === 'E306.2')
const APE = inputs.find(b => b.addr === 'E311.0')
const SZE = outputs.find(b => b.addr === 'A306.1')
const SOE = outputs.find(b => b.addr === 'A306.2')
const SPE = outputs.find(b => b.addr === 'A306.0')
const KXPE = outputs.find(b => b.addr === 'A306.3')

const M8 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE, SPE, KXPE])

/**
 * Barrier E
 */
const EBZE = inputs.find(b => b.addr === 'E308.2')
const EBOE = inputs.find(b => b.addr === 'E308.3')
const FBBE = inputs.find(b => b.addr === 'E308.4')
const APBE = inputs.find(b => b.addr === 'E311.1')
const SBZE = outputs.find(b => b.addr === 'A306.5')
const SBOE = outputs.find(b => b.addr === 'A306.6')
const SPBE = outputs.find(b => b.addr === 'A306.4')

const M9 = new Barrier(0, [EBZE, EBOE, FBBE, APBE], [SBZE, SBOE, SPBE])

/**
 * Door A
 */
const EZA = inputs.find(b => b.addr === 'E310.0')
const EOA = inputs.find(b => b.addr === 'E310.1')
const FBA = inputs.find(b => b.addr === 'E310.2')
const APA = inputs.find(b => b.addr === 'E311.2')
const SZA = outputs.find(b => b.addr === 'A307.1')
const SOA = outputs.find(b => b.addr === 'A307.2')
const SPA = outputs.find(b => b.addr === 'A307.0')
const KXPA = outputs.find(b => b.addr === 'A307.3')

const M10 = new Door(0, [EZA, EOA, FBA, APA], [SZA, SOA, SPA, KXPA])

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10]

const L1 = outputs.find(b => b.addr === 'A302.0')
const L2 = outputs.find(b => b.addr === 'A302.1')
const L3 = outputs.find(b => b.addr === 'A302.2')
const L4 = outputs.find(b => b.addr === 'A302.3')
const L5 = outputs.find(b => b.addr === 'A302.4')

const FDL = inputs.find(b => b.addr === 'E306.5')
const FDR = inputs.find(b => b.addr === 'E306.4')
const FLA = inputs.find(b => b.addr === 'E307.2')
const FLP = inputs.find(b => b.addr === 'E307.0')
const FPE = inputs.find(b => b.addr === 'E306.3')
const FRE1 = inputs.find(b => b.addr === 'E304.6')
const FRE3 = inputs.find(b => b.addr === 'E304.6')
const FTA1 = inputs.find(b => b.addr === 'E306.6')
const FTA2 = inputs.find(b => b.addr === 'E306.7')
const FTA3 = inputs.find(b => b.addr === 'E308.7')

const main = new Main(drives, [M1, M3, M4, M2, M5, M6])

const garage = new Garage(
  [],
  [M7, M8, M9, M10],
  [L1, L2, L3, L4, L5],
  [FRE1, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FRE3]
)
const views = [main, garage]

const device = new Device(3, 'VT3', [], lamps, motors, views)

export default { device, drives, positions }
