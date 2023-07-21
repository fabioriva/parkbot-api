const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Barrier,
  Door,
  Rotation
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')

const EN4 = inputs.find(b => b.addr === 'E2.5')
const IV4 = new Drive(4, 'IV4', EN4)

const ENR = new Position(5, 'ENR')

const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
]

const AD = inputs.find(b => b.addr === 'E6.4')
const ASBK2 = inputs.find(b => b.addr === 'E6.5')
const EXD = inputs.find(b => b.addr === 'E6.2')
const EXH = inputs.find(b => b.addr === 'E6.3')
const TD = outputs.find(b => b.addr === 'A4.3') // SBK3

const M1 = new Rotation(
  0,
  IV4,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const AP = inputs.find(b => b.addr === 'E2.0')
const EZ = inputs.find(b => b.addr === 'E3.4')
const EO = inputs.find(b => b.addr === 'E3.5')
const FB = inputs.find(b => b.addr === 'E4.2')
const SZ = outputs.find(b => b.addr === 'A3.5')
const SO = outputs.find(b => b.addr === 'A3.4')
const KX = outputs.find(b => b.addr === 'A2.7')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E2.0')
const EZB = inputs.find(b => b.addr === 'E3.6')
const EOB = inputs.find(b => b.addr === 'E3.7')
const FBB = inputs.find(b => b.addr === 'E4.3')
const SZB = outputs.find(b => b.addr === 'A3.7')
const SOB = outputs.find(b => b.addr === 'A3.6')
const KXB = outputs.find(b => b.addr === 'A2.7')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = [IV4]

const motors = [M1, M5, M6]

const views = [
  { name: 'view-main', drives, motors: [M1, M5, M6] }
]

const device = new Device(3, 'U', [], lamps, views)

module.exports = { device, drives, motors, positions }
