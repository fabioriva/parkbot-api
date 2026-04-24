import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Barrier, Door, Flap } from '../../../models/Motor.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E301.2'),
  outputs.find(b => b.addr === 'A300.5'),
  outputs.find(b => b.addr === 'A300.4')
]

const positions = []

const AP = inputs.find(b => b.addr === 'E302.3')
const EZ = inputs.find(b => b.addr === 'E305.0')
const EO = inputs.find(b => b.addr === 'E305.1')
const FB = inputs.find(b => b.addr === 'E303.3')
const SZ = outputs.find(b => b.addr === 'A302.2')
const SO = outputs.find(b => b.addr === 'A302.1')
const KX = outputs.find(b => b.addr === 'A302.0')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E302.4')
const EZB = inputs.find(b => b.addr === 'E304.6')
const EOB = inputs.find(b => b.addr === 'E304.7')
const FBB = inputs.find(b => b.addr === 'E303.2')
const SZB = outputs.find(b => b.addr === 'A302.5')
const SOB = outputs.find(b => b.addr === 'A302.4')
const KXB = outputs.find(b => b.addr === 'A302.3')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const ECA = inputs.find(b => b.addr === 'E303.0')
const ECB = inputs.find(b => b.addr === 'E303.1')
const AMC = inputs.find(b => b.addr === 'E302.1')
const SCA = outputs.find(b => b.addr === 'A301.6')
const SCB = outputs.find(b => b.addr === 'A301.7')

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

const drives = []

const motors = [M2, M3, M4]

const main = new Main(drives, [M2, M3, M4])

const views = [main]

const device = new Device(6, 'E3', [A0], lamps, motors, views)

export default { device, drives, positions }
