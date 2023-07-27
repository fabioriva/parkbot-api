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
const { Main } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E101.1')
const IV1 = new Drive(1, 'IV1', EN1)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')

const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const RTA = inputs.find(b => b.addr === 'E102.0')
const ASBK = inputs.find(b => b.addr === 'E101.5')
const FSBK = inputs.find(b => b.addr === 'E101.6')
const SBK1 = outputs.find(b => b.addr === 'A101.0')
const SBK2 = outputs.find(b => b.addr === 'A101.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E120.0')
const EOM = inputs.find(b => b.addr === 'E120.1')
const EZM = inputs.find(b => b.addr === 'E120.2')
const SMA = outputs.find(b => b.addr === 'A120.1')
const SMB = outputs.find(b => b.addr === 'A120.2')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ECA = inputs.find(b => b.addr === 'E120.4')
const ECB = inputs.find(b => b.addr === 'E120.5')
const AMC = inputs.find(b => b.addr === 'E120.3')
const SCA = outputs.find(b => b.addr === 'A120.3')
const SCB = outputs.find(b => b.addr === 'A120.4')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E120.6')
const EZ = inputs.find(b => b.addr === 'E122.0')
const EO = inputs.find(b => b.addr === 'E122.1')
const FB = inputs.find(b => b.addr === 'E122.2')
const SZ = outputs.find(b => b.addr === 'A120.6')
const SO = outputs.find(b => b.addr === 'A120.7')
const KX = outputs.find(b => b.addr === 'A120.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M4, M5]

const main = new Main(drives, [M1, M2, M4, M5])

const views = [main]

const device = new Device(1, 'EL1', [], lamps, motors, views)

module.exports = { device, drives, positions }
