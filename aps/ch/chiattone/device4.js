const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap, Lock, Hoisting } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E4.3')

const IV1 = new Drive(1, 'IV1', EN1)

const drives = [IV1]

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E3.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const RTA = inputs.find(b => b.addr === 'E4.6')
const ASBK = inputs.find(b => b.addr === 'E4.5')
const FSBK = inputs.find(b => b.addr === 'E4.4')
const SBK1 = outputs.find(b => b.addr === 'A0.2')
const SBK2 = outputs.find(b => b.addr === 'A35')

const KEXPV1 = inputs.find(b => b.addr === 'E2.0')
const KEXPV2 = inputs.find(b => b.addr === 'E2.4')
const FTC = inputs.find(b => b.addr === 'E2.3')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, KEXPV1, KEXPV2, FTC],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E5.2')
const EOM1 = inputs.find(b => b.addr === 'E5.0')
const EZM1 = inputs.find(b => b.addr === 'E5.1')
const AMM2 = inputs.find(b => b.addr === 'E5.5')
const EOM2 = inputs.find(b => b.addr === 'E5.3')
const EZM2 = inputs.find(b => b.addr === 'E5.4')
const SMA1 = outputs.find(b => b.addr === 'A2.0')
const SMB1 = outputs.find(b => b.addr === 'A2.1')
const SMA2 = outputs.find(b => b.addr === 'A2.2')
const SMB2 = outputs.find(b => b.addr === 'A2.3')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])

const ECA = inputs.find(b => b.addr === 'E3.2')
const ECB = inputs.find(b => b.addr === 'E3.0')
const AMC = inputs.find(b => b.addr === 'E3.1')
const SCA = outputs.find(b => b.addr === 'A2.4')
const SCB = outputs.find(b => b.addr === 'A2.5')

const M4 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E3.6')
const EZ = inputs.find(b => b.addr === 'E6.0')
const EO = inputs.find(b => b.addr === 'E6.1')
const FB = inputs.find(b => b.addr === 'E6.2')
const AP = inputs.find(b => b.addr === 'E3.7')
const KX = outputs.find(b => b.addr === 'A0.3')
const SZ = outputs.find(b => b.addr === 'A0.4')
const SO = outputs.find(b => b.addr === 'A0.5')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX]
)

const motors = [M1, M2, M3, M4, M5]

const L1 = outputs.find(b => b.addr === 'A1.0')
const L2 = outputs.find(b => b.addr === 'A1.1')
const L3 = outputs.find(b => b.addr === 'A1.2')
const L4 = outputs.find(b => b.addr === 'A1.3')
const L5 = outputs.find(b => b.addr === 'A1.4')

const FDR = inputs.find(b => b.addr === 'E6.4')
const FDL = inputs.find(b => b.addr === 'E6.5')
const FLA = inputs.find(b => b.addr === 'E7.1')
const FLP = inputs.find(b => b.addr === 'E7.0')
const FPE = inputs.find(b => b.addr === 'E6.3')
const EPZ = inputs.find(b => b.addr === 'E7.5')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E6.6')
const FTA2 = inputs.find(b => b.addr === 'E8.0')
const FTA3 = inputs.find(b => b.addr === 'E8.3')
const FDR1 = inputs.find(b => b.addr === 'E5.6')
const FDL1 = inputs.find(b => b.addr === 'E5.7')
const FDR2 = inputs.find(b => b.addr === 'E8.1')
const FDL2 = inputs.find(b => b.addr === 'E8.2')
const FDR3 = inputs.find(b => b.addr === 'E8.4')
const FDL3 = inputs.find(b => b.addr === 'E8.5')

const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M4, M5],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FDL1, FDR1, FDL2, FDR2, FDL3, FDR3]
)

const views = [main, garage]

const device = new Device(4, 'EL', [], lamps, motors, views)

module.exports = { device, drives, positions }
