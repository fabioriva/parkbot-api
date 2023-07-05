const { inputs, outputs } = require('./obj')
const { Device, DeviceView } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Door, Flap, Garage, Panel, Lock, Hoisting, Rotation, Silomat } = require('../../models/Motor')
const { Position } = require('../../models/Position')

const device = new Device(3, 'EVT3')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E303.3'),
  outputs.find(b => b.addr === 'A300.7'),
  outputs.find(b => b.addr === 'A300.6'),
  inputs.find(b => b.addr === 'E312.3')
]

const EN1 = inputs.find(b => b.addr === 'E302.3')
const EN2 = inputs.find(b => b.addr === 'E302.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

// const FTXV = inputs.find(b => b.addr === 'E311.6')
// const FTXH = inputs.find(b => b.addr === 'E311.7')
// const EM = inputs.find(b => b.addr === 'E311.0')
// const LC = [EM, FTXV, FTXH]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E302.4')
const ASBK = inputs.find(b => b.addr === 'E302.5')
const RTA = inputs.find(b => b.addr === 'E302.6')
const SQA = outputs.find(b => b.addr === 'A302.2')
const SBK1 = outputs.find(b => b.addr === 'A300.2')
const SBK2 = outputs.find(b => b.addr === 'A302.4')

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
const AKKM = inputs.find(b => b.addr === 'E301.5')
const ASBK2 = inputs.find(b => b.addr === 'E302.1')
const TD = outputs.find(b => b.addr === 'A302.6')

const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [AKKM, ASBK2],
  [TD],
  [],
  TD
)

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E310.3')
const EZM = inputs.find(b => b.addr === 'E310.4')
const AMM = inputs.find(b => b.addr === 'E310.5')
const SMA = outputs.find(b => b.addr === 'A311.0')
const SMB = outputs.find(b => b.addr === 'A311.1')

const M3 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E310.0')
const ECB = inputs.find(b => b.addr === 'E310.1')
const AMC = inputs.find(b => b.addr === 'E310.2')
const SCA = outputs.find(b => b.addr === 'A311.2')
const SCB = outputs.find(b => b.addr === 'A311.3')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E306.0')
const EOE = inputs.find(b => b.addr === 'E306.1')
const FBE = inputs.find(b => b.addr === 'E306.2')
const APE = inputs.find(b => b.addr === 'E301.6')
const SZE = outputs.find(b => b.addr === 'A300.4')
const SOE = outputs.find(b => b.addr === 'A300.5')

const M5 = new Door(0, [EZE, EOE, FBE, APE], [SZE, SOE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E301.0')
const EOA = inputs.find(b => b.addr === 'E301.1')
const FBA = inputs.find(b => b.addr === 'E301.2')
const APA = inputs.find(b => b.addr === 'E301.3')
const SZA = outputs.find(b => b.addr === 'A302.0')
const SOA = outputs.find(b => b.addr === 'A302.1')

const M6 = new Door(0, [EZA, EOA, FBA, APA], [SZA, SOA])

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E312.0')
const RMH = inputs.find(b => b.addr === 'E312.1')
const RES = inputs.find(b => b.addr === 'E312.2')
const REH = inputs.find(b => b.addr === 'E312.3')
const RCV = inputs.find(b => b.addr === 'E312.4')
const REAV = inputs.find(b => b.addr === 'E312.5')
const REAH = inputs.find(b => b.addr === 'E312.6')
const RCH = inputs.find(b => b.addr === 'E312.7')
const T2 = outputs.find(b => b.addr === 'A300.0')
const TRA = outputs.find(b => b.addr === 'A310.2')
const TRB = outputs.find(b => b.addr === 'A310.3')
const KCS = outputs.find(b => b.addr === 'A310.4')
const KCV = outputs.find(b => b.addr === 'A310.5')
const KCH = outputs.find(b => b.addr === 'A310.6')

const AF8 = inputs.find(b => b.addr === 'E303.7')
const MTC = inputs.find(b => b.addr === 'E311.5')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const L1 = outputs.find(b => b.addr === 'A301.0')
const L2 = outputs.find(b => b.addr === 'A301.1')
const L3 = outputs.find(b => b.addr === 'A301.2')
const L4 = outputs.find(b => b.addr === 'A301.3')
const L5 = outputs.find(b => b.addr === 'A301.4')

const FDL = inputs.find(b => b.addr === 'E306.4')
const FDR = inputs.find(b => b.addr === 'E306.5')
const FLA = inputs.find(b => b.addr === 'E307.2')
const FLP = inputs.find(b => b.addr === 'E307.0')
const FPE = inputs.find(b => b.addr === 'E306.3')
const FRE = inputs.find(b => b.addr === 'E310.6')
const FT1 = inputs.find(b => b.addr === 'E306.6')
const FT2 = inputs.find(b => b.addr === 'E306.7')

const bits = [
  new Garage([FPE, FRE, FLA, FLP, FDL, FDR, FT1, FT2]),
  new Panel([L1, L2, L3, L4, L5])
]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3] },
  { name: 'view-garage', bits, motors: [M4, M5, M6] }
]

const view = new DeviceView(
  device,
  [],
  lamps,
  views
)

module.exports = { device, drives, motors, positions, silomat, view }
