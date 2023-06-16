const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/Device')

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

const AMC = inputs.find(b => b.addr === 'E15.0')
const ECA = inputs.find(b => b.addr === 'E8.0')
const ECB = inputs.find(b => b.addr === 'E8.6')
const SCA = inputs.find(b => b.addr === 'E15.1')
const SCB = outputs.find(b => b.addr === 'A4.0')

const Flap = {
  name: 'mot-flap',
  encoders: [],
  io: [AMC, ECA, ECB, SCA, SCB],
  status: 'Going down'
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [],
  main: [Flap],
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
