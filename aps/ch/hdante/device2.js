const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E103.0')

const IV3 = new Drive(1, 'IV1', EN1)
const drives = [IV3]

const ENR = new Position(6, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A6.7'),
  outputs.find(b => b.addr === 'A6.6')
  // inputs.find(b => b.addr === 'E6.3') // ???
]

// const motors = [M1, M2, M3, M4, M5]
const motors = []

const L1 = outputs.find(b => b.addr === 'A104.0')
const L2 = outputs.find(b => b.addr === 'A104.1')
const L3 = outputs.find(b => b.addr === 'A104.2')
const L4 = outputs.find(b => b.addr === 'A104.3')
const L5 = outputs.find(b => b.addr === 'A104.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const EPZ = inputs.find(b => b.addr === 'E104.6')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')
const FDL1 = inputs.find(b => b.addr === 'E108.1')
const FDR1 = inputs.find(b => b.addr === 'E108.2')
const FTA3 = inputs.find(b => b.addr === 'E108.3')

// const main = new Main(drives, [M1, M2, M3])
const main = new Main(drives, [])

const garage = new Garage(
  [],
  [], // [M4, M5],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FDL1, FDR1]
)

const views = [main, garage]

const device = new Device(2, 'EU', [], lamps, motors, views)

module.exports = { device, drives, positions }
