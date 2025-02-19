import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Rotation, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E13.0')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const ENR = new Position(2, 'ENR')
const positions = [LH1, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E13.3'),
  outputs.find(b => b.addr === 'A11.7'),
  outputs.find(b => b.addr === 'A11.6')
]

const AD = inputs.find(b => b.addr === 'E11.4')
const EXD = inputs.find(b => b.addr === 'E13.7')
const TD = outputs.find(b => b.addr === 'A11.5')
const ASBK2 = inputs.find(b => b.addr === 'E11.3')

const M1 = new Rotation(
  0,
  IV1,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const AH = inputs.find(b => b.addr === 'E11.3')
const EHP = inputs.find(b => b.addr === 'E13.6')
const T10 = outputs.find(b => b.addr === 'A11.0')

const M2 = new Traveling(
  0,
  IV1,
  [LH1],
  [AH, ASBK2, EHP],
  [T10],
  [],
  T10
)

const RMV = inputs.find(b => b.addr === 'E12.0')
const RMH = inputs.find(b => b.addr === 'E12.1')
const RES = inputs.find(b => b.addr === 'E12.2')
const REH = inputs.find(b => b.addr === 'E12.3')
const RCV = inputs.find(b => b.addr === 'E12.4')
const REAV = inputs.find(b => b.addr === 'E12.5')
const REAH = inputs.find(b => b.addr === 'E12.6')
const RCH = inputs.find(b => b.addr === 'E12.7')
const T2 = outputs.find(b => b.addr === 'A11.1')
const TRA = outputs.find(b => b.addr === 'A11.2')
const TRB = outputs.find(b => b.addr === 'A11.3')
const KCS = outputs.find(b => b.addr === 'A10.2')
const KCV = outputs.find(b => b.addr === 'A10.3')
const KCH = outputs.find(b => b.addr === 'A10.4')

const AF8 = inputs.find(b => b.addr === 'E11.6')
const MTC = inputs.find(b => b.addr === 'E11.5')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1]

const motors = [M1, M2, ...silomat.motors]

const main = new Main(drives, [M1, M2])

const views = [main, silomat]

const device = new Device(1, 'SH1', [], lamps, motors, views)

export default { device, drives, positions }
