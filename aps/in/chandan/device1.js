const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Door,
  Flap,
  Lock,
  Hoisting,
  Rotation
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E10.0')
const EN2 = inputs.find(b => b.addr === 'E11.2')
const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENR = new Position(3, 'ENR')
const positions = [LV1, LV2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E10.1'),
  outputs.find(b => b.addr === 'A10.5'),
  outputs.find(b => b.addr === 'A10.4')
]

const RTA = inputs.find(b => b.addr === 'E10.4')
const ASBK = inputs.find(b => b.addr === 'E10.3')
const FSBK = inputs.find(b => b.addr === 'E10.2')
const SBK1 = outputs.find(b => b.addr === 'A10.0')
const SBK2 = outputs.find(b => b.addr === 'A10.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E13.3')
const EOM = inputs.find(b => b.addr === 'E16.6')
const EZM = inputs.find(b => b.addr === 'E16.7')
const SMA = outputs.find(b => b.addr === 'A15.5')
const SMB = outputs.find(b => b.addr === 'A15.6')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AD = inputs.find(b => b.addr === 'E11.3')
const ASBK2 = inputs.find(b => b.addr === 'E16.5')
const EXD = inputs.find(b => b.addr === 'E16.3')
// const TD = outputs.find(b => b.addr === 'A15.7')
const TDF = outputs.find(b => b.addr === 'A15.7')

const M3 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TDF],
  [],
  TDF
)

const AMMD = inputs.find(b => b.addr === 'E16.0')
const EOMD = inputs.find(b => b.addr === 'E16.1')
const EZMD = inputs.find(b => b.addr === 'E16.2')
const SMAD = outputs.find(b => b.addr === 'A13.3')
const SMBD = outputs.find(b => b.addr === 'A13.4')

const M4 = new Lock(0, [EZMD, EOMD, AMMD], [SMAD, SMBD])

const ECA = inputs.find(b => b.addr === 'E13.4')
const ECB = inputs.find(b => b.addr === 'E13.5')
const AMC = inputs.find(b => b.addr === 'E13.6')
const SCA = outputs.find(b => b.addr === 'A15.3')
const SCB = outputs.find(b => b.addr === 'A15.4')

const M5 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E13.2')
const EZ = inputs.find(b => b.addr === 'E14.0')
const EO = inputs.find(b => b.addr === 'E14.1')
const FB = inputs.find(b => b.addr === 'E14.2')
const SZ = outputs.find(b => b.addr === 'A15.1')
const SO = outputs.find(b => b.addr === 'A15.0')
const KX = outputs.find(b => b.addr === 'A14.6')

const M6 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

const views = [main]

const device = new Device(1, 'EL1', [], lamps, motors, views)

module.exports = { device, drives, positions }
