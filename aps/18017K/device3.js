const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Position } = require('../../models/Position')

const device = new Device(3, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(3, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E17.0'),
  inputs.find(b => b.addr === 'E17.1'),
  inputs.find(b => b.addr === 'E17.2'),
  inputs.find(b => b.addr === 'E17.3'),
  inputs.find(b => b.addr === 'E17.4'),
  inputs.find(b => b.addr === 'E17.5'),
  inputs.find(b => b.addr === 'E17.6'),
  inputs.find(b => b.addr === 'E17.7'),
  outputs.find(b => b.addr === 'A12.2'),
  outputs.find(b => b.addr === 'A12.3'),
  outputs.find(b => b.addr === 'A12.4'),
  outputs.find(b => b.addr === 'A12.5'),
  outputs.find(b => b.addr === 'A12.6'),
  outputs.find(b => b.addr === 'A12.7')
]
const steps = [
  { key: 'step-1', color: 'gray', tooltip: 'step-1' },
  { key: 'step-2', color: 'gray', tooltip: 'step-2' },
  { key: 'step-3', color: 'gray', tooltip: 'step-3' },
  { key: 'step-4', color: 'gray', tooltip: 'step-4' },
  { key: 'step-5', color: 'gray', tooltip: 'step-5' },
  { key: 'step-6', color: 'gray', tooltip: 'step-6' },
  { key: 'step-7', color: 'gray', tooltip: 'step-7' },
  { key: 'step-8', color: 'gray', tooltip: 'step-8' },
  { key: 'step-9', color: 'gray', tooltip: 'step-9' }
]

device.steps = steps
// device.alarms = alarms[0]._active

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
