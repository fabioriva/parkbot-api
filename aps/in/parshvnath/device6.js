const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Rotation,
  Silomat,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')

const EN1 = inputs.find(b => b.addr === 'E311.1')
const EN2 = inputs.find(b => b.addr === 'E311.2')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const ENR = new Position(9, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E313.3'),
  outputs.find(b => b.addr === 'A313.7'),
  outputs.find(b => b.addr === 'A313.6')
]

const AH = inputs.find(b => b.addr === 'E314.6')
const T101 = outputs.find(b => b.addr === 'A313.2')
const T102 = outputs.find(b => b.addr === 'A313.3')
const T10F = outputs.find(b => b.addr === 'A313.5')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH],
  [T101, T102, T10F],
  [],
  T10F
)

const AD = inputs.find(b => b.addr === 'E314.5')
const ASBK2 = inputs.find(b => b.addr === 'E314.0')
const EXD = inputs.find(b => b.addr === 'E311.4') // EXE
const EXH = inputs.find(b => b.addr === 'E311.5') // EXU
const TD = outputs.find(b => b.addr === 'A313.4') // KBA3

const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const RMV = inputs.find(b => b.addr === 'E312.0')
const RMH = inputs.find(b => b.addr === 'E312.1')
const RES = inputs.find(b => b.addr === 'E312.2')
const REH = inputs.find(b => b.addr === 'E312.3')
const RCV = inputs.find(b => b.addr === 'E312.4')
const REAV = inputs.find(b => b.addr === 'E312.5')
const REAH = inputs.find(b => b.addr === 'E312.6')
const RCH = inputs.find(b => b.addr === 'E312.7')
const T2 = outputs.find(b => b.addr === 'A312.1')
const TRA = outputs.find(b => b.addr === 'A312.2')
const TRB = outputs.find(b => b.addr === 'A312.3')
const KCS = outputs.find(b => b.addr === 'A312.4')
const KCV = outputs.find(b => b.addr === 'A312.5')
const KCH = outputs.find(b => b.addr === 'A312.6')

const EM = inputs.find(b => b.addr === 'E311.3')
// const AF8 = inputs.find(b => b.addr === 'E312.0')
const MTC = inputs.find(b => b.addr === 'E314.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [EM, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, ...silomat.motors]

const views = [
  { name: 'view-main', drives, motors: [M1, M2] },
  { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const device = new Device(6, 'SH3', [], lamps, views)

module.exports = { device, drives, motors, positions }
