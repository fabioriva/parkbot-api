const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, DoorVFD, Flap, Rotation } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Garage } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E7.6')

const IV2 = new Drive(1, 'IV2', EN1)
const drives = [IV2]

const ENR = new Position(6, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A6.7'),
  outputs.find(b => b.addr === 'A6.6')
  // inputs.find(b => b.addr === 'E6.3') // ???
]

const AD = inputs.find(b => b.addr === 'E6.4')
const ASBKD = inputs.find(b => b.addr === 'E6.5')
const EXD = inputs.find(b => b.addr === 'E6.3')
const TD = outputs.find(b => b.addr === 'A4.6')

const M1 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBKD, EXD],
  [TD],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E6.0')
const ECB = inputs.find(b => b.addr === 'E6.1')
const AMC = inputs.find(b => b.addr === 'E6.2')
const SCA = outputs.find(b => b.addr === 'A6.2')
const SCB = outputs.find(b => b.addr === 'A6.3')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

// const FX = inputs.find(b => b.addr === 'E8.1')
// const EX = inputs.find(b => b.addr === 'E8.4')
const EZL = inputs.find(b => b.addr === 'E8.1')
const EOL = inputs.find(b => b.addr === 'E8.2')
const FBL = inputs.find(b => b.addr === 'E10.3')
const APL = inputs.find(b => b.addr === 'E8.0')
const KXL = outputs.find(b => b.addr === 'A4.7')

const M3 = new DoorVFD(
  1,
  IV2,
  [],
  [EZL, EOL, APL, FBL], //, EX, FX],
  [KXL],
  [EZL, EOL],
  KXL
)

// const FX = inputs.find(b => b.addr === 'E8.1')
// const EX = inputs.find(b => b.addr === 'E8.4')
const EZR = inputs.find(b => b.addr === 'E10.1')
const EOR = inputs.find(b => b.addr === 'E10.2')
const FBR = inputs.find(b => b.addr === 'E10.3')
const APR = inputs.find(b => b.addr === 'E10.0')
const KXR = outputs.find(b => b.addr === 'A4.7')

const M4 = new DoorVFD(
  2,
  IV2,
  [],
  [EZR, EOR, APR, FBR], //, EX, FX],
  [KXR],
  [EZR, EOR],
  KXR
)

// const FX = inputs.find(b => b.addr === 'E108.0')
const EZ = inputs.find(b => b.addr === 'E5.0')
const EO = inputs.find(b => b.addr === 'E5.1')
const FB = inputs.find(b => b.addr === 'E5.2')
const AP = inputs.find(b => b.addr === 'E8.3')
// const KX = outputs.find(b => b.addr === 'A4.7')
const SP = outputs.find(b => b.addr === 'A6.1')
const SZ = outputs.find(b => b.addr === 'A4.4')
// const SO = outputs.find(b => b.addr === 'A4.5')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SP]
)

const motors = [M1, M2, M3, M4, M5]

const L1 = outputs.find(b => b.addr === 'A5.0')
const L2 = outputs.find(b => b.addr === 'A5.1')
const L3 = outputs.find(b => b.addr === 'A5.2')
const L4 = outputs.find(b => b.addr === 'A5.3')
const L5 = outputs.find(b => b.addr === 'A5.4')

const FDL = inputs.find(b => b.addr === 'E10.5')
const FDR = inputs.find(b => b.addr === 'E10.6')
const FLA = inputs.find(b => b.addr === 'E11.2')
const FLP = inputs.find(b => b.addr === 'E11.1')
const FPE = inputs.find(b => b.addr === 'E10.4')
const EPZ = inputs.find(b => b.addr === 'E9.0')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E10.7')
const FTA2 = inputs.find(b => b.addr === 'E11.0')
// const FDL1 = inputs.find(b => b.addr === 'E108.1')
// const FDR1 = inputs.find(b => b.addr === 'E108.2')
const FTA3 = inputs.find(b => b.addr === 'E11.6')
const FLA2 = inputs.find(b => b.addr === 'E11.4')
const FLP2 = inputs.find(b => b.addr === 'E11.3')

// const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [IV2],
  motors,
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FLA2, FLP2]
)

const views = [garage]

const device = new Device(2, 'EU', [], lamps, motors, views)

module.exports = { device, drives, positions }
