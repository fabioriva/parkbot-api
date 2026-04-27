import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Lock, Hoisting, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH = new Position(3, 'LH')
const positions = [LV1, LV2, LH]

const lamps = [
  inputs.find(b => b.addr === 'E210.4'),
  outputs.find(b => b.addr === 'A200.5'),
  outputs.find(b => b.addr === 'A200.4')
]

const EN1 = inputs.find(b => b.addr === 'E200.5')
const IV1 = new Drive(1, 'IV1', EN1)
const EN2 = inputs.find(b => b.addr === 'E213.7')
const IV2 = new Drive(2, 'IV2', EN2)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E200.3')
const ASBK = inputs.find(b => b.addr === 'E200.2')
const RTA = inputs.find(b => b.addr === 'E200.1')
const SBK1 = outputs.find(b => b.addr === 'A200.0')
const SBK2 = outputs.find(b => b.addr === 'A200.1')
const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Lock
 */
const AMM1 = inputs.find(b => b.addr === 'E210.1')
const EOM1 = inputs.find(b => b.addr === 'E210.6')
const EZM1 = inputs.find(b => b.addr === 'E210.7')
const SMA1 = outputs.find(b => b.addr === 'A210.0')
const SMB1 = outputs.find(b => b.addr === 'A210.1')
const M2 = new Lock(
  0,
  [EZM1, EOM1, AMM1],
  [SMA1, SMB1]
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E210.2')
const ASH = inputs.find(b => b.addr === 'E213.6')
const T101 = outputs.find(b => b.addr === 'A214.2')
const T102 = outputs.find(b => b.addr === 'A214.3')
const T10F = outputs.find(b => b.addr === 'A213.1')
const M3 = new Traveling(
  0,
  IV2,
  [LH],
  [AH, ASH],
  [T101, T102, T10F],
  [],
  T10F
)

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E215.0')
const RMH = inputs.find(b => b.addr === 'E215.1')
const RES = inputs.find(b => b.addr === 'E215.2')
const REH = inputs.find(b => b.addr === 'E215.3')
const RCV = inputs.find(b => b.addr === 'E215.4')
const REAV = inputs.find(b => b.addr === 'E215.5')
const REAH = inputs.find(b => b.addr === 'E215.6')
const RCH = inputs.find(b => b.addr === 'E215.7')
const T2 = outputs.find(b => b.addr === 'A214.4')
const TRA = outputs.find(b => b.addr === 'A213.3')
const TRB = outputs.find(b => b.addr === 'A213.4')
const KCS = outputs.find(b => b.addr === 'A213.6')
const KCV = outputs.find(b => b.addr === 'A213.7')
const KCH = outputs.find(b => b.addr === 'A214.0')

const AF8 = inputs.find(b => b.addr === 'E214.0')
const MTC = inputs.find(b => b.addr === 'E214.1')

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

const device = new Device(2, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
