const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E1601.3')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1601.4'),
  outputs.find(b => b.addr === 'A1601.7'),
  outputs.find(b => b.addr === 'A1601.6')
]

const AH = inputs.find(b => b.addr === 'E1604.4')
const EXPH = inputs.find(b => b.addr === 'E1602.2')
const T101 = outputs.find(b => b.addr === 'A1601.0')
const T102 = outputs.find(b => b.addr === 'A1601.1')
const T10F = outputs.find(b => b.addr === 'A1602.7')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, EXPH],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1605.0')
const RMH = inputs.find(b => b.addr === 'E1605.1')
const RES = inputs.find(b => b.addr === 'E1605.2')
const REH = inputs.find(b => b.addr === 'E1605.3')
const RCV = inputs.find(b => b.addr === 'E1605.4')
const REAV = inputs.find(b => b.addr === 'E1605.5')
const REAH = inputs.find(b => b.addr === 'E1605.6')
const RCH = inputs.find(b => b.addr === 'E1605.7')
const T2 = outputs.find(b => b.addr === 'A1602.0')
const TRA = outputs.find(b => b.addr === 'A1602.1')
const TRB = outputs.find(b => b.addr === 'A1602.2')
const KCS = outputs.find(b => b.addr === 'A1602.3')
const KCV = outputs.find(b => b.addr === 'A1602.4')
const KCH = outputs.find(b => b.addr === 'A1602.5')

const AF8 = inputs.find(b => b.addr === 'E1603.2')
const MTC = inputs.find(b => b.addr === 'E1604.7')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, ...silomat.motors]

const main = new Main(drives, [M1])

const views = [main, silomat]

const device = new Device(11, 'SH7', [], lamps, motors, views)

module.exports = { device, drives, positions }
