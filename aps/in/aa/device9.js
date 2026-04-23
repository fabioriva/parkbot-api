import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Barrier, Door } from '../../../models/Motor.js'
import { Main/*, Garage */ } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E321.2'),
  outputs.find(b => b.addr === 'A300.5'),
  outputs.find(b => b.addr === 'A300.4')
]

const AP = inputs.find(b => b.addr === 'E322.3')
const EZ = inputs.find(b => b.addr === 'E326.3')
const EO = inputs.find(b => b.addr === 'E326.4')
const FB = inputs.find(b => b.addr === 'E326.1')
const SZ = outputs.find(b => b.addr === 'A323.0')
const SO = outputs.find(b => b.addr === 'A322.7')
const KX = outputs.find(b => b.addr === 'A322.6')

const M2 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const APB = inputs.find(b => b.addr === 'E322.4')
const EZB = inputs.find(b => b.addr === 'E326.5')
const EOB = inputs.find(b => b.addr === 'E326.6')
const FBB = inputs.find(b => b.addr === 'E326.2')
const SZB = outputs.find(b => b.addr === 'A323.3')
const SOB = outputs.find(b => b.addr === 'A323.2')
const KXB = outputs.find(b => b.addr === 'A323.1')

const M3 = new Barrier(
  0,
  [EZB, EOB, APB, FBB],
  [SZB, SOB, KXB]
)

const drives = []

const motors = [M2, M3]

const main = new Main(drives, [M2, M3])

const views = [main]

const device = new Device(9, 'U3', [], lamps, motors, views)

export default { device, drives, positions: [] }
