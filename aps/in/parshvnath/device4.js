import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Rotation,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E111.1')
const EN2 = inputs.find(b => b.addr === 'E111.2')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const ENR = new Position(9, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E113.3'),
  outputs.find(b => b.addr === 'A113.7'),
  outputs.find(b => b.addr === 'A113.6')
]

const AH = inputs.find(b => b.addr === 'E114.6')
const T101 = outputs.find(b => b.addr === 'A113.2')
const T102 = outputs.find(b => b.addr === 'A113.3')
const T10F = outputs.find(b => b.addr === 'A113.5')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH],
  [T101, T102, T10F],
  [],
  T10F
)

const AD = inputs.find(b => b.addr === 'E114.5')
const ASBK2 = inputs.find(b => b.addr === 'E114.0')
const EXD = inputs.find(b => b.addr === 'E111.4') // EXE
const EXH = inputs.find(b => b.addr === 'E111.5') // EXU
const TD = outputs.find(b => b.addr === 'A113.4') // KBA3

const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD, EXH],
  [TD],
  [],
  TD
)

const RMV = inputs.find(b => b.addr === 'E112.0')
const RMH = inputs.find(b => b.addr === 'E112.1')
const RES = inputs.find(b => b.addr === 'E112.2')
const REH = inputs.find(b => b.addr === 'E112.3')
const RCV = inputs.find(b => b.addr === 'E112.4')
const REAV = inputs.find(b => b.addr === 'E112.5')
const REAH = inputs.find(b => b.addr === 'E112.6')
const RCH = inputs.find(b => b.addr === 'E112.7')
const T2 = outputs.find(b => b.addr === 'A112.1')
const TRA = outputs.find(b => b.addr === 'A112.2')
const TRB = outputs.find(b => b.addr === 'A112.3')
const KCS = outputs.find(b => b.addr === 'A112.4')
const KCV = outputs.find(b => b.addr === 'A112.5')
const KCH = outputs.find(b => b.addr === 'A112.6')

const EM = inputs.find(b => b.addr === 'E111.3')
// const AF8 = inputs.find(b => b.addr === 'E112.0')
const MTC = inputs.find(b => b.addr === 'E114.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [EM, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, ...silomat.motors]

const main = new Main(drives, [M1, M2])

const views = [main, silomat]

const device = new Device(4, 'SH1', [], lamps, motors, views)

export default { device, drives, positions }
