import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E1204.0')
const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(23, 'LH1')
const LH2 = new Position(24, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1202.5'),
  outputs.find(b => b.addr === 'A1201.1'),
  outputs.find(b => b.addr === 'A1201.0')
]

const AH = inputs.find(b => b.addr === 'E1202.0')
const FTM = inputs.find(b => b.addr === 'E1204.2')
const T101 = outputs.find(b => b.addr === 'A1202.2')
const T102 = outputs.find(b => b.addr === 'A1202.3')
const T10F = outputs.find(b => b.addr === 'A1201.1')
const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, FTM],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1203.0')
const RMH = inputs.find(b => b.addr === 'E1203.1')
const RES = inputs.find(b => b.addr === 'E1203.2')
const REH = inputs.find(b => b.addr === 'E1203.3')
const RCV = inputs.find(b => b.addr === 'E1203.4')
const REAV = inputs.find(b => b.addr === 'E1203.5')
const REAH = inputs.find(b => b.addr === 'E1203.6')
const RCH = inputs.find(b => b.addr === 'E1203.7')
const T2 = outputs.find(b => b.addr === 'A1202.4')
const TRA = outputs.find(b => b.addr === 'A1201.3')
const TRB = outputs.find(b => b.addr === 'A1201.4')
const KCS = outputs.find(b => b.addr === 'A1201.5')
const KCV = outputs.find(b => b.addr === 'A1201.6')
const KCH = outputs.find(b => b.addr === 'A1201.7')

const AF8 = inputs.find(b => b.addr === 'E1202.1')
const MTC = inputs.find(b => b.addr === 'E1202.1')

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

const device = new Device(12, 'SH7', [], lamps, motors, views)

export default { device, drives, positions }
