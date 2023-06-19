const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Motor } = require('../../models/Motor')

const device = new Device(2, 'EU2')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
//   inputs.find(b => b.addr === 'E6.3') // FPE
]

const A0 = {
  conn: def.REQ_2,
  enable: merkers.find(b => b.addr === 'M3.2'),
  key: 'action-entry'
}

const AMC2 = inputs.find(b => b.addr === 'E3.1')
const ECA2 = inputs.find(b => b.addr === 'E9.5')
const ECB2 = inputs.find(b => b.addr === 'E9.6')
const SCA2 = outputs.find(b => b.addr === 'A7.4')
const SCB2 = outputs.find(b => b.addr === 'A7.5')

const Flap = new Motor(
  1, 'mot-flap',
  [],
  [ECA2, ECB2, AMC2],
  [SCA2, SCB2],
  ['up', 'down', 'high', 'low']
)

const AP = inputs.find(b => b.addr === 'E3.4')
const EZ = inputs.find(b => b.addr === 'E6.0')
const EO = inputs.find(b => b.addr === 'E6.1')
const EX = inputs.find(b => b.addr === 'E9.0')
const FB = inputs.find(b => b.addr === 'E6.2')
const SZ = outputs.find(b => b.addr === 'A9.1')
const SO = outputs.find(b => b.addr === 'A9.2')
const KX = outputs.find(b => b.addr === 'A9.3')

const Door = new Motor(
  2, 'mot-door',
  [],
  [EZ, EO, AP, FB, EX],
  [SZ, SO, KX],
  ['close', 'open', 'closed', 'opened']
)

const APB = inputs.find(b => b.addr === 'E3.5')
const EZB = inputs.find(b => b.addr === 'E9.2')
const EOB = inputs.find(b => b.addr === 'E9.3')
const FBB = inputs.find(b => b.addr === 'E9.4')
const SZB = outputs.find(b => b.addr === 'A9.5')
const SOB = outputs.find(b => b.addr === 'A9.6')
const KXB = outputs.find(b => b.addr === 'A9.7')

const Barrier = new Motor(
  3, 'mot-barrier',
  [],
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB],
  ['close', 'open', 'closed', 'opened']
)

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [],
  main: [Barrier, Door, Flap],
  more: []
  // silomat: []
}

const drives = []

const motors = [Barrier, Door, Flap]

const silomat = []

module.exports = { device, drives, motors, positions, silomat, view }
