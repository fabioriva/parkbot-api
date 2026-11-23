import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find((b) => b.addr === 'E104.0')
const IV1 = new Drive(3, 'IV1', EN1)
const EN2 = inputs.find((b) => b.addr === 'E104.1')
const IV2 = new Drive(4, 'IV2', EN2)

const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find((b) => b.addr === 'E102.5'),
  outputs.find((b) => b.addr === 'A101.0'),
  outputs.find((b) => b.addr === 'A102.1')
]

const AH = inputs.find((b) => b.addr === 'E102.0')
const ASBK = inputs.find((b) => b.addr === 'E101.6')
const FT10 = inputs.find((b) => b.addr === 'E101.5')
// const FTM = inputs.find(b => b.addr === 'E1204.2')
const T101 = outputs.find((b) => b.addr === 'A102.2')
const T102 = outputs.find((b) => b.addr === 'A102.3')
const T10F = outputs.find((b) => b.addr === 'A101.0')
const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, FT10],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find((b) => b.addr === 'E103.0')
const RMH = inputs.find((b) => b.addr === 'E103.1')
const RES = inputs.find((b) => b.addr === 'E103.2')
const REH = inputs.find((b) => b.addr === 'E103.3')
const RCV = inputs.find((b) => b.addr === 'E103.4')
const REAV = inputs.find((b) => b.addr === 'E103.5')
const REAH = inputs.find((b) => b.addr === 'E103.6')
const RCH = inputs.find((b) => b.addr === 'E103.7')
const T2 = outputs.find((b) => b.addr === 'A102.4')
const TRA = outputs.find((b) => b.addr === 'A101.3')
const TRB = outputs.find((b) => b.addr === 'A101.4')
const KCS = outputs.find((b) => b.addr === 'A101.6')
const KCV = outputs.find((b) => b.addr === 'A101.7')
const KCH = outputs.find((b) => b.addr === 'A102.0')

const AF8 = inputs.find((b) => b.addr === 'E102.1')
const MTC = inputs.find((b) => b.addr === 'E102.1')

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

const device = new Device(2, 'SH1', [], lamps, motors, views)

export default { device, drives, positions }
