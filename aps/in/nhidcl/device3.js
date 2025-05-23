import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import {
  Barrier,
  Door,
  Flap
} from '../../../models/Motor.js'
import { Main } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const ECA = inputs.find(b => b.addr === 'E107.0')
const ECB = inputs.find(b => b.addr === 'E107.1')
const AMC = inputs.find(b => b.addr === 'E102.7')
const SCA = outputs.find(b => b.addr === 'A102.0')
const SCB = outputs.find(b => b.addr === 'A102.1')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E103.7')
const EZ = inputs.find(b => b.addr === 'E103.4')
const EO = inputs.find(b => b.addr === 'E103.5')
const FB = inputs.find(b => b.addr === 'E103.6')
const SZ = outputs.find(b => b.addr === 'A104.2')
const SO = outputs.find(b => b.addr === 'A104.3')
// const KX = outputs.find(b => b.addr === 'A102.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO]
)

const APB = inputs.find(b => b.addr === 'E103.3')
const EZB = inputs.find(b => b.addr === 'E103.0')
const EOB = inputs.find(b => b.addr === 'E103.1')
const FBB = inputs.find(b => b.addr === 'E103.2')
const SZB = outputs.find(b => b.addr === 'A104.0')
const SOB = outputs.find(b => b.addr === 'A104.1')
// const KXB = outputs.find(b => b.addr === 'A102.1')

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

const device = new Device(3, 'E1', [], lamps, motors, views)

export default { device, drives, positions }
