import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E121.2'),
  outputs.find(b => b.addr === 'A100.5'),
  outputs.find(b => b.addr === 'A100.4')
]

const EN3 = inputs.find(b => b.addr === 'E122.5')
const IV3 = new Drive(1, 'IV3', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const AD = inputs.find(b => b.addr === 'E121.4')
const ASBK2 = inputs.find(b => b.addr === 'E121.5')
const EXD = inputs.find(b => b.addr === 'E126.7')
const EXH = inputs.find(b => b.addr === 'E127.0')
const TD = outputs.find(b => b.addr === 'A121.0') // SBK3

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E122.3')
const EZ = inputs.find(b => b.addr === 'E125.0')
const EO = inputs.find(b => b.addr === 'E125.1')
const FB = inputs.find(b => b.addr === 'E123.3')
const SZ = outputs.find(b => b.addr === 'A122.2')
const SO = outputs.find(b => b.addr === 'A122.1')
const KX = outputs.find(b => b.addr === 'A122.0')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E122.4')
const EZB = inputs.find(b => b.addr === 'E124.6')
const EOB = inputs.find(b => b.addr === 'E124.7')
const FBB = inputs.find(b => b.addr === 'E123.2')
const SZB = outputs.find(b => b.addr === 'A122.5')
const SOB = outputs.find(b => b.addr === 'A122.4')
const KXB = outputs.find(b => b.addr === 'A122.3')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const ECA = inputs.find(b => b.addr === 'E123.0')
const ECB = inputs.find(b => b.addr === 'E123.1')
const AMC = inputs.find(b => b.addr === 'E122.1')
const SCA = outputs.find(b => b.addr === 'A121.6')
const SCB = outputs.find(b => b.addr === 'A121.7')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.1'),
  key: 'action-entry'
}

const drives = [IV3]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3, M4])

const views = [main]

const device = new Device(4, 'E1', [A0], lamps, motors, views)

export default { device, drives, positions }
