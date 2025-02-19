import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Hoisting,
  Rotation,
  Traveling
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E3.0')
const EN2 = inputs.find(b => b.addr === 'E3.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const RTA = inputs.find(b => b.addr === 'E3.3')
const ASBK = inputs.find(b => b.addr === 'E13.2')
const FSBK = inputs.find(b => b.addr === 'E13.1')
const SBK1 = outputs.find(b => b.addr === 'A11.4')
const SBK2 = outputs.find(b => b.addr === 'A12.6')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AIV = inputs.find(b => b.addr === 'E3.4')
const AKKU = inputs.find(b => b.addr === 'E3.6')
const ASBK2 = inputs.find(b => b.addr === 'E13.3')

const AD = inputs.find(b => b.addr === 'E13.5')
const EXD = inputs.find(b => b.addr === 'E11.1')
const TD = outputs.find(b => b.addr === 'A11.2')

const M2 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, AIV, AKKU, EXD],
  [TD],
  [],
  TD
)

const AH = inputs.find(b => b.addr === 'E13.4')
const EHP = inputs.find(b => b.addr === 'E11.2')
const T10 = outputs.find(b => b.addr === 'A11.0')
const T10F = outputs.find(b => b.addr === 'A12.7')

const M3 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, ASBK2, AIV, AKKU, EHP],
  [T10, T10F],
  [],
  T10
)

const RMV = inputs.find(b => b.addr === 'E14.0')
const RMH = inputs.find(b => b.addr === 'E14.1')
const RES = inputs.find(b => b.addr === 'E14.2')
const REH = inputs.find(b => b.addr === 'E14.3')
const RCV = inputs.find(b => b.addr === 'E14.4')
const REAV = inputs.find(b => b.addr === 'E14.5')
const REAH = inputs.find(b => b.addr === 'E14.6')
const RCH = inputs.find(b => b.addr === 'E14.7')
const T2 = outputs.find(b => b.addr === 'A12.0')
const TRA = outputs.find(b => b.addr === 'A12.1')
const TRB = outputs.find(b => b.addr === 'A12.2')
const KCS = outputs.find(b => b.addr === 'A12.3')
const KCV = outputs.find(b => b.addr === 'A12.4')
const KCH = outputs.find(b => b.addr === 'A12.5')

const AF8 = inputs.find(b => b.addr === 'E3.5')
const MTC = inputs.find(b => b.addr === 'E13.7')

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

const device = new Device(1, 'T', [], lamps, motors, views)

export default { device, drives, positions }
