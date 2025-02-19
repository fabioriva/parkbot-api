import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Door, Flap, Lock, Hoisting, Rotation, Traveling } from '../../../models/Motor.js'
import { Position } from '../../../models/Position.js'
import { Main, Garage } from '../../../models/View.js'

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const ENR = new Position(4, 'ENR')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E203.3'),
  outputs.find(b => b.addr === 'A203.7'),
  outputs.find(b => b.addr === 'A203.6')
]

const EN1 = inputs.find(b => b.addr === 'E203.0')
const EN2 = inputs.find(b => b.addr === 'E203.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const RTA = inputs.find(b => b.addr === 'E204.6')
const ASBK = inputs.find(b => b.addr === 'E204.5')
const FSBK = inputs.find(b => b.addr === 'E204.4')
const SBK1 = outputs.find(b => b.addr === 'A200.0')
const SBK2 = outputs.find(b => b.addr === 'A205.5')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E201.0')
const EOM1 = inputs.find(b => b.addr === 'E201.1')
const EZM1 = inputs.find(b => b.addr === 'E201.2')
const AMM2 = inputs.find(b => b.addr === 'E201.3')
const EOM2 = inputs.find(b => b.addr === 'E201.4')
const EZM2 = inputs.find(b => b.addr === 'E201.5')
const AMM3 = inputs.find(b => b.addr === 'E205.0')
const EOM3 = inputs.find(b => b.addr === 'E205.1')
const EZM3 = inputs.find(b => b.addr === 'E205.2')
const AMM4 = inputs.find(b => b.addr === 'E205.3')
const EOM4 = inputs.find(b => b.addr === 'E205.4')
const EZM4 = inputs.find(b => b.addr === 'E205.5')
const SMA1 = outputs.find(b => b.addr === 'A202.0')
const SMB1 = outputs.find(b => b.addr === 'A202.1')
const SMA2 = outputs.find(b => b.addr === 'A202.2')
const SMB2 = outputs.find(b => b.addr === 'A202.3')
const SMA3 = outputs.find(b => b.addr === 'A202.4')
const SMB3 = outputs.find(b => b.addr === 'A202.5')
const SMA4 = outputs.find(b => b.addr === 'A202.6')
const SMB4 = outputs.find(b => b.addr === 'A202.7')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])
const M4 = new Lock(3, [EZM3, EOM3, AMM3], [SMA3, SMB3])
const M5 = new Lock(4, [EZM4, EOM4, AMM4], [SMA4, SMB4])

const ASH = inputs.find(b => b.addr === 'E204.0')
const AKKS = inputs.find(b => b.addr === 'E204.1')
const EXH = inputs.find(b => b.addr === 'E210.4')
const T10 = outputs.find(b => b.addr === 'A200.6')
const T10F = outputs.find(b => b.addr === 'A210.2')

const M6 = new Traveling(
  0,
  IV1,
  [ENH],
  [ASH, AKKS, EXH],
  [T10, T10F],
  [],
  T10
)

// const AD = inputs.find(b => b.addr === 'E26.7')
const ASKD = inputs.find(b => b.addr === 'E210.5')
const EXD = inputs.find(b => b.addr === 'E210.3')
const TD = outputs.find(b => b.addr === 'A200.5')
const TDF = outputs.find(b => b.addr === 'A210.3')

const M7 = new Rotation(
  0,
  IV2,
  [ENR],
  [ASH, ASKD, EXD],
  [TD, TDF],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E210.0')
const ECB = inputs.find(b => b.addr === 'E210.1')
const AMC = inputs.find(b => b.addr === 'E210.2')
const SCA = outputs.find(b => b.addr === 'A210.0')
const SCB = outputs.find(b => b.addr === 'A210.1')

const M8 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E204.2')
const EZ = inputs.find(b => b.addr === 'E206.0')
const EO = inputs.find(b => b.addr === 'E206.1')
const FB = inputs.find(b => b.addr === 'E206.2')
const AP = inputs.find(b => b.addr === 'E203.6')
const KX = outputs.find(b => b.addr === 'A200.3')
const SZ = outputs.find(b => b.addr === 'A205.6')
const SO = outputs.find(b => b.addr === 'A205.7')

const M9 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9]

const L1 = outputs.find(b => b.addr === 'A201.0')
const L2 = outputs.find(b => b.addr === 'A201.1')
const L3 = outputs.find(b => b.addr === 'A201.2')
const L4 = outputs.find(b => b.addr === 'A201.3')
const L5 = outputs.find(b => b.addr === 'A201.4')

const FDL = inputs.find(b => b.addr === 'E206.4')
const FDR = inputs.find(b => b.addr === 'E206.5')
const FLA = inputs.find(b => b.addr === 'E207.2')
const FLP = inputs.find(b => b.addr === 'E207.1')
const FPE = inputs.find(b => b.addr === 'E206.3')
const EPZ = inputs.find(b => b.addr === 'E211.4')
// const FRER = inputs.find(b => b.addr === 'E211.5')
const FTA1 = inputs.find(b => b.addr === 'E206.6')
const FTA2 = inputs.find(b => b.addr === 'E206.7')

const main = new Main(drives, [M1, M2, M3, M4, M5, M6, M7])

const garage = new Garage(
  [],
  [M8, M9],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [main, garage]

const device = new Device(2, 'EL2', [], lamps, motors, views)

export default { device, drives, positions }
