const { inputs, outputs } = require('./obj')
const { Device, DeviceView } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Door, Flap, Garage, Panel, Lock, Hoisting, Rotation, Traveling } = require('../../models/Motor')
const { Position } = require('../../models/Position')

const device = new Device(1, 'EL1')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const ENR = new Position(4, 'ENR')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A103.7'),
  outputs.find(b => b.addr === 'A103.6')
]

const EN1 = inputs.find(b => b.addr === 'E103.0')
const EN2 = inputs.find(b => b.addr === 'E103.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const RTA = inputs.find(b => b.addr === 'E104.6')
const ASBK = inputs.find(b => b.addr === 'E104.5')
const FSBK = inputs.find(b => b.addr === 'E104.4')
const SBK1 = outputs.find(b => b.addr === 'A100.0')
const SBK2 = outputs.find(b => b.addr === 'A105.5')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM1 = inputs.find(b => b.addr === 'E101.0')
const EOM1 = inputs.find(b => b.addr === 'E101.1')
const EZM1 = inputs.find(b => b.addr === 'E101.2')
const AMM2 = inputs.find(b => b.addr === 'E101.3')
const EOM2 = inputs.find(b => b.addr === 'E101.4')
const EZM2 = inputs.find(b => b.addr === 'E101.5')
const AMM3 = inputs.find(b => b.addr === 'E105.0')
const EOM3 = inputs.find(b => b.addr === 'E105.1')
const EZM3 = inputs.find(b => b.addr === 'E105.2')
const AMM4 = inputs.find(b => b.addr === 'E105.3')
const EOM4 = inputs.find(b => b.addr === 'E105.4')
const EZM4 = inputs.find(b => b.addr === 'E105.5')
const SMA1 = outputs.find(b => b.addr === 'A102.0')
const SMB1 = outputs.find(b => b.addr === 'A102.1')
const SMA2 = outputs.find(b => b.addr === 'A102.2')
const SMB2 = outputs.find(b => b.addr === 'A102.3')
const SMA3 = outputs.find(b => b.addr === 'A102.4')
const SMB3 = outputs.find(b => b.addr === 'A102.5')
const SMA4 = outputs.find(b => b.addr === 'A102.6')
const SMB4 = outputs.find(b => b.addr === 'A102.7')

const M2 = new Lock(1, [EZM1, EOM1, AMM1], [SMA1, SMB1])
const M3 = new Lock(2, [EZM2, EOM2, AMM2], [SMA2, SMB2])
const M4 = new Lock(3, [EZM3, EOM3, AMM3], [SMA3, SMB3])
const M5 = new Lock(4, [EZM4, EOM4, AMM4], [SMA4, SMB4])

const ASH = inputs.find(b => b.addr === 'E104.0')
const AKKS = inputs.find(b => b.addr === 'E104.1')
const EXH = inputs.find(b => b.addr === 'E110.4')
const T10 = outputs.find(b => b.addr === 'A100.6')
const T10F = outputs.find(b => b.addr === 'A110.2')

const M6 = new Traveling(
  0,
  IV1,
  [ENH],
  [ASH, AKKS, EXH],
  [T10, T10F],
  [],
  T10
)

// const AD = inputs.find(b => b.addr === 'E16.7')
const ASKD = inputs.find(b => b.addr === 'E110.5')
const EXD = inputs.find(b => b.addr === 'E110.3')
const TD = outputs.find(b => b.addr === 'A100.5')
const TDF = outputs.find(b => b.addr === 'A110.3')

const M7 = new Rotation(
  0,
  IV2,
  [ENR],
  [ASH, ASKD, EXD],
  [TD, TDF],
  [],
  TD
)

const ECA = inputs.find(b => b.addr === 'E110.0')
const ECB = inputs.find(b => b.addr === 'E110.1')
const AMC = inputs.find(b => b.addr === 'E110.2')
const SCA = outputs.find(b => b.addr === 'A110.0')
const SCB = outputs.find(b => b.addr === 'A110.1')

const M8 = new Flap(
  0,
  [ECA, ECB, AMC],
  [SCA, SCB]
)

const FX = inputs.find(b => b.addr === 'E104.2')
const EZ = inputs.find(b => b.addr === 'E106.0')
const EO = inputs.find(b => b.addr === 'E106.1')
const FB = inputs.find(b => b.addr === 'E106.2')
const AP = inputs.find(b => b.addr === 'E103.6')
const KX = outputs.find(b => b.addr === 'A100.3')
const SZ = outputs.find(b => b.addr === 'A105.6')
const SO = outputs.find(b => b.addr === 'A105.7')

const M9 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, KX]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9]

const L1 = outputs.find(b => b.addr === 'A101.0')
const L2 = outputs.find(b => b.addr === 'A101.1')
const L3 = outputs.find(b => b.addr === 'A101.2')
const L4 = outputs.find(b => b.addr === 'A101.3')
const L5 = outputs.find(b => b.addr === 'A101.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.1')
const FPE = inputs.find(b => b.addr === 'E106.3')
const FRE = inputs.find(b => b.addr === 'E111.4')
const FRER = inputs.find(b => b.addr === 'E111.5')
const FT1 = inputs.find(b => b.addr === 'E106.6')
const FT2 = inputs.find(b => b.addr === 'E106.7')

const bits = [
  new Garage([FPE, FRE, FLA, FLP, FDL, FDR, FT1, FT2]),
  new Panel([L1, L2, L3, L4, L5])
]

const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3, M4, M5, M6, M7] },
  { name: 'view-garage', bits, motors: [M8, M9] }
]

const view = new DeviceView(
  device,
  [],
  lamps,
  views
)

module.exports = { device, drives, motors, positions, view }
