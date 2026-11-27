import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage } from '../../../models/View.js'

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find((b) => b.addr === 'E1.4'),
  outputs.find((b) => b.addr === 'A1.5'),
  outputs.find((b) => b.addr === 'A1.4')
]

const EN1 = inputs.find((b) => b.addr === 'E2.6')
const IV1 = new Drive(1, 'IV1', EN1)

/**
 * Hoisting
 */
const FSBK = inputs.find((b) => b.addr === 'E2.0')
const ASBK = inputs.find((b) => b.addr === 'E1.7')
const RTA = inputs.find((b) => b.addr === 'E1.6')
const FTC = inputs.find((b) => b.addr === 'E4.2')
const EXPV1 = inputs.find((b) => b.addr === 'E6.4')
const EXPV2 = inputs.find((b) => b.addr === 'E6.5')
const EXPV3 = inputs.find((b) => b.addr === 'E6.6')
const SBK1 = outputs.find((b) => b.addr === 'A1.0')
const SBK2 = outputs.find((b) => b.addr === 'A1.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, FTC, EXPV1, EXPV2, EXPV3],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Lock
 */
const AMM1 = inputs.find((b) => b.addr === 'E2.2')
const EOM1 = inputs.find((b) => b.addr === 'E3.0')
const EZM1 = inputs.find((b) => b.addr === 'E3.1')
const SMA1 = outputs.find((b) => b.addr === 'A2.0')
const SMB1 = outputs.find((b) => b.addr === 'A2.1')

const M2 = new Lock(0, [EZM1, EOM1, AMM1], [SMA1, SMB1])

/**
 * Flap
 */
const ECA = inputs.find((b) => b.addr === 'E3.2')
const ECB = inputs.find((b) => b.addr === 'E3.3')
const AMC = inputs.find((b) => b.addr === 'E2.3')
const SCA = outputs.find((b) => b.addr === 'A2.2')
const SCB = outputs.find((b) => b.addr === 'A2.3')

const M3 = new Flap(0, [ECA, ECB, AMC], [SCA, SCB])

/**
 * Door E
 */
const EZE = inputs.find((b) => b.addr === 'E5.7')
const EOE = inputs.find((b) => b.addr === 'E5.6')
const FBE = inputs.find((b) => b.addr === 'E4.3')
const APE = inputs.find((b) => b.addr === 'E2.5')
const SZE = outputs.find((b) => b.addr === 'A2.6')
const SOE = outputs.find((b) => b.addr === 'A2.5')
const SPE = outputs.find((b) => b.addr === 'A2.4')

const M4 = new Door(1, [EZE, EOE, FBE, APE], [SZE, SOE, SPE])

// const L1 = outputs.find(b => b.addr === 'A102.0')
// const L2 = outputs.find(b => b.addr === 'A102.1')
// const L3 = outputs.find(b => b.addr === 'A102.2')
// const L4 = outputs.find(b => b.addr === 'A102.3')
// const L5 = outputs.find(b => b.addr === 'A102.4')

const FDL = inputs.find((b) => b.addr === 'E4.5')
const FDR = inputs.find((b) => b.addr === 'E4.6')
const FDL2 = inputs.find((b) => b.addr === 'E4.7')
const FDR2 = inputs.find((b) => b.addr === 'E5.0')
const FDL3 = inputs.find((b) => b.addr === 'E5.1')
const FDR3 = inputs.find((b) => b.addr === 'E5.2')
const FLA = inputs.find((b) => b.addr === 'E5.3')
const FLP = inputs.find((b) => b.addr === 'E5.4')
const FPE = inputs.find((b) => b.addr === 'E4.4')
const FRE1 = inputs.find((b) => b.addr === 'E4.0')
const FRE2 = inputs.find((b) => b.addr === 'E4.1')
const FTA1 = inputs.find((b) => b.addr === 'E5.5')
const FTA2 = inputs.find((b) => b.addr === 'E6.0')
const FTA21 = inputs.find((b) => b.addr === 'E6.1')
const FTA22 = inputs.find((b) => b.addr === 'E6.2')
const FTA23 = inputs.find((b) => b.addr === 'E6.3')

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2])

const garage = new Garage(
  [],
  [M3, M4],
  [/* L1, L2, L3, L4, L5 */],
  [
    FRE1,
    FPE,
    FLA,
    FLP,
    FDL,
    FDR,
    FTA1,
    FTA2,
    FRE1,
    FRE2,
    FDL2,
    FDR2,
    FDL3,
    FDR3
  ]
)

const views = [main, garage]

const device = new Device(1, 'EL', [], lamps, motors, views)

export default { device, drives, positions }
