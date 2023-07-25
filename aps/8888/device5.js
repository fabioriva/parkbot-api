const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Hoisting, Traveling, Silomat } = require('../../models/Motor')
const { Position } = require('../../models/Position')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E501.3'),
  outputs.find(b => b.addr === 'A512.7'),
  outputs.find(b => b.addr === 'A512.6'),
  inputs.find(b => b.addr === 'E512.3')
]

const EN1 = inputs.find(b => b.addr === 'E501.0')
const EN2 = inputs.find(b => b.addr === 'E501.1')

const IV1 = new Drive(4, 'IV1', EN1)
const IV2 = new Drive(5, 'IV2', EN2)

// const FTXV = inputs.find(b => b.addr === 'E511.6')
// const FTXH = inputs.find(b => b.addr === 'E511.7')
// const EM = inputs.find(b => b.addr === 'E511.0')
// const LC = [FTXV, FTXH, EM]

const AKKP = inputs.find(b => b.addr === 'E501.7')
/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E511.2')
const ASBK = inputs.find(b => b.addr === 'E511.3')
const RTA = inputs.find(b => b.addr === 'E501.6')
const SBK1 = outputs.find(b => b.addr === 'A511.0')
const SBK2 = outputs.find(b => b.addr === 'A512.0')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, AKKP, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E501.5')
const T101 = outputs.find(b => b.addr === 'A501.0')
const T102 = outputs.find(b => b.addr === 'A501.3')
const T10F = outputs.find(b => b.addr === 'A501.2')

const M2 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, AKKP],
  [T101, T102, T10F],
  [],
  T10F
)

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E512.0')
const RMH = inputs.find(b => b.addr === 'E512.1')
const RES = inputs.find(b => b.addr === 'E512.2')
const REH = inputs.find(b => b.addr === 'E512.3')
const RCV = inputs.find(b => b.addr === 'E512.4')
const REAV = inputs.find(b => b.addr === 'E512.5')
const REAH = inputs.find(b => b.addr === 'E512.6')
const RCH = inputs.find(b => b.addr === 'E512.7')
const T2 = outputs.find(b => b.addr === 'A501.1')
const TRA = outputs.find(b => b.addr === 'A511.2')
const TRB = outputs.find(b => b.addr === 'A511.3')
const KCS = outputs.find(b => b.addr === 'A511.4')
const KCV = outputs.find(b => b.addr === 'A511.5')
const KCH = outputs.find(b => b.addr === 'A511.6')

const AF8 = inputs.find(b => b.addr === 'E500.7')
const AGF = inputs.find(b => b.addr === 'E501.6')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, AGF]
)

const drives = [IV1, IV2]

const motors = [M1, M2, ...silomat.motors]

const views = [
  { name: 'view-main', drives, motors: [M1, M2] },
  silomat.view
]

const device = new Device(5, 'T2', [], lamps, views)

module.exports = { device, drives, motors, positions }
