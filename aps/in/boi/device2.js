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

const EN1 = inputs.find(b => b.addr === 'E40.0')
const EN2 = inputs.find(b => b.addr === 'E48.7')
const IV1 = new Drive(3, 'IV1', EN1)
const IV2 = new Drive(4, 'IV2', EN2)

const LV = new Position(3, 'LV')
const ENR = new Position(4, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E40.1'),
  outputs.find(b => b.addr === 'A40.5'),
  outputs.find(b => b.addr === 'A40.4')
]

const RTA = inputs.find(b => b.addr === 'E40.4')
const ASBK = inputs.find(b => b.addr === 'E40.3')
const FSBK = inputs.find(b => b.addr === 'E40.2')
const SBK1 = outputs.find(b => b.addr === 'A40.0')
const SBK2 = outputs.find(b => b.addr === 'A40.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E49.5')
const EOM = inputs.find(b => b.addr === 'E49.6')
const EZM = inputs.find(b => b.addr === 'E49.7')
const SMA = outputs.find(b => b.addr === 'A46.5')
const SMB = outputs.find(b => b.addr === 'A46.6')

const AD = inputs.find(b => b.addr === 'E48.0')
const ASBK2 = inputs.find(b => b.addr === 'E50.0')
const EXD = inputs.find(b => b.addr === 'E49.3')
const TD = outputs.find(b => b.addr === 'A46.7')
const TDF = outputs.find(b => b.addr === 'A46.2')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const M3 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD, TDF],
  [],
  TD
)

const AMMD = inputs.find(b => b.addr === 'E46.0')
const EOMD = inputs.find(b => b.addr === 'E46.1')
const EZMD = inputs.find(b => b.addr === 'E46.2')
const SMAD = outputs.find(b => b.addr === 'A43.3')
const SMBD = outputs.find(b => b.addr === 'A43.4')

const M4 = new Lock(0, [EZMD, EOMD, AMMD], [SMAD, SMBD])

const ECA = inputs.find(b => b.addr === 'E48.2')
const ECB = inputs.find(b => b.addr === 'E48.3')
const AMC = inputs.find(b => b.addr === 'E48.4')
const SCA = outputs.find(b => b.addr === 'A46.0')
const SCB = outputs.find(b => b.addr === 'A46.1')

const M5 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E43.2')
const EZ = inputs.find(b => b.addr === 'E44.0')
const EO = inputs.find(b => b.addr === 'E44.1')
const FB = inputs.find(b => b.addr === 'E44.2')
const SZ = outputs.find(b => b.addr === 'A45.1')
const SO = outputs.find(b => b.addr === 'A45.2')
const KX = outputs.find(b => b.addr === 'A44.6')

const M6 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6] }
]

const device = new Device(2, 'EL2', [], lamps, views)

module.exports = { device, drives, motors, positions }
