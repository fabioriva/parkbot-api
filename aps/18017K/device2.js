import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Action } from '../../models/Action.js'
import { Device } from '../../models/Device.js'
import { Barrier, Door, Flap } from '../../models/Motor.js'
import { Main } from '../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
//   inputs.find(b => b.addr === 'E6.3') // FPE
]

// const A0 = {
//   conn: def.REQ_2,
//   enable: merkers.find(b => b.addr === 'M3.2'),
//   key: 'action-entry'
// }
const A0 = new Action('action-entry', merkers.find(b => b.addr === 'M3.2'), def.REQ_2, 1, def.CARDS)

const AMC2 = inputs.find(b => b.addr === 'E3.1')
const ECA2 = inputs.find(b => b.addr === 'E9.5')
const ECB2 = inputs.find(b => b.addr === 'E9.6')
const SCA2 = outputs.find(b => b.addr === 'A7.4')
const SCB2 = outputs.find(b => b.addr === 'A7.5')

const Flap1 = new Flap(
  0,
  [ECA2, ECB2, AMC2],
  [SCA2, SCB2]
)

const AP = inputs.find(b => b.addr === 'E3.4')
const EZ = inputs.find(b => b.addr === 'E6.0')
const EO = inputs.find(b => b.addr === 'E6.1')
const EX = inputs.find(b => b.addr === 'E9.0')
const FB = inputs.find(b => b.addr === 'E6.2')
const SZ = outputs.find(b => b.addr === 'A9.1')
const SO = outputs.find(b => b.addr === 'A9.2')
const KX = outputs.find(b => b.addr === 'A9.3')

const Door1 = new Door(
  0,
  [EZ, EO, AP, FB, EX],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E3.5')
const EZB = inputs.find(b => b.addr === 'E9.2')
const EOB = inputs.find(b => b.addr === 'E9.3')
const FBB = inputs.find(b => b.addr === 'E9.4')
const SZB = outputs.find(b => b.addr === 'A9.5')
const SOB = outputs.find(b => b.addr === 'A9.6')
const KXB = outputs.find(b => b.addr === 'A9.7')

const Barrier1 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = []

const motors = [Barrier1, Door1, Flap1]

const main = new Main(drives, motors)

const device = new Device(2, 'EU2', [A0], lamps, motors, [main])

export default { device, drives, positions }
