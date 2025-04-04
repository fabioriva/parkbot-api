import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Rotation, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E403.0')
const EN2 = inputs.find(b => b.addr === 'E403.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const ENR = new Position(3, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E401.4'),
  outputs.find(b => b.addr === 'A401.7'),
  outputs.find(b => b.addr === 'A401.6')
]

const AD = inputs.find(b => b.addr === 'E404.5')
const EXD = inputs.find(b => b.addr === 'E402.0')
const TD = outputs.find(b => b.addr === 'A401.2')
const ASBK2 = inputs.find(b => b.addr === 'E404.3')

const M1 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD],
  [],
  TD
)

const AH = inputs.find(b => b.addr === 'E404.4')
const EHP = inputs.find(b => b.addr === 'E402.2')
const T10 = outputs.find(b => b.addr === 'A401.0')

const M2 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, ASBK2, EHP],
  [T10],
  [],
  T10
)

const RMV = inputs.find(b => b.addr === 'E405.0')
const RMH = inputs.find(b => b.addr === 'E405.1')
const RES = inputs.find(b => b.addr === 'E405.2')
const REH = inputs.find(b => b.addr === 'E405.3')
const RCV = inputs.find(b => b.addr === 'E405.4')
const REAV = inputs.find(b => b.addr === 'E405.5')
const REAH = inputs.find(b => b.addr === 'E405.6')
const RCH = inputs.find(b => b.addr === 'E405.7')
const T2 = outputs.find(b => b.addr === 'A402.0')
const TRA = outputs.find(b => b.addr === 'A402.1')
const TRB = outputs.find(b => b.addr === 'A402.2')
const KCS = outputs.find(b => b.addr === 'A402.3')
const KCV = outputs.find(b => b.addr === 'A402.4')
const KCH = outputs.find(b => b.addr === 'A402.5')

const AF8 = inputs.find(b => b.addr === 'E403.2')
const MTC = inputs.find(b => b.addr === 'E404.7')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, ...silomat.motors]

const main = new Main(drives, [M1, M2])

const views = [main, silomat]

const device = new Device(4, 'SH2', [], lamps, motors, views)

export default { device, drives, positions }
