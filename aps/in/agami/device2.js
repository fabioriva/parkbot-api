import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Rotation } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E1.0'),
  outputs.find(b => b.addr === 'A1.4'),
  outputs.find(b => b.addr === 'A1.5')
]

const EN3 = inputs.find(b => b.addr === 'E2.4')
const IV3 = new Drive(1, 'IV3', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const AD = inputs.find(b => b.addr === 'E1.3')
const ASBK2 = inputs.find(b => b.addr === 'E1.4')
const EXD = inputs.find(b => b.addr === 'E5.0')
const EXH = inputs.find(b => b.addr === 'E5.1')
const TD = outputs.find(b => b.addr === 'A1.1')

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E2.2')
const EZ = inputs.find(b => b.addr === 'E3.4')
const EO = inputs.find(b => b.addr === 'E3.3')
const FB = inputs.find(b => b.addr === 'E3.2')
const SZ = outputs.find(b => b.addr === 'A2.0')
const SO = outputs.find(b => b.addr === 'A1.7')
const KX = outputs.find(b => b.addr === 'A1.6')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E2.1')
const EZB = inputs.find(b => b.addr === 'E3.1')
const EOB = inputs.find(b => b.addr === 'E3.0')
const FBB = inputs.find(b => b.addr === 'E2.7')
const SZB = outputs.find(b => b.addr === 'A2.3')
const SOB = outputs.find(b => b.addr === 'A2.2')
const KXB = outputs.find(b => b.addr === 'A2.1')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const ECA = inputs.find(b => b.addr === 'E2.5')
const ECB = inputs.find(b => b.addr === 'E2.6')
const AMC = inputs.find(b => b.addr === 'E2.0')
const SCA = outputs.find(b => b.addr === 'A1.2')
const SCB = outputs.find(b => b.addr === 'A1.3')

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

const device = new Device(2, 'EU1', [A0], lamps, motors, views)

export default { device, drives, positions }
