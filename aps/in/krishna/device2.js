import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import {
  Barrier,
  Door
} from '../../../models/Motor.js'
import { Main } from '../../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
//   inputs.find(b => b.addr === 'E4.3') // FPE
]

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

const drives = []

const motors = [M5, M6]

const main = new Main(drives, [M5, M6])

const views = [main]

const device = new Device(2, 'U', [], lamps, motors, views)

export default { device, drives, positions }
