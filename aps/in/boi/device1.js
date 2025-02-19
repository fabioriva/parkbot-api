import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import {
  Door,
  Flap,
  Lock,
  Hoisting,
  Rotation
} from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E10.0')
const EN2 = inputs.find(b => b.addr === 'E18.7')
const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E10.1'),
  outputs.find(b => b.addr === 'A10.5'),
  outputs.find(b => b.addr === 'A10.4')
]

const RTA = inputs.find(b => b.addr === 'E10.4')
const ASBK = inputs.find(b => b.addr === 'E10.3')
const FSBK = inputs.find(b => b.addr === 'E10.2')
const SBK1 = outputs.find(b => b.addr === 'A10.0')
const SBK2 = outputs.find(b => b.addr === 'A10.1')

const M1 = new Hoisting(
  0,
  IV1,
  [LV],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E19.5')
const EOM = inputs.find(b => b.addr === 'E19.6')
const EZM = inputs.find(b => b.addr === 'E19.7')
const SMA = outputs.find(b => b.addr === 'A16.5')
const SMB = outputs.find(b => b.addr === 'A16.6')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AD = inputs.find(b => b.addr === 'E18.0')
const ASBK2 = inputs.find(b => b.addr === 'E20.0')
const EXD = inputs.find(b => b.addr === 'E19.3')
const TD = outputs.find(b => b.addr === 'A16.7')
const TDF = outputs.find(b => b.addr === 'A16.2')

const M3 = new Rotation(
  0,
  IV2,
  [ENR],
  [AD, ASBK2, EXD],
  [TD, TDF],
  [],
  TD
)

const AMMD = inputs.find(b => b.addr === 'E16.0')
const EOMD = inputs.find(b => b.addr === 'E16.1')
const EZMD = inputs.find(b => b.addr === 'E16.2')
const SMAD = outputs.find(b => b.addr === 'A13.3')
const SMBD = outputs.find(b => b.addr === 'A13.4')

const M4 = new Lock(0, [EZMD, EOMD, AMMD], [SMAD, SMBD])

const ECA = inputs.find(b => b.addr === 'E18.2')
const ECB = inputs.find(b => b.addr === 'E18.3')
const AMC = inputs.find(b => b.addr === 'E18.4')
const SCA = outputs.find(b => b.addr === 'A16.0')
const SCB = outputs.find(b => b.addr === 'A16.1')

const M5 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const AP = inputs.find(b => b.addr === 'E13.2')
const EZ = inputs.find(b => b.addr === 'E14.0')
const EO = inputs.find(b => b.addr === 'E14.1')
const FB = inputs.find(b => b.addr === 'E14.2')
const SZ = outputs.find(b => b.addr === 'A15.1')
const SO = outputs.find(b => b.addr === 'A15.2')
const KX = outputs.find(b => b.addr === 'A14.6')

const M6 = new Door(
  0,
  [EZ, EO, AP, FB],
  [SZ, SO, KX]
)

const RMV = inputs.find(b => b.addr === 'E21.0')
const RMH = inputs.find(b => b.addr === 'E21.1')
const RES = inputs.find(b => b.addr === 'E21.2')
const REH = inputs.find(b => b.addr === 'E21.3')
const RCV = inputs.find(b => b.addr === 'E21.4')
const REAV = inputs.find(b => b.addr === 'E21.5')
const REAH = inputs.find(b => b.addr === 'E21.6')
const RCH = inputs.find(b => b.addr === 'E21.7')
const T2 = outputs.find(b => b.addr === 'A17.0')
const TRA = outputs.find(b => b.addr === 'A17.1')
const TRB = outputs.find(b => b.addr === 'A17.2')
const KCS = outputs.find(b => b.addr === 'A17.3')
const KCV = outputs.find(b => b.addr === 'A17.4')
const KCH = outputs.find(b => b.addr === 'A17.5')

const AF8 = inputs.find(b => b.addr === 'E11.6')
const MTC = inputs.find(b => b.addr === 'E18.1')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, ...silomat.motors]

const main = new Main(drives, [M1, M2, M3, M4, M5, M6])

const views = [main, silomat]

const device = new Device(1, 'EL1', [], lamps, motors, views)

export default { device, drives, positions }
