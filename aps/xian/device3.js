const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Position } = require('../../models/Position')

const device = new Device(3, 'T')

const LV1 = new Position(1, 'LV1')
const LH1 = new Position(2, 'LV2')
const ENR = new Position(3, 'ENR')
const ENC = new Position(4, 'ENC')
const positions = [LV1, LH1, ENR, ENC]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [] // silomat
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
