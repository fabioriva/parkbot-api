const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Door } = require('../../../models/Motor')
const { Garage } = require('../../../models/View')

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const FX = inputs.find(b => b.addr === 'E9.7')
const EZ = inputs.find(b => b.addr === 'E6.0')
const EO = inputs.find(b => b.addr === 'E6.1')
const FB = inputs.find(b => b.addr === 'E6.2')
const AP = inputs.find(b => b.addr === 'E3.7')
const KX = outputs.find(b => b.addr === 'A7.7')
const SP = outputs.find(b => b.addr === 'A7.4')
const SZ = outputs.find(b => b.addr === 'A7.5')
const SO = outputs.find(b => b.addr === 'A7.6')

const M1 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const motors = [M1]

const L1 = outputs.find(b => b.addr === 'A4.0')
const L2 = outputs.find(b => b.addr === 'A4.1')
const L3 = outputs.find(b => b.addr === 'A4.2')
const L4 = outputs.find(b => b.addr === 'A4.3')
const L5 = outputs.find(b => b.addr === 'A4.4')

const FDL = inputs.find(b => b.addr === 'E6.4')
const FDR = inputs.find(b => b.addr === 'E6.5')
const FLA = inputs.find(b => b.addr === 'E7.2')
const FLP = inputs.find(b => b.addr === 'E7.0')
const FPE = inputs.find(b => b.addr === 'E6.3')
const EPZ = inputs.find(b => b.addr === 'E12.6')
const FRE1 = inputs.find(b => b.addr === 'E12.6')
const FRE2 = inputs.find(b => b.addr === 'E12.7')
const FTA1 = inputs.find(b => b.addr === 'E6.6')
const FTA2 = inputs.find(b => b.addr === 'E6.7')
const FDL1 = inputs.find(b => b.addr === 'E6.6')
const FDR1 = inputs.find(b => b.addr === 'E6.7')

const garage = new Garage(
  [],
  [M1],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FDL1, FDR1, FRE1, FRE2]
)

const views = [garage]

const device = new Device(3, 'EU2', [], lamps, motors, views)

const drives = []

const positions = []

module.exports = { device, drives, positions }
