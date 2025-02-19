import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Door,
  Flap,
  Lock,
  Hoisting
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E301.1')
const IV1 = new Drive(3, 'IV1', EN1)

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')

const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E301.3'),
  outputs.find(b => b.addr === 'A301.7'),
  outputs.find(b => b.addr === 'A301.6')
]

const RTA = inputs.find(b => b.addr === 'E302.0')
const ASBK = inputs.find(b => b.addr === 'E301.5')
const FSBK = inputs.find(b => b.addr === 'E301.6')
const SBK1 = outputs.find(b => b.addr === 'A301.0')
const SBK2 = outputs.find(b => b.addr === 'A301.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E320.0')
const EOM = inputs.find(b => b.addr === 'E320.1')
const EZM = inputs.find(b => b.addr === 'E320.2')
const SMA = outputs.find(b => b.addr === 'A320.1')
const SMB = outputs.find(b => b.addr === 'A320.2')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ECA = inputs.find(b => b.addr === 'E320.4')
const ECB = inputs.find(b => b.addr === 'E320.5')
const AMC = inputs.find(b => b.addr === 'E320.3')
const SCA = outputs.find(b => b.addr === 'A320.3')
const SCB = outputs.find(b => b.addr === 'A320.4')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E320.6')
const EZ = inputs.find(b => b.addr === 'E322.0')
const EO = inputs.find(b => b.addr === 'E322.1')
const FB = inputs.find(b => b.addr === 'E322.2')
const SZ = outputs.find(b => b.addr === 'A320.6')
const SO = outputs.find(b => b.addr === 'A320.7')
const KX = outputs.find(b => b.addr === 'A320.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M4, M5]

const main = new Main(drives, [M1, M2, M4, M5])

const views = [main]

const device = new Device(3, 'EL3', [], lamps, motors, views)

export default { device, drives, positions }
