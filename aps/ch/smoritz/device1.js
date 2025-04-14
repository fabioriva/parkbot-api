import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Lock, Hoisting } from '../../../models/Motor.js'
import { Main, Garage, Silomat } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E7.0')
const IV1 = new Drive(1, 'IV1', EN1)
const drives = [IV1]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A8.7'),
  outputs.find(b => b.addr === 'A8.6')
]

// const RTA = inputs.find(b => b.addr === 'E4.6')
const ASBK = inputs.find(b => b.addr === 'E31.4')
const FSBK = inputs.find(b => b.addr === 'E31.5')
const SBK1 = outputs.find(b => b.addr === 'A28.7')
const SBK2 = outputs.find(b => b.addr === 'A29.4')

const KEXPV = inputs.find(b => b.addr === 'E29.6')
const MNA = inputs.find(b => b.addr === 'E31.0')
const MNB = inputs.find(b => b.addr === 'E31.1')
const EXPV = inputs.find(b => b.addr === 'E31.2')
const EFB = inputs.find(b => b.addr === 'E31.3')

const M1 = new Hoisting(
  0,
  IV1,
  [],
  [ASBK, FSBK, KEXPV, MNA, MNB, EXPV, EFB],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E29.0')
const EOM1 = inputs.find(b => b.addr === 'E29.1')
const EZM1 = inputs.find(b => b.addr === 'E29.2')
const AMM2 = inputs.find(b => b.addr === 'E29.3')
const EOM2 = inputs.find(b => b.addr === 'E29.4')
const EZM2 = inputs.find(b => b.addr === 'E29.5')
const SMA1 = outputs.find(b => b.addr === 'A29.0')
const SMB1 = outputs.find(b => b.addr === 'A29.1')
const SMA2 = outputs.find(b => b.addr === 'A29.2')
const SMB2 = outputs.find(b => b.addr === 'A29.3')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const RMV = inputs.find(b => b.addr === 'E30.0')
const RMH = inputs.find(b => b.addr === 'E30.1')
const RES = inputs.find(b => b.addr === 'E30.2')
const REH = inputs.find(b => b.addr === 'E30.3')
const RCV = inputs.find(b => b.addr === 'E30.4')
const REAV = inputs.find(b => b.addr === 'E30.5')
const REAH = inputs.find(b => b.addr === 'E30.6')
const RCH = inputs.find(b => b.addr === 'E30.7')
const T2 = outputs.find(b => b.addr === 'A28.1')
const TRA = outputs.find(b => b.addr === 'A28.2')
const TRB = outputs.find(b => b.addr === 'A28.3')
const KCS = outputs.find(b => b.addr === 'A28.4')
const KCV = outputs.find(b => b.addr === 'A28.5')
const KCH = outputs.find(b => b.addr === 'A28.6')

const AF8 = inputs.find(b => b.addr === 'E30.0')
const MTC = inputs.find(b => b.addr === 'E30.1')

const silomat = new Silomat(
  IV1,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const FX = inputs.find(b => b.addr === 'E6.1')
const EZ = inputs.find(b => b.addr === 'E10.0')
const EO = inputs.find(b => b.addr === 'E10.1')
const FB = inputs.find(b => b.addr === 'E10.2')
const AP = inputs.find(b => b.addr === 'E6.0')
const KX = outputs.find(b => b.addr === 'A10.6')
const SZ = outputs.find(b => b.addr === 'A4.6')
const SO = outputs.find(b => b.addr === 'A4.7')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX]
)

const motors = [M1, M2, M3, M5, ...silomat.motors]

const L1 = outputs.find(b => b.addr === 'A7.0')
const L2 = outputs.find(b => b.addr === 'A7.1')
const L3 = outputs.find(b => b.addr === 'A7.2')
const L4 = outputs.find(b => b.addr === 'A7.3')
const L5 = outputs.find(b => b.addr === 'A7.4')

const FDR = inputs.find(b => b.addr === 'E10.4')
const FDL = inputs.find(b => b.addr === 'E10.5')
const FLA = inputs.find(b => b.addr === 'E10.6')
const FLP = inputs.find(b => b.addr === 'E11.0')
const FPE = inputs.find(b => b.addr === 'E10.3')
const EPZ = inputs.find(b => b.addr === 'E11.1')
const FTA = inputs.find(b => b.addr === 'E10.7')

const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M5],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA]
)

const views = [main, garage, silomat]

const device = new Device(1, 'EL', [], lamps, motors, views)

const positions = []

export default { device, drives, positions }
