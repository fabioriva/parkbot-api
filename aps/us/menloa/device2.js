import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage } from '../../../models/View.js'

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E301.4'),
  outputs.find(b => b.addr === 'A301.7'),
  outputs.find(b => b.addr === 'A301.6')
]

const EN1 = inputs.find(b => b.addr === 'E303.0')
const IV1 = new Drive(1, 'IV1', EN1)

/**
 * Rotation
 */
const ASBK3 = inputs.find(b => b.addr === 'E303.5')
const EXD = inputs.find(b => b.addr === 'E305.1')
const TDF = outputs.find(b => b.addr === 'A301.1')

const M1 = new Rotation(
  0,
  IV1,
  [ENR],
  [ASBK3, EXD],
  [TDF],
  [],
  TDF
)
/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E304.4')
const ECB = inputs.find(b => b.addr === 'E304.5')
const AMC = inputs.find(b => b.addr === 'E303.2')
const SCA = outputs.find(b => b.addr === 'A301.4')
const SCB = outputs.find(b => b.addr === 'A301.5')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)
/**
 * Door (INT)
 */
const EZE = inputs.find(b => b.addr === 'E306.0')
const EOE = inputs.find(b => b.addr === 'E306.1')
const FBE = inputs.find(b => b.addr === 'E306.2')
const APE = inputs.find(b => b.addr === 'E303.3')
const SZE = outputs.find(b => b.addr === 'A303.1')
const SOE = outputs.find(b => b.addr === 'A303.2')

const M3 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])
/**
 * Barrier (EXT)
 */
const EBZE = inputs.find(b => b.addr === 'E302.2')
const EBOE = inputs.find(b => b.addr === 'E302.3')
const FBBE = inputs.find(b => b.addr === 'E302.4')
const APBE = inputs.find(b => b.addr === 'E303.4')
const SBZE = outputs.find(b => b.addr === 'A303.4')
const SBOE = outputs.find(b => b.addr === 'A303.4')
const SPBE = outputs.find(b => b.addr === 'A303.4')

const M4 = new Door(0, [EBZE, EBOE, FBBE, APBE], [SBZE, SBOE, SPBE])

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const L1 = outputs.find(b => b.addr === 'A302.0')
const L2 = outputs.find(b => b.addr === 'A302.1')
const L3 = outputs.find(b => b.addr === 'A302.2')
const L4 = outputs.find(b => b.addr === 'A302.3')
const L5 = outputs.find(b => b.addr === 'A302.4')

const FDL = inputs.find(b => b.addr === 'E306.4')
const FDR = inputs.find(b => b.addr === 'E306.5')
const FLA = inputs.find(b => b.addr === 'E307.2')
const FLP = inputs.find(b => b.addr === 'E307.0')
const FPE = inputs.find(b => b.addr === 'E306.3')
const EPZ = inputs.find(b => b.addr === 'E304.6')
// const EPZ2 = inputs.find(b => b.addr === 'E304.7')
const FTA1 = inputs.find(b => b.addr === 'E306.6')
const FTA2 = inputs.find(b => b.addr === 'E306.7')
const FTA3 = inputs.find(b => b.addr === 'E302.7')

const main = new Main(drives, [M1])

const garage = new Garage(
  [],
  [M2, M3, M4],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3]
)

const views = [main, garage]

const device = new Device(2, 'EU2', [], lamps, motors, views)

export default { device, drives, positions }
