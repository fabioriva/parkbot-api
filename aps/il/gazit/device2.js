const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
// const { Drive } = require('../../../models/Drive')
const { Door, Flap } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Garage } = require('../../../models/View')

// const EN1 = inputs.find(b => b.addr === 'E7.6')

// const IV2 = new Drive(1, 'IV2', EN1)
// const drives = [IV2]
const drives = []

const ENR = new Position(6, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A14.7'),
  outputs.find(b => b.addr === 'A14.6')
  // inputs.find(b => b.addr === 'E6.3') // ???
]

const ECA = inputs.find(b => b.addr === 'E15.4')
const ECB = inputs.find(b => b.addr === 'E15.5')
const AMC = inputs.find(b => b.addr === 'E15.6')
const SCA = outputs.find(b => b.addr === 'A15.5')
const SCB = outputs.find(b => b.addr === 'A15.6')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

// const FX = inputs.find(b => b.addr === 'E108.0')
const EZ = inputs.find(b => b.addr === 'E10.0')
const EO = inputs.find(b => b.addr === 'E10.1')
const FB = inputs.find(b => b.addr === 'E10.2')
const AP = inputs.find(b => b.addr === 'E6.7')
// const KX = outputs.find(b => b.addr === 'A4.7')
const SP = outputs.find(b => b.addr === 'A13.0')
const SZ = outputs.find(b => b.addr === 'A4.4')
const SO = outputs.find(b => b.addr === 'A4.5')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, SP]
)

// const FX = inputs.find(b => b.addr === 'E108.0')
const EZA = inputs.find(b => b.addr === 'E7.0')
const EOA = inputs.find(b => b.addr === 'E7.1')
// const FBA = inputs.find(b => b.addr === 'E7.2')
const APA = inputs.find(b => b.addr === 'E7.2')
// const KX = outputs.find(b => b.addr === 'A4.7')
const SPA = outputs.find(b => b.addr === 'A12.7')
const SZA = outputs.find(b => b.addr === 'A12.5')
const SOA = outputs.find(b => b.addr === 'A12.6')

const M6 = new Door(
  0,
  [EZA, EOA, APA],
  [SZA, SOA, SPA]
)

// const motors = [M1, M2, M3, M4, M5]
const motors = [M2, M5, M6]

const L1 = outputs.find(b => b.addr === 'A5.0')
const L2 = outputs.find(b => b.addr === 'A5.1')
const L3 = outputs.find(b => b.addr === 'A5.2')
const L4 = outputs.find(b => b.addr === 'A5.3')
const L5 = outputs.find(b => b.addr === 'A5.4')

const FDL = inputs.find(b => b.addr === 'E10.4')
const FDR = inputs.find(b => b.addr === 'E10.5')
const FLA = inputs.find(b => b.addr === 'E11.1')
const FLP = inputs.find(b => b.addr === 'E11.0')
const FPE = inputs.find(b => b.addr === 'E10.3')
const EPZ = inputs.find(b => b.addr === 'E15.2')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E10.6')
const FTA2 = inputs.find(b => b.addr === 'E10.7')
// const FDL1 = inputs.find(b => b.addr === 'E108.1')
// const FDR1 = inputs.find(b => b.addr === 'E108.2')
// const FTA3 = inputs.find(b => b.addr === 'E11.6')
// const FLA2 = inputs.find(b => b.addr === 'E11.4')
// const FLP2 = inputs.find(b => b.addr === 'E11.3')

// const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [], // IV2],
  motors,
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2] // , FTA3, FLA2, FLP2]
)

const views = [garage]

const device = new Device(2, 'EU', [], lamps, motors, views)

module.exports = { device, drives, positions }
