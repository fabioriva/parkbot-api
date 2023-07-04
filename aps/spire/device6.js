const { inputs, outputs } = require('./obj')
const { Device, DeviceView } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Lock, Hoisting, Traveling, Silomat } = require('../../models/Motor')
const { Position } = require('../../models/Position')

const device = new Device(6, 'IVT6')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E601.3'),
  outputs.find(b => b.addr === 'A600.7'),
  outputs.find(b => b.addr === 'A600.6'),
  inputs.find(b => b.addr === 'E612.3')
]

const EN1 = inputs.find(b => b.addr === 'E601.1')
const EN2 = inputs.find(b => b.addr === 'E613.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

// const FTXV = inputs.find(b => b.addr === 'E611.6')
// const FTXH = inputs.find(b => b.addr === 'E611.7')
// const EM = inputs.find(b => b.addr === 'E611.3')
// const LC = [EM, FTXV, FTXH]

const EMC = inputs.find(b => b.addr === 'E605.5')

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E601.4')
const ASBK = inputs.find(b => b.addr === 'E601.5')
const RTA = inputs.find(b => b.addr === 'E601.6')
const SBK1 = outputs.find(b => b.addr === 'A600.0')
const SBK2 = outputs.find(b => b.addr === 'A600.0')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  FSBK
)

/**
 * Lock V
 */
const EOM = inputs.find(b => b.addr === 'E605.3')
const EZM = inputs.find(b => b.addr === 'E605.4')
const AMM = inputs.find(b => b.addr === 'E605.2')
const SMA = outputs.find(b => b.addr === 'A604.0')
const SMB = outputs.find(b => b.addr === 'A604.1')

const M2 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E614.6')
const T101 = outputs.find(b => b.addr === 'A611.0')
const T102 = outputs.find(b => b.addr === 'A612.4')
const T10F = outputs.find(b => b.addr === 'A612.5')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, EMC],
  [T101, T102, T10F],
  T10F
)

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E612.0')
const RMH = inputs.find(b => b.addr === 'E612.1')
const RES = inputs.find(b => b.addr === 'E612.2')
const REH = inputs.find(b => b.addr === 'E612.3')
const RCV = inputs.find(b => b.addr === 'E612.4')
const REAV = inputs.find(b => b.addr === 'E612.5')
const REAH = inputs.find(b => b.addr === 'E612.6')
const RCH = inputs.find(b => b.addr === 'E612.7')
const T2 = outputs.find(b => b.addr === 'A611.1')
const TRA = outputs.find(b => b.addr === 'A611.2')
const TRB = outputs.find(b => b.addr === 'A611.3')
const KCS = outputs.find(b => b.addr === 'A611.4')
const KCV = outputs.find(b => b.addr === 'A611.5')
const KCH = outputs.find(b => b.addr === 'A611.6')

const AF8 = inputs.find(b => b.addr === 'E614.0')
const MTC = inputs.find(b => b.addr === 'E614.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]

const view = new DeviceView(
  device,
  [],
  drives,
  lamps,
  [M1, M2, M3],
  silomat
)

module.exports = { device, drives, motors, positions, silomat, view }
