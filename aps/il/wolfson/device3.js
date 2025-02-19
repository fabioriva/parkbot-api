import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting } from '../../../models/Motor.js'
import { Main, Garage } from '../../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E201.4'),
  outputs.find(b => b.addr === 'A201.7'),
  outputs.find(b => b.addr === 'A201.6')
]

const EN1 = inputs.find(b => b.addr === 'E203.0')

const IV1 = new Drive(1, 'IV1', EN1)

const drives = [IV1]

const RTA = inputs.find(b => b.addr === 'E208.6')
const ASBK = inputs.find(b => b.addr === 'E208.5')
const FSBK = inputs.find(b => b.addr === 'E208.4')
const SBK1 = outputs.find(b => b.addr === 'A202.6')
const SBK2 = outputs.find(b => b.addr === 'A203.6')

// const EFB = inputs.find(b => b.addr === 'E205.1')
// const MNA = inputs.find(b => b.addr === 'E205.5')
// const MNB = inputs.find(b => b.addr === 'E205.6')
// const KEXPV1 = inputs.find(b => b.addr === 'E205.7')
// const KEXPV2 = inputs.find(b => b.addr === 'E209.7')

const M1 = new Hoisting(
  0,
  IV1,
  [],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E209.0')
const EOM1 = inputs.find(b => b.addr === 'E204.0')
const EZM1 = inputs.find(b => b.addr === 'E204.1')
const AMM2 = inputs.find(b => b.addr === 'E209.1')
const EOM2 = inputs.find(b => b.addr === 'E204.2')
const EZM2 = inputs.find(b => b.addr === 'E204.3')
const SMA1 = outputs.find(b => b.addr === 'A203.0')
const SMB1 = outputs.find(b => b.addr === 'A203.1')
const SMA2 = outputs.find(b => b.addr === 'A203.2')
const SMB2 = outputs.find(b => b.addr === 'A203.3')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const ECA = inputs.find(b => b.addr === 'E204.4')
const ECB = inputs.find(b => b.addr === 'E204.5')
const AMC = inputs.find(b => b.addr === 'E209.2')
const SCA = outputs.find(b => b.addr === 'A203.4')
const SCB = outputs.find(b => b.addr === 'A203.5')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E208.0')
const EZ = inputs.find(b => b.addr === 'E206.0')
const EO = inputs.find(b => b.addr === 'E206.1')
const FB = inputs.find(b => b.addr === 'E206.2')
const AP = inputs.find(b => b.addr === 'E209.3')
const KX = outputs.find(b => b.addr === 'A206.3')
const SZ = outputs.find(b => b.addr === 'A206.1')
const SO = outputs.find(b => b.addr === 'A206.2')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX]
)

const motors = [M1, M2, M3, M4, M5]

const L1 = outputs.find(b => b.addr === 'A204.0')
const L2 = outputs.find(b => b.addr === 'A204.1')
const L3 = outputs.find(b => b.addr === 'A204.2')
const L4 = outputs.find(b => b.addr === 'A204.3')
const L5 = outputs.find(b => b.addr === 'A204.4')

const FDL = inputs.find(b => b.addr === 'E206.4')
const FDR = inputs.find(b => b.addr === 'E206.5')
const FLA = inputs.find(b => b.addr === 'E207.2')
const FLP = inputs.find(b => b.addr === 'E207.0')
const FPE = inputs.find(b => b.addr === 'E206.3')
const EPZ = inputs.find(b => b.addr === 'E204.6')
// const FRE2 = inputs.find(b => b.addr === 'E204.6')
// const FRE2 = inputs.find(b => b.addr === 'E204.7')
const FTA1 = inputs.find(b => b.addr === 'E206.6')
const FTA2 = inputs.find(b => b.addr === 'E206.7')
const FDL1 = inputs.find(b => b.addr === 'E208.1')
const FDR1 = inputs.find(b => b.addr === 'E208.2')
const FTA3 = inputs.find(b => b.addr === 'E208.3')

const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M4, M5],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FDL1, FDR1]
)

const views = [main, garage]

const device = new Device(3, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
