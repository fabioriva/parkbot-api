import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Barrier,
  Door,
  Flap,
  Rotation
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main } from '../../../models/View.js'

const EN3 = inputs.find(b => b.addr === 'E102.0')
const IV3 = new Drive(5, 'IV3', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.1'),
  outputs.find(b => b.addr === 'A101.0'),
  outputs.find(b => b.addr === 'A101.1')
]

const AD = inputs.find(b => b.addr === 'E101.5') // RTD
const ASBK2 = inputs.find(b => b.addr === 'E101.6') // ASR
const EXD = inputs.find(b => b.addr === 'E105.4')
const EXH = inputs.find(b => b.addr === 'E105.5')
const TD = outputs.find(b => b.addr === 'A101.2') // KBA3

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E103.0')
const ECB = inputs.find(b => b.addr === 'E103.1')
const AMC = inputs.find(b => b.addr === 'E101.7')
const SCA = outputs.find(b => b.addr === 'A101.6')
const SCB = outputs.find(b => b.addr === 'A101.7')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E101.4')
const EZ = inputs.find(b => b.addr === 'E103.2')
const EO = inputs.find(b => b.addr === 'E103.3')
const FB = inputs.find(b => b.addr === 'E104.0')
const SZ = outputs.find(b => b.addr === 'A103.1')
const SO = outputs.find(b => b.addr === 'A103.0')
const KX = outputs.find(b => b.addr === 'A102.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E101.3')
const EZB = inputs.find(b => b.addr === 'E103.4')
const EOB = inputs.find(b => b.addr === 'E103.5')
const FBB = inputs.find(b => b.addr === 'E104.1')
const SZB = outputs.find(b => b.addr === 'A103.5')
const SOB = outputs.find(b => b.addr === 'A103.4')
const KXB = outputs.find(b => b.addr === 'A102.1')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = [IV3]

const motors = [M1, M4, M5, M6]

const main = new Main(drives, [M1, M4, M5, M6])

const views = [main]

const device = new Device(3, 'E1', [], lamps, motors, views)

export default { device, drives, positions }
