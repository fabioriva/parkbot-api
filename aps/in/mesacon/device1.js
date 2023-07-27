const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Barrier,
  Door,
  Flap,
  Rotation
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main } = require('../../../models/View')

const EN3 = inputs.find(b => b.addr === 'E2.4')
const IV3 = new Drive(3, 'IV3', EN3)

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
//   inputs.find(b => b.addr === 'E4.3') // FPE
]

const AD = inputs.find(b => b.addr === 'E6.4')
const ASBK2 = inputs.find(b => b.addr === 'E6.5')
const EXD = inputs.find(b => b.addr === 'E6.0')
const EXH = inputs.find(b => b.addr === 'E6.1')
const TD = outputs.find(b => b.addr === 'A4.2') // SBK3

const M1 = new Rotation(
  0,
  IV3,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E2.6')
const ECB = inputs.find(b => b.addr === 'E2.7')
const AMC = inputs.find(b => b.addr === 'E1.6')
const SCA = outputs.find(b => b.addr === 'A1.3')
const SCB = outputs.find(b => b.addr === 'A1.4')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E1.7')
const EZ = inputs.find(b => b.addr === 'E3.0')
const EO = inputs.find(b => b.addr === 'E3.1')
const FB = inputs.find(b => b.addr === 'E4.0')
const SZ = outputs.find(b => b.addr === 'A3.1')
const SO = outputs.find(b => b.addr === 'A3.0')
const KX = outputs.find(b => b.addr === 'A2.6')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E1.7')
const EZB = inputs.find(b => b.addr === 'E3.2')
const EOB = inputs.find(b => b.addr === 'E3.3')
const FBB = inputs.find(b => b.addr === 'E4.1')
const SZB = outputs.find(b => b.addr === 'A3.3')
const SOB = outputs.find(b => b.addr === 'A3.2')
const KXB = outputs.find(b => b.addr === 'A2.6')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const A0 = {
  conn: def.REQ_1,
  enable: merkers.find(b => b.addr === 'M3.1'),
  key: 'action-entry'
}

const drives = [IV3]

const motors = [M1, M4, M5, M6]

const main = new Main(drives, [M1, M4, M5, M6])

const views = [main]

const device = new Device(1, 'EU1', [A0], lamps, motors, views)

module.exports = { device, drives, positions }
