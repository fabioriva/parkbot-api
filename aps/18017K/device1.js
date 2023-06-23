const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Motor } = require('../../models/Motor')

const device = new Device(1, 'EU1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
//   inputs.find(b => b.addr === 'E4.3') // FPE
]

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.1'),
  key: 'action-entry'
}

const AMC1 = inputs.find(b => b.addr === 'E3.0')
const ECA1 = inputs.find(b => b.addr === 'E8.5')
const ECB1 = inputs.find(b => b.addr === 'E8.6')
const SCA1 = outputs.find(b => b.addr === 'A7.2')
const SCB1 = outputs.find(b => b.addr === 'A7.3')

const Flap = new Motor(
  1, 'mot-flap',
  [],
  [ECA1, ECB1, AMC1],
  [SCA1, SCB1],
  ['mov-up', 'mov-down', 'pos-high', 'pos-low']
)

const AP = inputs.find(b => b.addr === 'E3.2')
const EZ = inputs.find(b => b.addr === 'E4.0')
const EO = inputs.find(b => b.addr === 'E4.1')
const EX = inputs.find(b => b.addr === 'E8.0')
const FB = inputs.find(b => b.addr === 'E4.2')
const SZ = outputs.find(b => b.addr === 'A8.1')
const SO = outputs.find(b => b.addr === 'A8.2')
const KX = outputs.find(b => b.addr === 'A8.3')

const Door = new Motor(
  2, 'mot-door',
  [],
  [EZ, EO, AP, FB, EX],
  [SZ, SO, KX],
  ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
)

const APB = inputs.find(b => b.addr === 'E3.3')
const EZB = inputs.find(b => b.addr === 'E8.2')
const EOB = inputs.find(b => b.addr === 'E8.3')
const FBB = inputs.find(b => b.addr === 'E8.4')
const SZB = outputs.find(b => b.addr === 'A8.5')
const SOB = outputs.find(b => b.addr === 'A8.6')
const KXB = outputs.find(b => b.addr === 'A8.7')

const Barrier = new Motor(
  3, 'mot-barrier',
  [],
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB],
  ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
)

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  // e: [],
  motors: [Barrier, Door, Flap]
  // more: []
  // silomat: []
}

const drives = []

const motors = [Barrier, Door, Flap]

// const silomat = []

module.exports = { device, drives, motors, positions, view }
