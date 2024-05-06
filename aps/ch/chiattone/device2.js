const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Rotation, Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E13.0')

const IV1 = new Drive(2, 'IV1', EN1)

const LH1 = new Position(3, 'LH1')
const ENR = new Position(4, 'ENR')
const positions = [LH1, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E23.3'),
  outputs.find(b => b.addr === 'A21.7'),
  outputs.find(b => b.addr === 'A21.6')
]

const AD = inputs.find(b => b.addr === 'E21.4')
const EXD = inputs.find(b => b.addr === 'E23.7')
const TD = outputs.find(b => b.addr === 'A21.5')
const ASBK2 = inputs.find(b => b.addr === 'E21.3')

const M1 = new Rotation(
  0,
  IV1,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const AH = inputs.find(b => b.addr === 'E21.3')
const EHP = inputs.find(b => b.addr === 'E23.6')
const T10 = outputs.find(b => b.addr === 'A21.0')

const M2 = new Traveling(
  0,
  IV1,
  [LH1],
  [AH, ASBK2, EHP],
  [T10],
  [],
  T10
)

const RMV = inputs.find(b => b.addr === 'E22.0')
const RMH = inputs.find(b => b.addr === 'E22.1')
const RES = inputs.find(b => b.addr === 'E22.2')
const REH = inputs.find(b => b.addr === 'E22.3')
const RCV = inputs.find(b => b.addr === 'E22.4')
const REAV = inputs.find(b => b.addr === 'E22.5')
const REAH = inputs.find(b => b.addr === 'E22.6')
const RCH = inputs.find(b => b.addr === 'E22.7')
const T2 = outputs.find(b => b.addr === 'A21.1')
const TRA = outputs.find(b => b.addr === 'A21.2')
const TRB = outputs.find(b => b.addr === 'A21.3')
const KCS = outputs.find(b => b.addr === 'A20.2')
const KCV = outputs.find(b => b.addr === 'A20.3')
const KCH = outputs.find(b => b.addr === 'A20.4')

const AF8 = inputs.find(b => b.addr === 'E21.6')
const MTC = inputs.find(b => b.addr === 'E21.5')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, M2, ...silomat.motors]

const main = new Main(drives, [M1, M2])

const views = [main, silomat]

const device = new Device(2, 'SH2', [], lamps, motors, views)

module.exports = { device, drives, positions }
