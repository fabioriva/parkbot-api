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
  inputs.find(b => b.addr === 'E1.0'),
  outputs.find(b => b.addr === 'A10.5'),
  outputs.find(b => b.addr === 'A10.4')
]

const EN1 = inputs.find(b => b.addr === 'E10.5')
const IV1 = new Drive(1, 'IV1', EN1)
const EN2 = inputs.find(b => b.addr === 'E17.7')
const IV2 = new Drive(1, 'IV2', EN2)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E10.3')
const ASBK = inputs.find(b => b.addr === 'E10.2')
const RTA = inputs.find(b => b.addr === 'E10.1')
const SBK1 = outputs.find(b => b.addr === 'A10.0')
const SBK2 = outputs.find(b => b.addr === 'A10.1')
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
const AMM1 = inputs.find(b => b.addr === 'E14.1')
const EOM1 = inputs.find(b => b.addr === 'E14.6')
const EZM1 = inputs.find(b => b.addr === 'E14.7')
const SMA1 = outputs.find(b => b.addr === 'A14.0')
const SMB1 = outputs.find(b => b.addr === 'A14.1')
const M2 = new Lock(
  0,
  [EZM1, EOM1, AMM1],
  [SMA1, SMB1]
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E14.2')
const ASH = inputs.find(b => b.addr === 'E18.6')
const T101 = outputs.find(b => b.addr === 'A18.2')
const T102 = outputs.find(b => b.addr === 'A18.3')
const T10F = outputs.find(b => b.addr === 'A17.1')
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
const RMV = inputs.find(b => b.addr === 'E19.0')
const RMH = inputs.find(b => b.addr === 'E19.1')
const RES = inputs.find(b => b.addr === 'E19.2')
const REH = inputs.find(b => b.addr === 'E19.3')
const RCV = inputs.find(b => b.addr === 'E19.4')
const REAV = inputs.find(b => b.addr === 'E19.5')
const REAH = inputs.find(b => b.addr === 'E19.6')
const RCH = inputs.find(b => b.addr === 'E19.7')
const T2 = outputs.find(b => b.addr === 'A18.4')
const TRA = outputs.find(b => b.addr === 'A17.3')
const TRB = outputs.find(b => b.addr === 'A17.4')
const KCS = outputs.find(b => b.addr === 'A17.6')
const KCV = outputs.find(b => b.addr === 'A17.7')
const KCH = outputs.find(b => b.addr === 'A18.0')

const AF8 = inputs.find(b => b.addr === 'E18.0')
const MTC = inputs.find(b => b.addr === 'E18.1')

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
