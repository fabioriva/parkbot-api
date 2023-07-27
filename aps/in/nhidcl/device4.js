const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const {
  Barrier,
  Door
} = require('../../../models/Motor')
const { Main } = require('../../../models/View')

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const AP = inputs.find(b => b.addr === 'E104.7')
const EZ = inputs.find(b => b.addr === 'E104.4')
const EO = inputs.find(b => b.addr === 'E104.5')
const FB = inputs.find(b => b.addr === 'E104.6')
const SZ = outputs.find(b => b.addr === 'A104.6')
const SO = outputs.find(b => b.addr === 'A104.7')
// const KX = outputs.find(b => b.addr === 'A102.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO]
)

const APB = inputs.find(b => b.addr === 'E104.3')
const EZB = inputs.find(b => b.addr === 'E104.0')
const EOB = inputs.find(b => b.addr === 'E104.1')
const FBB = inputs.find(b => b.addr === 'E104.2')
const SZB = outputs.find(b => b.addr === 'A104.4')
const SOB = outputs.find(b => b.addr === 'A104.5')
// const KXB = outputs.find(b => b.addr === 'A102.1')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB]
)

const drives = []

const motors = [M5, M6]

const positions = []

const main = new Main(drives, [M5, M6])

const views = [main]

const device = new Device(4, 'U1', [], lamps, motors, views)

module.exports = { device, drives, positions }
