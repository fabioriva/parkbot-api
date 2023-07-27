const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const {
  Barrier,
  Door,
  Flap
} = require('../../../models/Motor')
const { Main } = require('../../../models/View')

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const ECA = inputs.find(b => b.addr === 'E207.0')
const ECB = inputs.find(b => b.addr === 'E207.1')
const AMC = inputs.find(b => b.addr === 'E202.7')
const SCA = outputs.find(b => b.addr === 'A202.0')
const SCB = outputs.find(b => b.addr === 'A202.1')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E203.7')
const EZ = inputs.find(b => b.addr === 'E203.4')
const EO = inputs.find(b => b.addr === 'E203.5')
const FB = inputs.find(b => b.addr === 'E203.6')
const SZ = outputs.find(b => b.addr === 'A204.2')
const SO = outputs.find(b => b.addr === 'A204.3')
// const KX = outputs.find(b => b.addr === 'A202.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO]
)

const APB = inputs.find(b => b.addr === 'E203.3')
const EZB = inputs.find(b => b.addr === 'E203.0')
const EOB = inputs.find(b => b.addr === 'E203.1')
const FBB = inputs.find(b => b.addr === 'E203.2')
const SZB = outputs.find(b => b.addr === 'A204.0')
const SOB = outputs.find(b => b.addr === 'A204.1')
// const KXB = outputs.find(b => b.addr === 'A202.1')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB]
)

const drives = []

const motors = [M4, M5, M6]

const positions = []

const main = new Main(drives, [M4, M5, M6])

const views = [main]

const device = new Device(5, 'E2', [], lamps, motors, views)

module.exports = { device, drives, positions }
