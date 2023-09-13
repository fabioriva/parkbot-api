const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Action } = require('../../../models/Action')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Barrier, Door, Flap, Rotation } = require('../../../models/Motor')
const { Main } = require('../../../models/View')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const A0 = new Action('action-entry', merkers.find(b => b.addr === 'M3.1'), def.REQ_1, 1, def.CARDS)

const EN1 = inputs.find(b => b.addr === 'E8.0')
const IV1 = new Drive(1, 'IVA', EN1)

/**
 * Rotation
 */
// const AD = inputs.find(b => b.addr === 'E105.1')
// const ASBK2 = inputs.find(b => b.addr === 'E104.1')
const MDR = inputs.find(b => b.addr === 'E9.0')
const MDL = inputs.find(b => b.addr === 'E9.1')
const EDR = inputs.find(b => b.addr === 'E9.2')
const EDL = inputs.find(b => b.addr === 'E9.3')
const TD = outputs.find(b => b.addr === 'A4.2')

const M1 = new Rotation(
  0,
  IV1,
  [],
  [MDR, MDL, EDR, EDL],
  [TD],
  [],
  TD
)

const AMC = inputs.find(b => b.addr === 'E9.7')
const ECA = inputs.find(b => b.addr === 'E9.5')
const ECB = inputs.find(b => b.addr === 'E9.6')
const SCA = outputs.find(b => b.addr === 'A4.0')
const SCB = outputs.find(b => b.addr === 'A4.1')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E11.3')
const EZ = inputs.find(b => b.addr === 'E11.0')
const EO = inputs.find(b => b.addr === 'E11.1')
const FB = inputs.find(b => b.addr === 'E11.2')
const SZ = outputs.find(b => b.addr === 'A4.4')
const SO = outputs.find(b => b.addr === 'A4.5')
const SP = outputs.find(b => b.addr === 'A4.3')

const M3 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, SP]
)

const APB = inputs.find(b => b.addr === 'E11.7')
const EZB = inputs.find(b => b.addr === 'E11.4')
const EOB = inputs.find(b => b.addr === 'E11.5')
const FBB = inputs.find(b => b.addr === 'E11.6')
const SZB = outputs.find(b => b.addr === 'A4.6')
const SOB = outputs.find(b => b.addr === 'A4.7')

const M4 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3])

const views = [main]

const device = new Device(3, 'A', [A0], lamps, motors, views)

module.exports = { device, drives, motors, positions }
