import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E1003.0')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1001.4'),
  outputs.find(b => b.addr === 'A1001.7'),
  outputs.find(b => b.addr === 'A1001.6')
]

const AH = inputs.find(b => b.addr === 'E1004.4')
const EXPH = inputs.find(b => b.addr === 'E1002.2')
const T101 = outputs.find(b => b.addr === 'A1001.0')
const T102 = outputs.find(b => b.addr === 'A1001.1')
const T10F = outputs.find(b => b.addr === 'A1002.7')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, EXPH],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1005.0')
const RMH = inputs.find(b => b.addr === 'E1005.1')
const RES = inputs.find(b => b.addr === 'E1005.2')
const REH = inputs.find(b => b.addr === 'E1005.3')
const RCV = inputs.find(b => b.addr === 'E1005.4')
const REAV = inputs.find(b => b.addr === 'E1005.5')
const REAH = inputs.find(b => b.addr === 'E1005.6')
const RCH = inputs.find(b => b.addr === 'E1005.7')
const T2 = outputs.find(b => b.addr === 'A1002.0')
const TRA = outputs.find(b => b.addr === 'A1002.1')
const TRB = outputs.find(b => b.addr === 'A1002.2')
const KCS = outputs.find(b => b.addr === 'A1002.3')
const KCV = outputs.find(b => b.addr === 'A1002.4')
const KCH = outputs.find(b => b.addr === 'A1002.5')

const AF8 = inputs.find(b => b.addr === 'E1003.2')
const MTC = inputs.find(b => b.addr === 'E1004.7')

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

const device = new Device(5, 'SH1', [], lamps, motors, views)

export default { device, drives, positions }
