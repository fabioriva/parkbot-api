const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Door,
  Flap,
  Lock,
  Hoisting
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')

const EN1 = inputs.find(b => b.addr === 'E201.1')
const IV1 = new Drive(2, 'IV1', EN1)

const LV1 = new Position(3, 'LV1')
const LV2 = new Position(4, 'LV2')

const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A201.7'),
  outputs.find(b => b.addr === 'A201.6')
]

const RTA = inputs.find(b => b.addr === 'E202.0')
const ASBK = inputs.find(b => b.addr === 'E201.5')
const FSBK = inputs.find(b => b.addr === 'E201.6')
const SBK1 = outputs.find(b => b.addr === 'A201.0')
const SBK2 = outputs.find(b => b.addr === 'A201.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E220.0')
const EOM = inputs.find(b => b.addr === 'E220.1')
const EZM = inputs.find(b => b.addr === 'E220.2')
const SMA = outputs.find(b => b.addr === 'A220.1')
const SMB = outputs.find(b => b.addr === 'A220.2')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ECA = inputs.find(b => b.addr === 'E220.4')
const ECB = inputs.find(b => b.addr === 'E220.5')
const AMC = inputs.find(b => b.addr === 'E220.3')
const SCA = outputs.find(b => b.addr === 'A220.3')
const SCB = outputs.find(b => b.addr === 'A220.4')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E220.6')
const EZ = inputs.find(b => b.addr === 'E222.0')
const EO = inputs.find(b => b.addr === 'E222.1')
const FB = inputs.find(b => b.addr === 'E222.2')
const SZ = outputs.find(b => b.addr === 'A220.6')
const SO = outputs.find(b => b.addr === 'A220.7')
const KX = outputs.find(b => b.addr === 'A220.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M4, M5]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M4, M5] }
]

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
