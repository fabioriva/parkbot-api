import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { ActionPP } from '../../../models/Action.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

/**
 * Action for step by step
 */
const A0 = new ActionPP('action-pp', merkers.find(b => b.addr === 'M7.3'), 5, 1, def.STALLS, [
  { id: 1, key: 'E', value: '0', tooltip: 'send SH to stall' },
  { id: 2, key: 'D', value: '0', tooltip: 'send SH to stall + Silomat cycle' }
])

const A1 = new ActionPP('action-pp-reset', merkers.find(b => b.addr === 'M2.3'), 1, 1, 7, [
  { id: 1, key: 'A', value: '0', tooltip: 'reset PP' }
])

const EN1 = inputs.find(b => b.addr === 'E1303.0')

const IV1 = new Drive(1, 'IV1', EN1)

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1301.4'),
  outputs.find(b => b.addr === 'A1301.7'),
  outputs.find(b => b.addr === 'A1301.6')
]

const AH = inputs.find(b => b.addr === 'E1304.4')
const EXPH = inputs.find(b => b.addr === 'E1302.2')
const T101 = outputs.find(b => b.addr === 'A1301.0')
const T102 = outputs.find(b => b.addr === 'A1301.1')
const T10F = outputs.find(b => b.addr === 'A1302.7')

const M1 = new Traveling(
  0,
  IV1,
  [LH1, LH2],
  [AH, EXPH],
  [T101, T102, T10F],
  [],
  T10F
)

const RMV = inputs.find(b => b.addr === 'E1305.0')
const RMH = inputs.find(b => b.addr === 'E1305.1')
const RES = inputs.find(b => b.addr === 'E1305.2')
const REH = inputs.find(b => b.addr === 'E1305.3')
const RCV = inputs.find(b => b.addr === 'E1305.4')
const REAV = inputs.find(b => b.addr === 'E1305.5')
const REAH = inputs.find(b => b.addr === 'E1305.6')
const RCH = inputs.find(b => b.addr === 'E1305.7')
const T2 = outputs.find(b => b.addr === 'A1302.0')
const TRA = outputs.find(b => b.addr === 'A1302.1')
const TRB = outputs.find(b => b.addr === 'A1302.2')
const KCS = outputs.find(b => b.addr === 'A1302.3')
const KCV = outputs.find(b => b.addr === 'A1302.4')
const KCH = outputs.find(b => b.addr === 'A1302.5')

const AF8 = inputs.find(b => b.addr === 'E1303.2')
const MTC = inputs.find(b => b.addr === 'E1304.7')

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

const device = new Device(8, 'SH4', [A0, A1], lamps, motors, views)

export default { device, drives, positions }
