import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Rotation } from '../../../models/Motor.js'
// import { Position } from '../../../models/Position.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E221.2'),
  outputs.find(b => b.addr === 'A200.5'),
  outputs.find(b => b.addr === 'A200.4')
]

const EN3 = inputs.find(b => b.addr === 'E222.5')
const IV3 = new Drive(1, 'IV3', EN3)

// const ENR = new Position(1, 'ENR')
const positions = []

const AD = inputs.find(b => b.addr === 'E221.4')
const ASBK2 = inputs.find(b => b.addr === 'E221.5')
const EXD = inputs.find(b => b.addr === 'E226.7')
const EXH = inputs.find(b => b.addr === 'E227.0')
const TD = outputs.find(b => b.addr === 'A221.0') // SBK3

const M1 = new Rotation(
  0,
  IV3,
  [],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E222.3')
const EZ = inputs.find(b => b.addr === 'E225.0')
const EO = inputs.find(b => b.addr === 'E225.1')
const FB = inputs.find(b => b.addr === 'E223.3')
const SZ = outputs.find(b => b.addr === 'A222.2')
const SO = outputs.find(b => b.addr === 'A222.1')
const KX = outputs.find(b => b.addr === 'A222.0')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E222.4')
const EZB = inputs.find(b => b.addr === 'E224.6')
const EOB = inputs.find(b => b.addr === 'E224.7')
const FBB = inputs.find(b => b.addr === 'E223.2')
const SZB = outputs.find(b => b.addr === 'A222.5')
const SOB = outputs.find(b => b.addr === 'A222.4')
const KXB = outputs.find(b => b.addr === 'A222.3')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const ECA = inputs.find(b => b.addr === 'E223.0')
const ECB = inputs.find(b => b.addr === 'E223.1')
const AMC = inputs.find(b => b.addr === 'E222.1')
const SCA = outputs.find(b => b.addr === 'A221.6')
const SCB = outputs.find(b => b.addr === 'A221.7')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.2'),
  key: 'action-entry'
}

const drives = [IV3]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3, M4])

const views = [main]

const device = new Device(5, 'E2', [A0], lamps, motors, views)

export default { device, drives, positions }
