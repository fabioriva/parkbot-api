const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Action } = require('../../models/Action')
const { Device } = require('../../models/Device')

const device = new Device(1, 'E1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const A0 = new Action('action-entry', merkers.find(b => b.addr === 'M3.1'), def.REQ_1, 1, def.CARDS)

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
