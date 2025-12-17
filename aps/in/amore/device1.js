import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Door,
  Flap,
  Hoisting,
  Lock
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E5.4')
const IV1 = new Drive(1, 'IV', EN1)
const LV1 = new Position(1, 'LV')
const positions = [LV1]
const lamps = [
  inputs.find(b => b.addr === 'E3.0'),
  outputs.find(b => b.addr === 'A15.0'),
  outputs.find(b => b.addr === 'A16.0')
]

const RTA = inputs.find(b => b.addr === 'E3.2')
const ASBK = inputs.find(b => b.addr === 'E3.5')
const FSBK = inputs.find(b => b.addr === 'E4.0')
const SBK1 = outputs.find(b => b.addr === 'A2.0')
const SBK2 = outputs.find(b => b.addr === 'A2.1')
const M1 = new Hoisting(
  0,
  IV1,
  [LV1],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E4.6')
const EOM = inputs.find(b => b.addr === 'E6.0')
const EZM = inputs.find(b => b.addr === 'E6.1')
const SMA = outputs.find(b => b.addr === 'A2.6')
const SMB = outputs.find(b => b.addr === 'A2.7')
const M2 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

const AMC = inputs.find(b => b.addr === 'E5.0')
const ECA = inputs.find(b => b.addr === 'E6.2')
const ECB = inputs.find(b => b.addr === 'E6.3')
const SCA = outputs.find(b => b.addr === 'A3.2')
const SCB = outputs.find(b => b.addr === 'A3.3')
const M3 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E5.1')
const EZ = inputs.find(b => b.addr === 'E8.5')
const EO = inputs.find(b => b.addr === 'E8.4')
const FB = inputs.find(b => b.addr === 'E7.3')
const SZ = outputs.find(b => b.addr === 'A4.4')
const SO = outputs.find(b => b.addr === 'A4.3')
const KX = outputs.find(b => b.addr === 'A4.2')
const M4 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3, M4])

const views = [main]

const device = new Device(1, 'EL1', [], lamps, motors, views)

export default { device, drives, positions }
