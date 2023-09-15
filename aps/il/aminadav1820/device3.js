const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Door } = require('../../../models/Motor')
const { Garage } = require('../../../models/View')

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const FX = inputs.find(b => b.addr === 'E107.0')
const EZ = inputs.find(b => b.addr === 'E104.0')
const EO = inputs.find(b => b.addr === 'E104.1')
const FB = inputs.find(b => b.addr === 'E104.2')
const AP = inputs.find(b => b.addr === 'E103.6')
const KX = outputs.find(b => b.addr === 'A105.3')
const SP = outputs.find(b => b.addr === 'A105.0')
const SZ = outputs.find(b => b.addr === 'A105.1')
const SO = outputs.find(b => b.addr === 'A105.2')

const M1 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const motors = [M1]

const L1 = outputs.find(b => b.addr === 'A102.0')
const L2 = outputs.find(b => b.addr === 'A102.1')
const L3 = outputs.find(b => b.addr === 'A102.2')
const L4 = outputs.find(b => b.addr === 'A102.3')
const L5 = outputs.find(b => b.addr === 'A102.4')

const FDL = inputs.find(b => b.addr === 'E104.4')
const FDR = inputs.find(b => b.addr === 'E104.5')
const FLA = inputs.find(b => b.addr === 'E105.2')
const FLP = inputs.find(b => b.addr === 'E105.0')
const FPE = inputs.find(b => b.addr === 'E104.3')
const EPZ = inputs.find(b => b.addr === 'E112.6')
const FRE1 = inputs.find(b => b.addr === 'E112.6')
const FRE2 = inputs.find(b => b.addr === 'E112.7')
const FTA1 = inputs.find(b => b.addr === 'E113.3')
const FTA2 = inputs.find(b => b.addr === 'E113.4')
const FLP2 = inputs.find(b => b.addr === 'E105.1')
const FDL2 = inputs.find(b => b.addr === 'E104.6')
const FDR2 = inputs.find(b => b.addr === 'E104.7')

const garage = new Garage(
  [],
  [M1],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FLP2, FDL2, FDR2, FRE1, FRE2]
)

const views = [garage]

const device = new Device(3, 'EU2', [], lamps, motors, views)

const drives = []

const positions = []

module.exports = { device, drives, positions }
