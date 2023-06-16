const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/Device')

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

const Flap1 = {
  name: 'mot-flap',
  encoders: [],
  io: [AMC1, ECA1, ECB1, SCA1, SCB1],
  status: 'Going down'
}

const AMC2 = inputs.find(b => b.addr === 'E3.1')
const ECA2 = inputs.find(b => b.addr === 'E9.5')
const ECB2 = inputs.find(b => b.addr === 'E9.6')
const SCA2 = outputs.find(b => b.addr === 'A7.4')
const SCB2 = outputs.find(b => b.addr === 'A7.5')

const Flap2 = {
  name: 'mot-flap',
  encoders: [],
  io: [AMC2, ECA2, ECB2, SCA2, SCB2],
  status: 'Low'
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [],
  main: [Flap1, Flap2],
  more: []
  // silomat: []
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
