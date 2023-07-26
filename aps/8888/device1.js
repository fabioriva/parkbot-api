const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../models/Motor')
const { Position } = require('../../models/Position')
const { Main, Garage } = require('../../models/View')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const EN1 = inputs.find(b => b.addr === 'E104.3')
const IV1 = new Drive(1, 'IV1', EN1)

// const FTXV = inputs.find(b => b.addr === 'E103.0')
// const FTXH = inputs.find(b => b.addr === 'E103.1')
// const FTC = inputs.find(b => b.addr === 'E102.1')
// const LC = [FTXV, FTXH, FTC]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E104.4')
const ASBK = inputs.find(b => b.addr === 'E104.5')
const RTA = inputs.find(b => b.addr === 'E104.6')
const SQA = outputs.find(b => b.addr === 'A102.2')
const SBK1 = outputs.find(b => b.addr === 'A100.2')
const SBK2 = outputs.find(b => b.addr === 'A103.5')

const M1 = new Hoisting(
  0,
  IV1,
  [LV],
  [RTA, ASBK, FSBK],
  [SQA, SBK1, SBK2],
  [],
  FSBK
)

/**
 * Rotation
 */
const AD = inputs.find(b => b.addr === 'E105.1')
const ASBK2 = inputs.find(b => b.addr === 'E104.1')
const TD = outputs.find(b => b.addr === 'A102.6')

const M2 = new Rotation(
  0,
  IV1,
  [ENR],
  [AD, ASBK2],
  [TD],
  [],
  TD
)

/**
 * Lock V
 */
const EOM = inputs.find(b => b.addr === 'E105.3')
const EZM = inputs.find(b => b.addr === 'E105.4')
const AMM = inputs.find(b => b.addr === 'E105.5')
const SMA = outputs.find(b => b.addr === 'A102.0')
const SMB = outputs.find(b => b.addr === 'A102.1')

const M3 = new Lock(
  1,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Lock R
 */
const EOMD = inputs.find(b => b.addr === 'E108.0')
const EZMD = inputs.find(b => b.addr === 'E108.1')
const AMMD = inputs.find(b => b.addr === 'E108.2')
const SMAD = outputs.find(b => b.addr === 'A105.0')
const SMBD = outputs.find(b => b.addr === 'A105.1')

const M4 = new Lock(
  2,
  [EZMD, EOMD, AMMD],
  [SMAD, SMBD]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E102.4')
const ECB = inputs.find(b => b.addr === 'E102.5')
const AMC = inputs.find(b => b.addr === 'E102.6')
const SCA = outputs.find(b => b.addr === 'A102.4')
const SCB = outputs.find(b => b.addr === 'A102.5')

const M5 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E106.0')
const EOE = inputs.find(b => b.addr === 'E106.1')
const FBE = inputs.find(b => b.addr === 'E106.2')
const APE = inputs.find(b => b.addr === 'E102.7')
const SZE = outputs.find(b => b.addr === 'A100.4')
const SOE = outputs.find(b => b.addr === 'A100.5')

const M6 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])

const drives = [IV1]

const motors = [M1, M2, M3, M4, M5, M6]

const L1 = outputs.find(b => b.addr === 'A101.0')
const L2 = outputs.find(b => b.addr === 'A101.1')
const L3 = outputs.find(b => b.addr === 'A101.2')
const L4 = outputs.find(b => b.addr === 'A101.3')
const L5 = outputs.find(b => b.addr === 'A101.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const EPZ = inputs.find(b => b.addr === 'E107.5')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')

const main = new Main(drives, [M1, M2, M3, M4])

const garage = new Garage(
  [],
  [M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage]

const device = new Device(1, 'EL1', [], lamps, motors, views)

module.exports = { device, drives, positions }
