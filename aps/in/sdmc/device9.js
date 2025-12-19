import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E904.0')
const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(17, 'LH1')
const LH2 = new Position(18, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E902.5'),
  outputs.find(b => b.addr === 'A901.1'),
  outputs.find(b => b.addr === 'A901.0')
]

const AH = inputs.find(b => b.addr === 'E902.0')
const FTM = inputs.find(b => b.addr === 'E904.2')
const T101 = outputs.find(b => b.addr === 'A902.2')
const T102 = outputs.find(b => b.addr === 'A902.3')
const T10F = outputs.find(b => b.addr === 'A901.1')
const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, FTM],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E903.0')
const RMH = inputs.find(b => b.addr === 'E903.1')
const RES = inputs.find(b => b.addr === 'E903.2')
const REH = inputs.find(b => b.addr === 'E903.3')
const RCV = inputs.find(b => b.addr === 'E903.4')
const REAV = inputs.find(b => b.addr === 'E903.5')
const REAH = inputs.find(b => b.addr === 'E903.6')
const RCH = inputs.find(b => b.addr === 'E903.7')
const T2 = outputs.find(b => b.addr === 'A902.4')
const TRA = outputs.find(b => b.addr === 'A901.3')
const TRB = outputs.find(b => b.addr === 'A901.4')
const KCS = outputs.find(b => b.addr === 'A901.5')
const KCV = outputs.find(b => b.addr === 'A901.6')
const KCH = outputs.find(b => b.addr === 'A901.7')

const AF8 = inputs.find(b => b.addr === 'E902.1')
const MTC = inputs.find(b => b.addr === 'E902.1')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, ...silomat.motors]

const main = new Main(drives, [M1])

const views = [main, silomat]

const device = new Device(9, 'SH4', [], lamps, motors, views)

export default { device, drives, positions }
