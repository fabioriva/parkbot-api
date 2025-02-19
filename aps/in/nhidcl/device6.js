import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import {
  Barrier,
  Door
} from '../../../models/Motor.js'
import { Main } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const AP = inputs.find(b => b.addr === 'E204.7')
const EZ = inputs.find(b => b.addr === 'E204.4')
const EO = inputs.find(b => b.addr === 'E204.5')
const FB = inputs.find(b => b.addr === 'E204.6')
const SZ = outputs.find(b => b.addr === 'A204.6')
const SO = outputs.find(b => b.addr === 'A204.7')
// const KX = outputs.find(b => b.addr === 'A202.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO]
)

const APB = inputs.find(b => b.addr === 'E204.3')
const EZB = inputs.find(b => b.addr === 'E204.0')
const EOB = inputs.find(b => b.addr === 'E204.1')
const FBB = inputs.find(b => b.addr === 'E204.2')
const SZB = outputs.find(b => b.addr === 'A204.4')
const SOB = outputs.find(b => b.addr === 'A204.5')
// const KXB = outputs.find(b => b.addr === 'A202.1')

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

const device = new Device(6, 'U2', [], lamps, motors, views)

export default { device, drives, positions }
