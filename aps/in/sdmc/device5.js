import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Lock, Hoisting } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const LV1 = new Position(9, 'LV1')
const LV2 = new Position(10, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E501.4'),
  outputs.find(b => b.addr === 'A501.5'),
  outputs.find(b => b.addr === 'A501.4')
]

const EN1 = inputs.find(b => b.addr === 'E502.7')
const IV1 = new Drive(1, 'IV1', EN1)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E502.0')
const ASBK = inputs.find(b => b.addr === 'E501.7')
const RTA = inputs.find(b => b.addr === 'E501.6')
const SBK1 = outputs.find(b => b.addr === 'A501.0')
const SBK2 = outputs.find(b => b.addr === 'A501.1')

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
 * Lock
 */
const AMM1 = inputs.find(b => b.addr === 'E502.2')
const EOM1 = inputs.find(b => b.addr === 'E503.0')
const EZM1 = inputs.find(b => b.addr === 'E503.1')
const SMA1 = outputs.find(b => b.addr === 'A502.0')
const SMB1 = outputs.find(b => b.addr === 'A502.1')

const M2 = new Lock(
  0,
  [EZM1, EOM1, AMM1],
  [SMA1, SMB1]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E503.2')
const ECB = inputs.find(b => b.addr === 'E503.3')
const AMC = inputs.find(b => b.addr === 'E502.3')
const SCA = outputs.find(b => b.addr === 'A502.2')
const SCB = outputs.find(b => b.addr === 'A502.3')

const M3 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E505.7')
const EOE = inputs.find(b => b.addr === 'E505.6')
const FBE = inputs.find(b => b.addr === 'E504.3')
const APE = inputs.find(b => b.addr === 'E502.5')
const SZE = outputs.find(b => b.addr === 'A502.6')
const SOE = outputs.find(b => b.addr === 'A502.5')
const SPE = outputs.find(b => b.addr === 'A502.4')

const M4 = new Door(1, [EZE, EOE, FBE, APE], [SZE, SOE, SPE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E506.1')
const EOA = inputs.find(b => b.addr === 'E506.0')
const FBA = inputs.find(b => b.addr === 'E504.4')
const APA = inputs.find(b => b.addr === 'E502.6')
const SZA = outputs.find(b => b.addr === 'A503.1')
const SOA = outputs.find(b => b.addr === 'A503.0')
const SPA = outputs.find(b => b.addr === 'A502.7')

const M5 = new Door(2, [EZA, EOA, FBA, APA], [SZA, SOA, SPA])

/**
 * Barrier
 */
const EBZE = inputs.find(b => b.addr === 'E507.4')
const EBOE = inputs.find(b => b.addr === 'E507.3')
const FBBE = inputs.find(b => b.addr === 'E507.2')
// const APBE = inputs.find(b => b.addr === 'E111.1')
const SBZE = outputs.find(b => b.addr === 'A503.5')
const SBOE = outputs.find(b => b.addr === 'A503.4')
// const SPBE = outputs.find(b => b.addr === 'A506.4')

const M6 = new Barrier(0, [EBZE, EBOE, FBBE], [SBZE, SBOE])

// const L1 = outputs.find(b => b.addr === 'A502.0')
// const L2 = outputs.find(b => b.addr === 'A502.1')
// const L3 = outputs.find(b => b.addr === 'A502.2')
// const L4 = outputs.find(b => b.addr === 'A502.3')
// const L5 = outputs.find(b => b.addr === 'A502.4')

// const FDL = inputs.find(b => b.addr === 'E504.7')
// const FDR = inputs.find(b => b.addr === 'E504.6')
// const FDL2 = inputs.find(b => b.addr === 'E505.1')
// const FDR2 = inputs.find(b => b.addr === 'E505.0')
// const FLA = inputs.find(b => b.addr === 'E505.2')
// const FLP = inputs.find(b => b.addr === 'E505.3')
// const FLP2 = inputs.find(b => b.addr === 'E506.3')
// const FPE = inputs.find(b => b.addr === 'E504.5')
// const FRE1 = inputs.find(b => b.addr === 'E504.0')
// const FRE2 = inputs.find(b => b.addr === 'E504.1')
// const FTA1 = inputs.find(b => b.addr === 'E505.4')
// const FTA2 = inputs.find(b => b.addr === 'E505.5')

const drives = [IV1]

const motors = [M1, M2, M3, M4, M5, M6]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

// const garage = new Garage(
//   [],
//   [M3, M4, M5, M6],
//   [/* L1, L2, L3, L4, L5 */],
//   [FRE1, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FRE1, FRE2, FLP2, FDL2, FDR2]
// )
const views = [main] //, garage]

const device = new Device(5, 'EL5', [], lamps, motors, views)

export default { device, drives, positions }
