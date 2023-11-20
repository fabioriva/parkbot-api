const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Hoisting, Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E400.2'),
  outputs.find(b => b.addr === 'A403.7'),
  outputs.find(b => b.addr === 'A403.6'),
  inputs.find(b => b.addr === 'E405.3')
]

const EN1 = inputs.find(b => b.addr === 'E400.0')
const EN2 = inputs.find(b => b.addr === 'E400.1')

const IV1 = new Drive(4, 'IV1', EN1)
const IV2 = new Drive(5, 'IV2', EN2)

const AKKP = inputs.find(b => b.addr === 'E401.6')
/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E401.1')
const ASBK = inputs.find(b => b.addr === 'E401.2')
const SBK1 = outputs.find(b => b.addr === 'A401.4')
const SBK2 = outputs.find(b => b.addr === 'A400.6')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [ASBK, AKKP, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E401.4')
const T101 = outputs.find(b => b.addr === 'A401.0')
const T102 = outputs.find(b => b.addr === 'A401.1')
const T10F = outputs.find(b => b.addr === 'A400.7')

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
const RMV = inputs.find(b => b.addr === 'E405.0')
const RMH = inputs.find(b => b.addr === 'E405.1')
const RES = inputs.find(b => b.addr === 'E405.2')
const REH = inputs.find(b => b.addr === 'E405.3')
const RCV = inputs.find(b => b.addr === 'E405.4')
const REAV = inputs.find(b => b.addr === 'E405.5')
const REAH = inputs.find(b => b.addr === 'E405.6')
const RCH = inputs.find(b => b.addr === 'E405.7')
const T2 = outputs.find(b => b.addr === 'A401.2')
const TRA = outputs.find(b => b.addr === 'A404.1')
const TRB = outputs.find(b => b.addr === 'A404.2')
const KCS = outputs.find(b => b.addr === 'A404.3')
const KCV = outputs.find(b => b.addr === 'A404.4')
const KCH = outputs.find(b => b.addr === 'A404.5')

const AF8 = inputs.find(b => b.addr === 'E401.5')
const AGF = inputs.find(b => b.addr === 'E401.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, AGF]
)

const drives = [IV1, IV2]

const motors = [M1, M2, ...silomat.motors]

const main = new Main(drives, [M1, M2])

const views = [main, silomat]

const device = new Device(5, 'T2', [], lamps, motors, views)

module.exports = { device, drives, positions }
