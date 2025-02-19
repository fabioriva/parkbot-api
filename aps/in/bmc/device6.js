import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Barrier,
  Door,
  Rotation
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main } from '../../../models/View.js'

const EN3 = inputs.find(b => b.addr === 'E202.1')
const IV3 = new Drive(8, 'IV4', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E201.1'),
  outputs.find(b => b.addr === 'A201.0'),
  outputs.find(b => b.addr === 'A201.1')
]

const AD = inputs.find(b => b.addr === 'E201.5') // RTD
const ASBK2 = inputs.find(b => b.addr === 'E201.6') // ASR
const EXD = inputs.find(b => b.addr === 'E207.0')
const EXH = inputs.find(b => b.addr === 'E207.1')
const TD = outputs.find(b => b.addr === 'A201.3') // KBA4

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E201.4')
const EZ = inputs.find(b => b.addr === 'E206.0')
const EO = inputs.find(b => b.addr === 'E206.1')
const FB = inputs.find(b => b.addr === 'E206.4')
const SZ = outputs.find(b => b.addr === 'A203.3')
const SO = outputs.find(b => b.addr === 'A203.2')
const KX = outputs.find(b => b.addr === 'A202.2')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E201.3')
const EZB = inputs.find(b => b.addr === 'E206.2')
const EOB = inputs.find(b => b.addr === 'E206.3')
const FBB = inputs.find(b => b.addr === 'E206.5')
const SZB = outputs.find(b => b.addr === 'A203.7')
const SOB = outputs.find(b => b.addr === 'A203.6')
const KXB = outputs.find(b => b.addr === 'A202.3')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = [IV3]

const motors = [M1, M5, M6]

const main = new Main(drives, [M1, M5, M6])

const views = [main]

const device = new Device(6, 'U2', [], lamps, motors, views)

export default { device, drives, positions }
