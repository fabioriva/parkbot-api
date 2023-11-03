const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const EN1 = inputs.find(b => b.addr === 'E103.0')
const IV1 = new Drive(1, 'IV1', EN1)

// ...

const drives = [IV1]

const motors = [] // [M1, M2, M3, M4, M5, M6]

const L1 = outputs.find(b => b.addr === 'A102.0')
const L2 = outputs.find(b => b.addr === 'A102.1')
const L3 = outputs.find(b => b.addr === 'A102.2')
const L4 = outputs.find(b => b.addr === 'A102.3')
const L5 = outputs.find(b => b.addr === 'A102.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const EPZ = inputs.find(b => b.addr === 'E104.6')
const EPZ2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')

// const main = new Main(drives, [M1, M2, M3, M4])
const main = new Main(drives, [])

const garage = new Garage(
  [],
  [], // [M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage]

const device = new Device(1, 'EU1', [], lamps, motors, views)

module.exports = { device, drives, positions }
