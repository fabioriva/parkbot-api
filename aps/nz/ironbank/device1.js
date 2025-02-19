import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Lock, Hoisting, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E23.3'),
  outputs.find(b => b.addr === 'A21.7'),
  outputs.find(b => b.addr === 'A21.6')
]

const EN1 = inputs.find(b => b.addr === 'E23.0')
const EN2 = inputs.find(b => b.addr === 'E23.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E25.3')
const ASBK = inputs.find(b => b.addr === 'E25.4')
const RTA = inputs.find(b => b.addr === 'E25.5')
const EXV = inputs.find(b => b.addr === 'E25.2')
const EXPV = inputs.find(b => b.addr === 'E24.3')
const SBK1 = outputs.find(b => b.addr === 'A20.1')
const SBK2 = outputs.find(b => b.addr === 'A21.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, EXV, EXPV],
  [SBK1, SBK2],
  [],
  FSBK
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E24.6')
const EFR = inputs.find(b => b.addr === 'E24.0')
const EFL = inputs.find(b => b.addr === 'E24.1')
const EHP = inputs.find(b => b.addr === 'E24.2')
const T10 = outputs.find(b => b.addr === 'A23.0')
const T10F = outputs.find(b => b.addr === 'A21.2')

const M2 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, EFR, EFL, EHP],
  [T10, T10F],
  [],
  T10F
)

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E21.2')
const EZM = inputs.find(b => b.addr === 'E21.3')
const AMM = inputs.find(b => b.addr === 'E25.7')
const SMA = outputs.find(b => b.addr === 'A20.2')
const SMB = outputs.find(b => b.addr === 'A20.3')

const M3 = new Lock(
  0,
  [EZM, EOM, AMM],
  [SMA, SMB]
)

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E22.0')
const RMH = inputs.find(b => b.addr === 'E22.1')
const RES = inputs.find(b => b.addr === 'E22.2')
const REH = inputs.find(b => b.addr === 'E22.3')
const RCV = inputs.find(b => b.addr === 'E22.4')
const REAV = inputs.find(b => b.addr === 'E22.5')
const REAH = inputs.find(b => b.addr === 'E22.6')
const RCH = inputs.find(b => b.addr === 'E22.7')
const T2 = outputs.find(b => b.addr === 'A23.1')
const TRA = outputs.find(b => b.addr === 'A23.2')
const TRB = outputs.find(b => b.addr === 'A23.3')
const KCS = outputs.find(b => b.addr === 'A23.4')
const KCV = outputs.find(b => b.addr === 'A23.5')
const KCH = outputs.find(b => b.addr === 'A23.6')

const MTC = inputs.find(b => b.addr === 'E24.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [MTC, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3])

const views = [main, silomat]

const device = new Device(1, 'T1', [], lamps, motors, views)

export default { device, drives, positions }
