import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage } from '../../../models/View.js'

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E303.3'),
  outputs.find(b => b.addr === 'A300.7'),
  outputs.find(b => b.addr === 'A300.6')
]

const EN1 = inputs.find(b => b.addr === 'E304.3')
const IV1 = new Drive(1, 'IV1', EN1)

// const FTXV = inputs.find(b => b.addr === 'E303.0')
// const FTXH = inputs.find(b => b.addr === 'E303.1')
// const FTC = inputs.find(b => b.addr === 'E302.1')
// const LC = [FTXV, FTXH, FTC]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E304.4')
const ASBK = inputs.find(b => b.addr === 'E304.5')
const RTA = inputs.find(b => b.addr === 'E304.6')
const SQA = outputs.find(b => b.addr === 'A302.2')
const SBK1 = outputs.find(b => b.addr === 'A300.2')
const SBK2 = outputs.find(b => b.addr === 'A303.5')

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
const AD = inputs.find(b => b.addr === 'E305.1')
const ASBK2 = inputs.find(b => b.addr === 'E304.1')
const TD = outputs.find(b => b.addr === 'A302.6')

const M2 = new Rotation(
  0,
  IV1,
  [ENR],
  [AD, ASBK2],
  [TD],
  [],
  TD
)

/**
 * Lock V
 */
const EOM = inputs.find(b => b.addr === 'E305.3')
const EZM = inputs.find(b => b.addr === 'E305.4')
const AMM = inputs.find(b => b.addr === 'E305.5')
const SMA = outputs.find(b => b.addr === 'A302.0')
const SMB = outputs.find(b => b.addr === 'A302.1')

const M3 = new Lock(
  1,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Lock R
 */
const EOMD = inputs.find(b => b.addr === 'E308.0')
const EZMD = inputs.find(b => b.addr === 'E308.1')
const AMMD = inputs.find(b => b.addr === 'E308.2')
const SMAD = outputs.find(b => b.addr === 'A305.0')
const SMBD = outputs.find(b => b.addr === 'A305.1')

const M4 = new Lock(
  2,
  [EZMD, EOMD, AMMD],
  [SMAD, SMBD]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E302.4')
const ECB = inputs.find(b => b.addr === 'E302.5')
const AMC = inputs.find(b => b.addr === 'E302.6')
const SCA = outputs.find(b => b.addr === 'A302.4')
const SCB = outputs.find(b => b.addr === 'A302.5')

const M5 = new Flap(
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
const APE = inputs.find(b => b.addr === 'E302.7')
const SZE = outputs.find(b => b.addr === 'A300.4')
const SOE = outputs.find(b => b.addr === 'A300.5')

const M6 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])

const drives = [IV1]

const motors = [M1, M2, M3, M4, M5, M6]

const L1 = outputs.find(b => b.addr === 'A301.0')
const L2 = outputs.find(b => b.addr === 'A301.1')
const L3 = outputs.find(b => b.addr === 'A301.2')
const L4 = outputs.find(b => b.addr === 'A301.3')
const L5 = outputs.find(b => b.addr === 'A301.4')

const FDL = inputs.find(b => b.addr === 'E306.4')
const FDR = inputs.find(b => b.addr === 'E306.5')
const FLA = inputs.find(b => b.addr === 'E307.2')
const FLP = inputs.find(b => b.addr === 'E307.0')
const FPE = inputs.find(b => b.addr === 'E306.3')
const EPZ = inputs.find(b => b.addr === 'E307.5')
const FTA1 = inputs.find(b => b.addr === 'E306.6')
const FTA2 = inputs.find(b => b.addr === 'E306.7')

const main = new Main(drives, [M1, M2, M3, M4])

const garage = new Garage(
  [],
  [M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage]

const device = new Device(3, 'EL3', [], lamps, motors, views)

export default { device, drives, positions }
