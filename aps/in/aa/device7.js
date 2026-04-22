import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Barrier, Door } from '../../../models/Motor.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E100.0'),
  outputs.find(b => b.addr === 'A100.5'),
  outputs.find(b => b.addr === 'A100.4')
]

const AP = inputs.find(b => b.addr === 'E122.3')
const EZ = inputs.find(b => b.addr === 'E126.3')
const EO = inputs.find(b => b.addr === 'E126.4')
const FB = inputs.find(b => b.addr === 'E126.1')
const SZ = outputs.find(b => b.addr === 'A123.0')
const SO = outputs.find(b => b.addr === 'A122.7')
const KX = outputs.find(b => b.addr === 'A122.6')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E122.4')
const EZB = inputs.find(b => b.addr === 'E126.5')
const EOB = inputs.find(b => b.addr === 'E126.6')
const FBB = inputs.find(b => b.addr === 'E126.2')
const SZB = outputs.find(b => b.addr === 'A123.3')
const SOB = outputs.find(b => b.addr === 'A123.2')
const KXB = outputs.find(b => b.addr === 'A123.1')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = []

const motors = [M2, M3]

const main = new Main(drives, [M2, M3])

const views = [main]

const device = new Device(7, 'U1', [], lamps, motors, views)

export default { device, drives, positions: [] }
