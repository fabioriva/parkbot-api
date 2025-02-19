import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Lock,
  Hoisting,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E101.0')
const EN2 = inputs.find(b => b.addr === 'E123.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const RTA = inputs.find(b => b.addr === 'E102.6')
const ASBK = inputs.find(b => b.addr === 'E102.5')
const FSBK = inputs.find(b => b.addr === 'E102.4')
const SBK1 = outputs.find(b => b.addr === 'A100.0')
const SBK2 = outputs.find(b => b.addr === 'A100.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E110.2')
const EOM = inputs.find(b => b.addr === 'E110.5')
const EZM = inputs.find(b => b.addr === 'E110.6')
const SMA = outputs.find(b => b.addr === 'A110.0')
const SMB = outputs.find(b => b.addr === 'A110.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E110.0')
const AH = inputs.find(b => b.addr === 'E124.0')
const EMC = inputs.find(b => b.addr === 'E110.7')
const T101 = outputs.find(b => b.addr === 'A121.0')
const T102 = outputs.find(b => b.addr === 'A121.1')
const T10F = outputs.find(b => b.addr === 'A121.3')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, AGK, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E122.0')
const RMH = inputs.find(b => b.addr === 'E122.1')
const RES = inputs.find(b => b.addr === 'E122.2')
const REH = inputs.find(b => b.addr === 'E122.3')
const RCV = inputs.find(b => b.addr === 'E122.4')
const REAV = inputs.find(b => b.addr === 'E122.5')
const REAH = inputs.find(b => b.addr === 'E122.6')
const RCH = inputs.find(b => b.addr === 'E122.7')
const T2 = outputs.find(b => b.addr === 'A121.2')
const TRA = outputs.find(b => b.addr === 'A121.4')
const TRB = outputs.find(b => b.addr === 'A121.5')
const KCS = outputs.find(b => b.addr === 'A122.0')
const KCV = outputs.find(b => b.addr === 'A122.1')
const KCH = outputs.find(b => b.addr === 'A122.2')

const AF8 = inputs.find(b => b.addr === 'E110.0') // AGK
const MTC = inputs.find(b => b.addr === 'E124.1')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3])

const views = [main, silomat]

const device = new Device(1, 'EL1', [], lamps, motors, views)

export default { device, drives, positions }
