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

const EN1 = inputs.find(b => b.addr === 'E60.0')
const EN2 = inputs.find(b => b.addr === 'E67.0')

const IV1 = new Drive(5, 'IV1', EN1)
const IV2 = new Drive(6, 'IV2', EN2)

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E60.1'),
  outputs.find(b => b.addr === 'A60.5'),
  outputs.find(b => b.addr === 'A60.4')
]

const RTA = inputs.find(b => b.addr === 'E60.4')
const ASBK = inputs.find(b => b.addr === 'E60.3')
const FSBK = inputs.find(b => b.addr === 'E60.2')
const SBK1 = outputs.find(b => b.addr === 'A60.0')
const SBK2 = outputs.find(b => b.addr === 'A60.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E63.2')
const EOM = inputs.find(b => b.addr === 'E63.3')
const EZM = inputs.find(b => b.addr === 'E63.4')
const SMA = outputs.find(b => b.addr === 'A62.0')
const SMB = outputs.find(b => b.addr === 'A62.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ASH = inputs.find(b => b.addr === 'E62.0')
const AH = inputs.find(b => b.addr === 'E68.6')
const EMC = inputs.find(b => b.addr === 'E63.5')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A65.0')
const T102 = outputs.find(b => b.addr === 'A66.4')
const T10F = outputs.find(b => b.addr === 'A66.5')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, ASH, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E66.0')
const RMH = inputs.find(b => b.addr === 'E66.1')
const RES = inputs.find(b => b.addr === 'E66.2')
const REH = inputs.find(b => b.addr === 'E66.3')
const RCV = inputs.find(b => b.addr === 'E66.4')
const REAV = inputs.find(b => b.addr === 'E66.5')
const REAH = inputs.find(b => b.addr === 'E66.6')
const RCH = inputs.find(b => b.addr === 'E66.7')
const T2 = outputs.find(b => b.addr === 'A65.1')
const TRA = outputs.find(b => b.addr === 'A65.2')
const TRB = outputs.find(b => b.addr === 'A65.3')
const KCS = outputs.find(b => b.addr === 'A65.4')
const KCV = outputs.find(b => b.addr === 'A65.5')
const KCH = outputs.find(b => b.addr === 'A65.6')

const AF8 = inputs.find(b => b.addr === 'E62.0')
const MTC = inputs.find(b => b.addr === 'E68.7')

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

const device = new Device(4, 'ELB', [], lamps, motors, views)

export default { device, drives, positions }
