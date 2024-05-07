const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { DoorVFD, Flap, Lock, Hoisting, Rotation } = require('../../../models/Motor')
const { Main, Garage } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E3.0')

const IV1 = new Drive(1, 'IV1', EN1)

const drives = [IV1]

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

// const RTA = inputs.find(b => b.addr === 'E4.6')
const ASBK = inputs.find(b => b.addr === 'E3.3')
const FSBK = inputs.find(b => b.addr === 'E3.2')
const SQA = outputs.find(b => b.addr === 'A0.3')
const SBK1 = outputs.find(b => b.addr === 'A3.3')
const SBK2 = outputs.find(b => b.addr === 'A5.7')

const EXPV = inputs.find(b => b.addr === 'E3.4')
const EFB = inputs.find(b => b.addr === 'E3.5')
const MLE = inputs.find(b => b.addr === 'E3.6')
const KXPV = inputs.find(b => b.addr === 'E8.3')
const FTC = inputs.find(b => b.addr === 'E4.7')

const M1 = new Hoisting(
  0,
  IV1,
  [],
  [ASBK, FSBK, EXPV, EFB, MLE, KXPV, FTC],
  [SQA, SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E1.2')
const EOM1 = inputs.find(b => b.addr === 'E1.3')
const EZM1 = inputs.find(b => b.addr === 'E1.4')
const SMA1 = outputs.find(b => b.addr === 'A4.5')
const SMB1 = outputs.find(b => b.addr === 'A4.6')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])

const AMM2 = inputs.find(b => b.addr === 'E1.5')
const EOM2 = inputs.find(b => b.addr === 'E1.6')
const EZM2 = inputs.find(b => b.addr === 'E1.7')
const SMA2 = outputs.find(b => b.addr === 'A5.5')
const SMB2 = outputs.find(b => b.addr === 'A5.6')

const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const AD = inputs.find(b => b.addr === 'E2.4')
const MDR = inputs.find(b => b.addr === 'E2.0')
const MDL = inputs.find(b => b.addr === 'E2.1')
const EDR = inputs.find(b => b.addr === 'E2.2')
const EDL = inputs.find(b => b.addr === 'E2.3')
const TD = outputs.find(b => b.addr === 'A0.4')
const ASBK2 = inputs.find(b => b.addr === 'E9.0')

const M4 = new Rotation(
  0,
  IV1,
  [],
  [AD, ASBK2, MDR, MDL, EDR, EDL],
  [TD],
  [],
  TD
)

const AMMD = inputs.find(b => b.addr === 'E9.1')
const EOMD = inputs.find(b => b.addr === 'E9.2')
const EZMD = inputs.find(b => b.addr === 'E9.3')
const SMAD = outputs.find(b => b.addr === 'A3.4')
const SMBD = outputs.find(b => b.addr === 'A3.5')

const M5 = new Lock(3, [EZMD, EOMD, AMMD], [SMAD, SMBD])

const ECA = inputs.find(b => b.addr === 'E9.5')
const ECB = inputs.find(b => b.addr === 'E9.6')
const AMC = inputs.find(b => b.addr === 'E9.4')
const SCA = outputs.find(b => b.addr === 'A3.6')
const SCB = outputs.find(b => b.addr === 'A3.7')

const M6 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const EZ = inputs.find(b => b.addr === 'E7.0')
const EO = inputs.find(b => b.addr === 'E7.1')
const FB = inputs.find(b => b.addr === 'E7.2')
const AP = inputs.find(b => b.addr === 'E2.5')
const KX = outputs.find(b => b.addr === 'A0.2')
const SP = outputs.find(b => b.addr === 'A3.2')

const M7 = new DoorVFD(
  0,
  IV1,
  [],
  [EZ, EO, AP, FB, SP, KX],
  [KX],
  [EZ, EO],
  KX
)

const motors = [M1, M2, M3, M4, M5, M6, M7]

const L1 = outputs.find(b => b.addr === 'A1.0')
const L2 = outputs.find(b => b.addr === 'A1.1')
const L3 = outputs.find(b => b.addr === 'A1.2')
const L4 = outputs.find(b => b.addr === 'A1.3')
const L5 = outputs.find(b => b.addr === 'A1.4')

const FDR = inputs.find(b => b.addr === 'E7.1')
const FDL = inputs.find(b => b.addr === 'E7.2')
const FLA = inputs.find(b => b.addr === 'E6.4')
const FLP = inputs.find(b => b.addr === 'E6.5')
const FPE = inputs.find(b => b.addr === 'E6.3')
const EPZ = inputs.find(b => b.addr === 'E6.7')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E6.6')
const FTL3 = inputs.find(b => b.addr === 'E7.6')

const main = new Main(drives, [M1, M2, M3, M4, M5])

const garage = new Garage(
  [],
  [M6, M7],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTL3]
)

const views = [main, garage]

const device = new Device(1, 'EL', [], lamps, motors, views)

module.exports = { device, drives, positions }
