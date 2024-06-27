const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap, Rotation } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E501.4'),
  outputs.find(b => b.addr === 'A501.7'),
  outputs.find(b => b.addr === 'A501.6')
]

const EN1 = inputs.find(b => b.addr === 'E503.0')
const IV1 = new Drive(1, 'IV1', EN1)

/**
 * Rotation
 */
const ASBK3 = inputs.find(b => b.addr === 'E503.5')
const EXD = inputs.find(b => b.addr === 'E505.1')
const TDF = outputs.find(b => b.addr === 'A501.1')

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
const ECA = inputs.find(b => b.addr === 'E504.4')
const ECB = inputs.find(b => b.addr === 'E504.5')
const AMC = inputs.find(b => b.addr === 'E503.2')
const SCA = outputs.find(b => b.addr === 'A501.4')
const SCB = outputs.find(b => b.addr === 'A501.5')

const M2 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)
/**
 * Door (INT)
 */
const EZE = inputs.find(b => b.addr === 'E506.0')
const EOE = inputs.find(b => b.addr === 'E506.1')
const FBE = inputs.find(b => b.addr === 'E506.2')
const APE = inputs.find(b => b.addr === 'E503.3')
const SZE = outputs.find(b => b.addr === 'A503.1')
const SOE = outputs.find(b => b.addr === 'A503.2')

const M3 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])
/**
 * Barrier (EXT)
 */
const EBZE = inputs.find(b => b.addr === 'E502.2')
const EBOE = inputs.find(b => b.addr === 'E502.3')
const FBBE = inputs.find(b => b.addr === 'E502.4')
const APBE = inputs.find(b => b.addr === 'E503.4')
const SBZE = outputs.find(b => b.addr === 'A503.4')
const SBOE = outputs.find(b => b.addr === 'A503.4')
const SPBE = outputs.find(b => b.addr === 'A503.4')

const M4 = new Door(0, [EBZE, EBOE, FBBE, APBE], [SBZE, SBOE, SPBE])

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const L1 = outputs.find(b => b.addr === 'A502.0')
const L2 = outputs.find(b => b.addr === 'A502.1')
const L3 = outputs.find(b => b.addr === 'A502.2')
const L4 = outputs.find(b => b.addr === 'A502.3')
const L5 = outputs.find(b => b.addr === 'A502.4')

const FDL = inputs.find(b => b.addr === 'E506.4')
const FDR = inputs.find(b => b.addr === 'E506.5')
const FLA = inputs.find(b => b.addr === 'E507.2')
const FLP = inputs.find(b => b.addr === 'E507.0')
const FPE = inputs.find(b => b.addr === 'E506.3')
const EPZ = inputs.find(b => b.addr === 'E504.6')
// const EPZ2 = inputs.find(b => b.addr === 'E504.7')
const FTA1 = inputs.find(b => b.addr === 'E506.6')
const FTA2 = inputs.find(b => b.addr === 'E506.7')
const FTA3 = inputs.find(b => b.addr === 'E502.7')

const main = new Main(drives, [M1])

const garage = new Garage(
  [],
  [M2, M3, M4],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3]
)

const views = [main, garage]

const device = new Device(3, 'EU6', [], lamps, motors, views)

module.exports = { device, drives, positions }
