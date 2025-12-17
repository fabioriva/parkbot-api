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

const EN1 = inputs.find(b => b.addr === 'E5.6')
const EN2 = inputs.find(b => b.addr === 'E17.1')

const IV1 = new Drive(3, 'IV1', EN1)
const IV2 = new Drive(4, 'IV2', EN2)

const LV1 = new Position(3, 'LV1')
const LV2 = new Position(4, 'LV2')
const LH1 = new Position(5, 'LH1')
const LH2 = new Position(6, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E16.7'),
  outputs.find(b => b.addr === 'A15.0'),
  outputs.find(b => b.addr === 'A15.1')
]

const RTA = inputs.find(b => b.addr === 'E3.4')
const ASBK = inputs.find(b => b.addr === 'E3.7')
const FSBK = inputs.find(b => b.addr === 'E4.2')
const SBK1 = outputs.find(b => b.addr === 'A2.4')
const SBK2 = outputs.find(b => b.addr === 'A2.5')
const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E12.1')
const EOM = inputs.find(b => b.addr === 'E12.6')
const EZM = inputs.find(b => b.addr === 'E12.7')
const SMA = outputs.find(b => b.addr === 'A12.0')
const SMB = outputs.find(b => b.addr === 'A12.1')
const M2 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

const ASH = inputs.find(b => b.addr === 'E12.2')
// const AH = inputs.find(b => b.addr === 'E15.4')
// const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E12.5')
// const TLIV = outputs.find(b => b.addr === 'A7.6')
const T101 = outputs.find(b => b.addr === 'A16.2')
const T102 = outputs.find(b => b.addr === 'A16.3')
const T10F = outputs.find(b => b.addr === 'A15.1')
const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [ASH, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E17.3')
const RMH = inputs.find(b => b.addr === 'E17.4')
const RES = inputs.find(b => b.addr === 'E17.5')
const REH = inputs.find(b => b.addr === 'E17.6')
const RCV = inputs.find(b => b.addr === 'E17.7')
const REAV = inputs.find(b => b.addr === 'E18.0')
const REAH = inputs.find(b => b.addr === 'E18.1')
const RCH = inputs.find(b => b.addr === 'E18.2')
const T2 = outputs.find(b => b.addr === 'A16.1')
const TRA = outputs.find(b => b.addr === 'A15.2')
const TRB = outputs.find(b => b.addr === 'A15.3')
const KCS = outputs.find(b => b.addr === 'A15.5')
const KCV = outputs.find(b => b.addr === 'A15.6')
const KCH = outputs.find(b => b.addr === 'A15.7')

const AF8 = inputs.find(b => b.addr === 'E12.2') // ASH
const MTC = inputs.find(b => b.addr === 'E16.0')

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

const device = new Device(3, 'EL3', [], lamps, motors, views)

export default { device, drives, positions }
