import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Door,
  Hoisting,
  Lock
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E5.5')
const IV1 = new Drive(2, 'IV', EN1)
const LV1 = new Position(2, 'LV')
const positions = [LV1]
const lamps = [
  inputs.find(b => b.addr === 'E3.0'),
  outputs.find(b => b.addr === 'A15.0'),
  outputs.find(b => b.addr === 'A16.0')
]

const RTA = inputs.find(b => b.addr === 'E3.3')
const ASBK = inputs.find(b => b.addr === 'E3.6')
const FSBK = inputs.find(b => b.addr === 'E4.1')
const SBK1 = outputs.find(b => b.addr === 'A2.2')
const SBK2 = outputs.find(b => b.addr === 'A2.3')
const M1 = new Hoisting(
  0,
  IV1,
  [LV1],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E4.7')
const EOM = inputs.find(b => b.addr === 'E8.7')
const EZM = inputs.find(b => b.addr === 'E9.0')
const SMA = outputs.find(b => b.addr === 'A3.0')
const SMB = outputs.find(b => b.addr === 'A3.1')
const M2 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

const AP = inputs.find(b => b.addr === 'E5.2')
const EZ = inputs.find(b => b.addr === 'E9.6')
const EO = inputs.find(b => b.addr === 'E9.5')
const FB = inputs.find(b => b.addr === 'E9.4')
const SZ = outputs.find(b => b.addr === 'A4.7')
const SO = outputs.find(b => b.addr === 'A4.6')
const KX = outputs.find(b => b.addr === 'A4.5')
const M4 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M4]

const main = new Main(drives, [M1, M2, M4])

const views = [main]

const device = new Device(2, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
