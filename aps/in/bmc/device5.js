const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Barrier,
  Door,
  Rotation
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main } = require('../../../models/View')

const EN3 = inputs.find(b => b.addr === 'E102.1')
const IV3 = new Drive(7, 'IV4', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.1'),
  outputs.find(b => b.addr === 'A101.0'),
  outputs.find(b => b.addr === 'A101.1')
]

const AD = inputs.find(b => b.addr === 'E101.5') // RTD
const ASBK2 = inputs.find(b => b.addr === 'E101.6') // ASR
const EXD = inputs.find(b => b.addr === 'E107.0')
const EXH = inputs.find(b => b.addr === 'E107.1')
const TD = outputs.find(b => b.addr === 'A101.3') // KBA4

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E101.4')
const EZ = inputs.find(b => b.addr === 'E106.0')
const EO = inputs.find(b => b.addr === 'E106.1')
const FB = inputs.find(b => b.addr === 'E106.4')
const SZ = outputs.find(b => b.addr === 'A103.3')
const SO = outputs.find(b => b.addr === 'A103.2')
const KX = outputs.find(b => b.addr === 'A102.2')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E101.3')
const EZB = inputs.find(b => b.addr === 'E106.2')
const EOB = inputs.find(b => b.addr === 'E106.3')
const FBB = inputs.find(b => b.addr === 'E106.5')
const SZB = outputs.find(b => b.addr === 'A103.7')
const SOB = outputs.find(b => b.addr === 'A103.6')
const KXB = outputs.find(b => b.addr === 'A102.3')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = [IV3]

const motors = [M1, M5, M6]

const main = new Main(drives, [M1, M5, M6])

const views = [main]

const device = new Device(5, 'U1', [], lamps, motors, views)

module.exports = { device, drives, positions }
