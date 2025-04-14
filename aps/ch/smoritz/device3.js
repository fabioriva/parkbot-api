import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Lock, Hoisting } from '../../../models/Motor.js'
import { Main } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E13.6')
const IV1 = new Drive(3, 'IVR', EN1)
const drives = [IV1]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A8.7'),
  outputs.find(b => b.addr === 'A8.6')
]

// const RTA = inputs.find(b => b.addr === 'E4.6')
const ASBK = inputs.find(b => b.addr === 'E13.5')
const FSBK = inputs.find(b => b.addr === 'E13.7')
const SBK1 = outputs.find(b => b.addr === 'A4.5')
const SBK2 = outputs.find(b => b.addr === 'A10.2')

const MNA = inputs.find(b => b.addr === 'E12.2')
const MNB = inputs.find(b => b.addr === 'E12.3')
const EXV1 = inputs.find(b => b.addr === 'E12.0')
const EXV2 = inputs.find(b => b.addr === 'E12.1')

const M1 = new Hoisting(
  0,
  IV1,
  [],
  [ASBK, FSBK, MNA, MNB, EXV1, EXV2],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E13.0')
const EOM1 = inputs.find(b => b.addr === 'E13.1')
const EZM1 = inputs.find(b => b.addr === 'E13.2')
const SMA1 = outputs.find(b => b.addr === 'A11.6')
const SMB1 = outputs.find(b => b.addr === 'A11.7')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])

const positions = []

const motors = [M1, M2]

const main = new Main(drives, [M1, M2])

const views = [main]

const device = new Device(3, 'EL(R)', [], lamps, motors, views)

export default { device, drives, positions }
