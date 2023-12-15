const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap, Rotation } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.4'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const EN1 = inputs.find(b => b.addr === 'E103.0')
const IV1 = new Drive(1, 'IV1', EN1)

/**
 * Rotation
 */
const ASBK3 = inputs.find(b => b.addr === 'E103.5')
const EXD = inputs.find(b => b.addr === 'E105.1')
const TDF = outputs.find(b => b.addr === 'A102.6')

const M1 = new Rotation(
  0,
  IV1,
  [ENR],
  [ASBK3, EXD],
  [TDF],
  [],
  TDF
)
/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E104.4')
const ECB = inputs.find(b => b.addr === 'E104.5')
const AMC = inputs.find(b => b.addr === 'E103.2')
const SCA = outputs.find(b => b.addr === 'A101.4')
const SCB = outputs.find(b => b.addr === 'A101.5')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)
/**
 * Door (INT)
 */
const EZE = inputs.find(b => b.addr === 'E106.0')
const EOE = inputs.find(b => b.addr === 'E106.1')
const FBE = inputs.find(b => b.addr === 'E106.2')
const APE = inputs.find(b => b.addr === 'E103.3')
const SZE = outputs.find(b => b.addr === 'A103.1')
const SOE = outputs.find(b => b.addr === 'A103.2')

const M3 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])
/**
 * Barrier (EXT)
 */
const EBZE = inputs.find(b => b.addr === 'E102.2')
const EBOE = inputs.find(b => b.addr === 'E102.3')
const FBBE = inputs.find(b => b.addr === 'E102.4')
const APBE = inputs.find(b => b.addr === 'E103.4')
const SBZE = outputs.find(b => b.addr === 'A103.4')
const SBOE = outputs.find(b => b.addr === 'A103.4')
const SPBE = outputs.find(b => b.addr === 'A103.4')

const M4 = new Door(0, [EBZE, EBOE, FBBE, APBE], [SBZE, SBOE, SPBE])

const drives = [IV1]

const motors = [M1, M2, M3, M4]

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
// const EPZ2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')
const FTA3 = inputs.find(b => b.addr === 'E102.7')

const main = new Main(drives, [M1])

const garage = new Garage(
  [],
  [M2, M3, M4],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3]
)

const views = [main, garage]

const device = new Device(1, 'EU1', [], lamps, motors, views)

module.exports = { device, drives, positions }
