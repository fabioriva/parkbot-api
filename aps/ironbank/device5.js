const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device, DeviceView } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Barrier, Door, Flap, Rotation } = require('../../models/Motor')

const device = new Device(5, 'C')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.3'),
  key: 'action-entry'
}

const EN1 = inputs.find(b => b.addr === 'E16.0')
const IV1 = new Drive(1, 'IVC', EN1)

/**
 * Rotation
 */
// const AD = inputs.find(b => b.addr === 'E105.1')
// const ASBK2 = inputs.find(b => b.addr === 'E104.1')
const MDR = inputs.find(b => b.addr === 'E17.0')
const MDL = inputs.find(b => b.addr === 'E17.1')
const EDR = inputs.find(b => b.addr === 'E17.2')
const EDL = inputs.find(b => b.addr === 'E17.3')
const TD = outputs.find(b => b.addr === 'A8.2')

const M1 = new Rotation(
  0,
  IV1,
  [],
  [MDR, MDL, EDR, EDL],
  [TD],
  [],
  TD
)

const AMC = inputs.find(b => b.addr === 'E17.7')
const ECA = inputs.find(b => b.addr === 'E17.5')
const ECB = inputs.find(b => b.addr === 'E17.6')
const SCA = outputs.find(b => b.addr === 'A8.0')
const SCB = outputs.find(b => b.addr === 'A8.1')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E19.3')
const EZ = inputs.find(b => b.addr === 'E19.0')
const EO = inputs.find(b => b.addr === 'E19.1')
const FB = inputs.find(b => b.addr === 'E19.2')
const SZ = outputs.find(b => b.addr === 'A8.4')
const SO = outputs.find(b => b.addr === 'A8.5')
const SP = outputs.find(b => b.addr === 'A8.3')

const M3 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, SP]
)

const APB = inputs.find(b => b.addr === 'E19.7')
const EZB = inputs.find(b => b.addr === 'E19.4')
const EOB = inputs.find(b => b.addr === 'E19.5')
const FBB = inputs.find(b => b.addr === 'E19.6')
const SZB = outputs.find(b => b.addr === 'A8.6')
const SOB = outputs.find(b => b.addr === 'A8.7')

const M4 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3, M4] }
]

const view = new DeviceView(device, [A0], lamps, views)

module.exports = { device, drives, motors, positions, view }
