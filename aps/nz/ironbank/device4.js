import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Action } from '../../../models/Action.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Barrier, Door, Flap, Rotation } from '../../../models/Motor.js'
import { Main } from '../../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const A0 = new Action('action-entry', merkers.find(b => b.addr === 'M3.2'), def.REQ_2, 1, def.CARDS)

const EN1 = inputs.find(b => b.addr === 'E12.0')
const IV1 = new Drive(1, 'IVB', EN1)

/**
 * Rotation
 */
// const AD = inputs.find(b => b.addr === 'E105.1')
// const ASBK2 = inputs.find(b => b.addr === 'E104.1')
const MDR = inputs.find(b => b.addr === 'E13.0')
const MDL = inputs.find(b => b.addr === 'E13.1')
const EDR = inputs.find(b => b.addr === 'E13.2')
const EDL = inputs.find(b => b.addr === 'E13.3')
const TD = outputs.find(b => b.addr === 'A6.2')

const M1 = new Rotation(
  0,
  IV1,
  [],
  [MDR, MDL, EDR, EDL],
  [TD],
  [],
  TD
)

const AMC = inputs.find(b => b.addr === 'E13.7')
const ECA = inputs.find(b => b.addr === 'E13.5')
const ECB = inputs.find(b => b.addr === 'E13.6')
const SCA = outputs.find(b => b.addr === 'A6.0')
const SCB = outputs.find(b => b.addr === 'A6.1')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E15.3')
const EZ = inputs.find(b => b.addr === 'E15.0')
const EO = inputs.find(b => b.addr === 'E15.1')
const FB = inputs.find(b => b.addr === 'E15.2')
const SZ = outputs.find(b => b.addr === 'A6.4')
const SO = outputs.find(b => b.addr === 'A6.5')
const SP = outputs.find(b => b.addr === 'A6.3')

const M3 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, SP]
)

const APB = inputs.find(b => b.addr === 'E15.7')
const EZB = inputs.find(b => b.addr === 'E15.4')
const EOB = inputs.find(b => b.addr === 'E15.5')
const FBB = inputs.find(b => b.addr === 'E15.6')
const SZB = outputs.find(b => b.addr === 'A6.6')
const SOB = outputs.find(b => b.addr === 'A6.7')

const M4 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3])

const views = [main]

const device = new Device(4, 'B', [A0], lamps, motors, views)

export default { device, drives, positions }
