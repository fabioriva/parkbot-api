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

const EN1 = inputs.find(b => b.addr === 'E20.0')
const IV1 = new Drive(3, 'IV1', EN1)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E20.1'),
  outputs.find(b => b.addr === 'A20.5'),
  outputs.find(b => b.addr === 'A20.4')
]

const RTA = inputs.find(b => b.addr === 'E20.4')
const ASBK = inputs.find(b => b.addr === 'E20.3')
const FSBK = inputs.find(b => b.addr === 'E20.2')
const SBK1 = outputs.find(b => b.addr === 'A20.0')
const SBK2 = outputs.find(b => b.addr === 'A20.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E23.3')
const EOM = inputs.find(b => b.addr === 'E26.1')
const EZM = inputs.find(b => b.addr === 'E26.2')
const SMA = outputs.find(b => b.addr === 'A23.5')
const SMB = outputs.find(b => b.addr === 'A23.6')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ECA = inputs.find(b => b.addr === 'E23.4')
const ECB = inputs.find(b => b.addr === 'E23.5')
const AMC = inputs.find(b => b.addr === 'E23.6')
const SCA = outputs.find(b => b.addr === 'A23.3')
const SCB = outputs.find(b => b.addr === 'A23.4')

const M3 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E23.2')
const EZ = inputs.find(b => b.addr === 'E24.0')
const EO = inputs.find(b => b.addr === 'E24.1')
const FB = inputs.find(b => b.addr === 'E24.2')
const SZ = outputs.find(b => b.addr === 'A25.1')
const SO = outputs.find(b => b.addr === 'A25.0')
const KX = outputs.find(b => b.addr === 'A24.6')

const M4 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1]

const motors = [M1, M2, M3, M4]

const main = new Main(drives, [M1, M2, M3, M4])

const views = [main]

const device = new Device(2, 'EL2', [], lamps, motors, views)

module.exports = { device, drives, positions }
