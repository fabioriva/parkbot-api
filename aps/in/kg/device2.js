import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
// import {
//   DoorVFD,
//   Flap,
//   Lock,
//   Hoisting,
//   Rotation,
//   Silomat,
//   Traveling
// } from '../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E41.1')
const EN2 = inputs.find(b => b.addr === 'E53.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(2, 'LV1')
const LV2 = new Position(3, 'LV2')
const LH1 = new Position(4, 'LH1')
const LH2 = new Position(5, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E41.2'),
  outputs.find(b => b.addr === 'A40.7'),
  outputs.find(b => b.addr === 'A40.6')
]

const RMV = inputs.find(b => b.addr === 'E52.0')
const RMH = inputs.find(b => b.addr === 'E52.1')
const RES = inputs.find(b => b.addr === 'E52.2')
const REH = inputs.find(b => b.addr === 'E52.3')
const RCV = inputs.find(b => b.addr === 'E52.4')
const REAV = inputs.find(b => b.addr === 'E52.5')
const REAH = inputs.find(b => b.addr === 'E52.6')
const RCH = inputs.find(b => b.addr === 'E52.7')
const T2 = outputs.find(b => b.addr === 'A51.1')
const TRA = outputs.find(b => b.addr === 'A51.2')
const TRB = outputs.find(b => b.addr === 'A51.3')
const KCS = outputs.find(b => b.addr === 'A51.4')
const KCV = outputs.find(b => b.addr === 'A51.5')
const KCH = outputs.find(b => b.addr === 'A51.6')

const AF8 = inputs.find(b => b.addr === 'E51.1') // AF1
const MTC = inputs.find(b => b.addr === 'E53.2')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = []

const main = new Main(drives, [])

const views = [main, silomat]

const device = new Device(2, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
