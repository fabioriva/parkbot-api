import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E1403.0')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1401.4'),
  outputs.find(b => b.addr === 'A1401.7'),
  outputs.find(b => b.addr === 'A1401.6')
]

const AH = inputs.find(b => b.addr === 'E1404.4')
const EXPH = inputs.find(b => b.addr === 'E1402.2')
const T101 = outputs.find(b => b.addr === 'A1401.0')
const T102 = outputs.find(b => b.addr === 'A1401.1')
const T10F = outputs.find(b => b.addr === 'A1402.7')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, EXPH],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1405.0')
const RMH = inputs.find(b => b.addr === 'E1405.1')
const RES = inputs.find(b => b.addr === 'E1405.2')
const REH = inputs.find(b => b.addr === 'E1405.3')
const RCV = inputs.find(b => b.addr === 'E1405.4')
const REAV = inputs.find(b => b.addr === 'E1405.5')
const REAH = inputs.find(b => b.addr === 'E1405.6')
const RCH = inputs.find(b => b.addr === 'E1405.7')
const T2 = outputs.find(b => b.addr === 'A1402.0')
const TRA = outputs.find(b => b.addr === 'A1402.1')
const TRB = outputs.find(b => b.addr === 'A1402.2')
const KCS = outputs.find(b => b.addr === 'A1402.3')
const KCV = outputs.find(b => b.addr === 'A1402.4')
const KCH = outputs.find(b => b.addr === 'A1402.5')

const AF8 = inputs.find(b => b.addr === 'E1403.2')
const MTC = inputs.find(b => b.addr === 'E1404.7')

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

const device = new Device(9, 'SH5', [], lamps, motors, views)

export default { device, drives, positions }
