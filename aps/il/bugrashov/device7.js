const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E1201.3')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1201.4'),
  outputs.find(b => b.addr === 'A1201.7'),
  outputs.find(b => b.addr === 'A1201.6')
]

const AH = inputs.find(b => b.addr === 'E1204.4')
const EXPH = inputs.find(b => b.addr === 'E1202.2')
const T101 = outputs.find(b => b.addr === 'A1201.0')
const T102 = outputs.find(b => b.addr === 'A1201.1')
const T10F = outputs.find(b => b.addr === 'A1202.7')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, EXPH],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1205.0')
const RMH = inputs.find(b => b.addr === 'E1205.1')
const RES = inputs.find(b => b.addr === 'E1205.2')
const REH = inputs.find(b => b.addr === 'E1205.3')
const RCV = inputs.find(b => b.addr === 'E1205.4')
const REAV = inputs.find(b => b.addr === 'E1205.5')
const REAH = inputs.find(b => b.addr === 'E1205.6')
const RCH = inputs.find(b => b.addr === 'E1205.7')
const T2 = outputs.find(b => b.addr === 'A1202.0')
const TRA = outputs.find(b => b.addr === 'A1202.1')
const TRB = outputs.find(b => b.addr === 'A1202.2')
const KCS = outputs.find(b => b.addr === 'A1202.3')
const KCV = outputs.find(b => b.addr === 'A1202.4')
const KCH = outputs.find(b => b.addr === 'A1202.5')

const AF8 = inputs.find(b => b.addr === 'E1203.2')
const MTC = inputs.find(b => b.addr === 'E1204.7')

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

const device = new Device(7, 'SH3', [], lamps, motors, views)

module.exports = { device, drives, positions }
