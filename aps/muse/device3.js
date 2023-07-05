const def = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device, DeviceView } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Hoisting, Lock, Traveling, Silomat } = require('../../models/Motor')
const { Position } = require('../../models/Position')

const device = new Device(3, 'EL3')

const LV1 = new Position(9, 'LV1')
const LV2 = new Position(10, 'LV2')
const LH1 = new Position(11, 'LH1')
const LH2 = new Position(12, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E301.3'),
  outputs.find(b => b.addr === 'A300.7'),
  outputs.find(b => b.addr === 'A300.6')
]

const A0 = {
  conn: def.ROLLBACK_EL3,
  enable: merkers.find(b => b.addr === 'M4.2'),
  key: 'action-rollback'
}

const EN1 = inputs.find(b => b.addr === 'E301.1')
const EN2 = inputs.find(b => b.addr === 'E313.0')

const IV1 = new Drive(5, 'IV1', EN1)
const IV2 = new Drive(6, 'IV2', EN2)

const RTA = inputs.find(b => b.addr === 'E302.6')
const ASBK = inputs.find(b => b.addr === 'E302.5')
const FSBK = inputs.find(b => b.addr === 'E302.4')
const SBK1 = outputs.find(b => b.addr === 'A300.0')
const SBK2 = outputs.find(b => b.addr === 'A300.4')

const M1 = new Hoisting(
  0,
  IV1,
  [LV1, LV2],
  [RTA, ASBK, FSBK],
  [SBK1, SBK2],
  [],
  FSBK
)

const AMM = inputs.find(b => b.addr === 'E305.2')
const EOM = inputs.find(b => b.addr === 'E305.3')
const EZM = inputs.find(b => b.addr === 'E305.4')
const SMA = outputs.find(b => b.addr === 'A304.0')
const SMB = outputs.find(b => b.addr === 'A304.1')

const M2 = new Lock(0, [EZM, EOM, AMM], [SMA, SMB])

const AGK = inputs.find(b => b.addr === 'E304.0')
const AH = inputs.find(b => b.addr === 'E314.6')
const EMC = inputs.find(b => b.addr === 'E305.5')
const T101 = outputs.find(b => b.addr === 'A311.0')
const T102 = outputs.find(b => b.addr === 'A312.4')
const T10F = outputs.find(b => b.addr === 'A312.5')

const M3 = new Traveling(
  0,
  IV2,
  [LH1, LH2],
  [AH, AGK, EMC],
  [T101, T102, T10F],
  [],
  T10F
)

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E312.0')
const RMH = inputs.find(b => b.addr === 'E312.1')
const RES = inputs.find(b => b.addr === 'E312.2')
const REH = inputs.find(b => b.addr === 'E312.3')
const RCV = inputs.find(b => b.addr === 'E312.4')
const REAV = inputs.find(b => b.addr === 'E312.5')
const REAH = inputs.find(b => b.addr === 'E312.6')
const RCH = inputs.find(b => b.addr === 'E312.7')
const T2 = outputs.find(b => b.addr === 'A311.1')
const TRA = outputs.find(b => b.addr === 'A311.2')
const TRB = outputs.find(b => b.addr === 'A311.3')
const KCS = outputs.find(b => b.addr === 'A311.4')
const KCV = outputs.find(b => b.addr === 'A311.5')
const KCH = outputs.find(b => b.addr === 'A311.6')

const AF8 = inputs.find(b => b.addr === 'E314.0')
const AGF = inputs.find(b => b.addr === 'E314.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, AGF]
)

const drives = [IV1, IV2]

const motors = [M1, M2, M3, ...silomat.motors]
const views = [
  { name: 'view-main', drives, motors: [M1, M2, M3] },
  { name: 'view-sil', drives: [IV2], motors: [...silomat.motors] }
]

const view = new DeviceView(
  device,
  [A0],
  lamps,
  views
)

module.exports = { device, drives, motors, positions, view }
