import { inputs, inputsSH, outputs, outputsSH } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Hoisting,
  Lock,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E7.0')
const EN2 = inputsSH.find(b => b.addr === 'E3.0')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENC = new Position(5, 'ENC')
const positions = [LV1, LV2, LH1, LH2, ENC]

const lamps = [
  inputsSH.find(b => b.addr === 'E3.3'),
  outputsSH.find(b => b.addr === 'A0.7'),
  outputsSH.find(b => b.addr === 'A0.6')
]

const RTA = inputs.find(b => b.addr === 'E8.6')
const ASBK = inputs.find(b => b.addr === 'E8.5')
const FSBK = inputs.find(b => b.addr === 'E8.4')
const SBK1 = outputs.find(b => b.addr === 'A4.0')
const SBK2 = outputs.find(b => b.addr === 'A6.0')

const EXPV = inputs.find(b => b.addr === 'E25.0')
// const KEXPV2 = inputs.find(b => b.addr === 'E109.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, EXPV],
  [SBK1, SBK2],
  [],
  FSBK
)

const AH = inputsSH.find(b => b.addr === 'E4.6')
const FTCR = inputsSH.find(b => b.addr === 'E4.4')
const T10 = outputsSH.find(b => b.addr === 'A2.0')
const T10F = outputsSH.find(b => b.addr === 'A0.5')

const M2 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, FTCR],
  [T10, T10F],
  [],
  T10
)

const AMM = inputs.find(b => b.addr === 'E25.2')
const EOM = inputs.find(b => b.addr === 'E25.3')
const EZM = inputs.find(b => b.addr === 'E25.4')
const SMA = outputs.find(b => b.addr === 'A24.0')
const SMB = outputs.find(b => b.addr === 'A24.1')

const M3 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const RMV = inputsSH.find(b => b.addr === 'E2.0')
const RMH = inputsSH.find(b => b.addr === 'E2.1')
const RES = inputsSH.find(b => b.addr === 'E2.2')
const REH = inputsSH.find(b => b.addr === 'E2.3')
const RCV = inputsSH.find(b => b.addr === 'E2.4')
const REAV = inputsSH.find(b => b.addr === 'E2.5')
const REAH = inputsSH.find(b => b.addr === 'E2.6')
const RCH = inputsSH.find(b => b.addr === 'E2.7')
const T2 = outputsSH.find(b => b.addr === 'A2.1')
const TRA = outputsSH.find(b => b.addr === 'A2.2')
const TRB = outputsSH.find(b => b.addr === 'A2.3')
const KCS = outputsSH.find(b => b.addr === 'A2.4')
const KCV = outputsSH.find(b => b.addr === 'A2.5')
const KCH = outputsSH.find(b => b.addr === 'A2.6')

const AF8 = inputsSH.find(b => b.addr === 'E3.5')
const MTC = inputsSH.find(b => b.addr === 'E4.7')

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

const device = new Device(1, 'EL', [], lamps, motors, views)

export default { device, drives, positions }
