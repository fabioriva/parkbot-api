const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Door, Flap, Lock, Hoisting } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Garage } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E103.0')

const IV1 = new Drive(1, 'IV1', EN1)

const drives = [IV1]

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E101.4'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const RTA = inputs.find(b => b.addr === 'E103.6')
const ASBK = inputs.find(b => b.addr === 'E103.5')
const FSBK = inputs.find(b => b.addr === 'E103.4')
const SBK1 = outputs.find(b => b.addr === 'A104.7')
const SBK2 = outputs.find(b => b.addr === 'A105.7')

const KEXPV1 = inputs.find(b => b.addr === 'E105.7')
const KEXPV2 = inputs.find(b => b.addr === 'E109.7')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK, KEXPV1, KEXPV2],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E109.0')
const EOM = inputs.find(b => b.addr === 'E104.0')
const EZM = inputs.find(b => b.addr === 'E104.1')
const SMA = outputs.find(b => b.addr === 'A105.0')
const SMB = outputs.find(b => b.addr === 'A105.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const ECA = inputs.find(b => b.addr === 'E104.4')
const ECB = inputs.find(b => b.addr === 'E104.5')
const AMC = inputs.find(b => b.addr === 'E109.2')
const SCA = outputs.find(b => b.addr === 'A105.4')
const SCB = outputs.find(b => b.addr === 'A105.5')

const M3 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E108.0')
const EZ = inputs.find(b => b.addr === 'E106.0')
const EO = inputs.find(b => b.addr === 'E106.1')
const FB = inputs.find(b => b.addr === 'E106.2')
const AP = inputs.find(b => b.addr === 'E109.3')
const KX = outputs.find(b => b.addr === 'A106.3')
const SP = outputs.find(b => b.addr === 'A106.0')
const SZ = outputs.find(b => b.addr === 'A106.1')
const SO = outputs.find(b => b.addr === 'A106.2')

const M4 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX, SP]
)

const motors = [M1, M2, M3, M4]

const L1 = outputs.find(b => b.addr === 'A102.0')
const L2 = outputs.find(b => b.addr === 'A102.1')
const L3 = outputs.find(b => b.addr === 'A102.2')
const L4 = outputs.find(b => b.addr === 'A102.3')
const L5 = outputs.find(b => b.addr === 'A102.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const EPZ = inputs.find(b => b.addr === 'E104.6')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E106.6')
const FTA2 = inputs.find(b => b.addr === 'E106.7')
const FLP1 = inputs.find(b => b.addr === 'E107.1')

// const FDL1 = inputs.find(b => b.addr === 'E108.1')
// const FDR1 = inputs.find(b => b.addr === 'E108.2')
// const FTA3 = inputs.find(b => b.addr === 'E108.3')

const main = new Main(drives, [M1, M2])

const garage = new Garage(
  [],
  [M3, M4],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FLP1]
)

const views = [main, garage]

const device = new Device(1, 'ELA', [], lamps, motors, views)

module.exports = { device, drives, positions }
