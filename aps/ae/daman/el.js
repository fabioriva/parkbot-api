const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Barrier,
  DoorVFD,
  Flap,
  Hoisting,
  Lock,
  Rotation
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat, Garage } = require('../../../models/View')

let EB = 0
let AB = 0

const devices_ = []
const drives_ = []
const motors_ = []
const positions_ = []

for (let i = 1; i <= 5; i++) {
  const LV = new Position(i, 'LV')

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.6'),
    inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3') // REH
  ]
  const EN1 = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.0')
  const EN2 = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.1')
  const IV1 = new Drive(i, 'IV1', EN1)
  const IV2 = new Drive(i, 'IV2', EN2)

  //   const FTXV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.0')
  //   const FTXH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.1')
  //   const FEMV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.2')
  //   const FEMH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.3')
  //   const LC = [FEMV, FEMH, FTXV, FTXH]

  const RTA = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.4')
  const ASBK = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.5')
  const FSBK = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.7')
  const KQA = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.0')
  const SBK1 = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.7')
  const SBK2 = outputs.find(b => b.addr === 'A' + (AB + 4).toString() + '.7')

  const M1 = new Hoisting(
    0,
    IV1,
    [LV],
    [RTA, ASBK, FSBK],
    [KQA, SBK1, SBK2],
    [],
    FSBK
  )

  const AMM = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.0')
  const EOM = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.1')
  const EZM = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.2')
  const SMA = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.1')
  const SMB = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.2')

  const M2 = new Lock(
    0,
    [EZM, EOM, AMM],
    [SMA, SMB]
  )

  const EZ = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.0')
  const EO = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.1')
  const FB = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.2')
  const AP = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.7')
  const KX = outputs.find(b => b.addr === 'A' + (AB + 6).toString() + '.6') // SPE

  const M3 = new DoorVFD(
    0,
    IV1,
    [],
    [EZ, EO, AP, FB], //, EX, FX],
    [KX],
    [EZ, EO],
    KX
  )

  const main = new Main([IV1], [M1, M2, M3])

  const AD = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.4')
  const MDR = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.0')
  const MDL = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.1')
  const EDR = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.2')
  const EDL = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.3')
  const TD = outputs.find(b => b.addr === 'A' + (AB + 6).toString() + '.7')

  const M4 = new Rotation(
    0,
    IV2,
    [],
    [AD, MDR, MDL, EDR, EDL],
    [TD],
    [],
    TD
  )

  const AMC = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.5')

  const ECA1 = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.6')
  const ECB1 = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.7')
  const SCA1 = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.3')
  const SCB1 = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.4')

  const M5 = new Flap(
    1,
    [ECA1, ECB1, AMC],
    [SCA1, SCB1]
  )

  const ECA2 = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.2')
  const ECB2 = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.3')
  const SCA2 = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.6')
  const SCB2 = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.7')

  const M6 = new Flap(
    2,
    [ECA2, ECB2, AMC],
    [SCA2, SCB2]
  )

  const APB = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.3')
  const EZB = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.0')
  const EOB = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.1')
  const FBB = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.2')
  const SZB = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.5')
  const SOB = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.6')
  // const KXB = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.0')

  const M7 = new Barrier(
    0,
    [EZB, EOB, APB, FBB],
    [SZB, SOB] //, KXB]
  )

  const L1 = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.0')
  const L2 = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.1')
  const L3 = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.2')
  const L4 = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.3')
  const L5 = outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.4')

  const FDR = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.5')
  const FDL = inputs.find(b => b.addr === 'E' + (EB + 8).toString() + '.6')
  const FLA = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.4')
  const FLP = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.5')
  const FPE = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.3')
  const EPZ = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.3')

  const FTA1 = inputs.find(b => b.addr === 'E' + (EB + 9).toString() + '.7')
  const FTA2 = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.0')
  const FLA2 = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.1')
  const FLP2 = inputs.find(b => b.addr === 'E' + (EB + 10).toString() + '.2')
  const FDR2 = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.6')
  const FDL2 = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.7')
  const FPE2 = inputs.find(b => b.addr === 'E' + (EB + 5).toString() + '.5')

  const garage = new Garage(
    [IV2],
    [M4, M5, M6, M7],
    [L1, L2, L3, L4, L5],
    [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FLA2, FLP2, FDL2, FDR2, FPE2]
  )

  const RMV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.0')
  const RMH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.1')
  const RES = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.2')
  const REH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3')
  const RCV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.4')
  const REAV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.5')
  const REAH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.6')
  const RCH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.7')
  const T2 = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.1')
  const TRA = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.2')
  const TRB = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.3')
  const KCS = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.4')
  const KCV = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.5')
  const KCH = outputs.find(b => b.addr === 'A' + (AB + 7).toString() + '.6')

  const AF8 = inputs.find(b => b.addr === 'E' + (EB + 5).toString() + '.6')
  const MTC = inputs.find(b => b.addr === 'E' + (EB + 5).toString() + '.6')

  const silomat = new Silomat(
    IV2,
    [],
    [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
    [AF8, MTC]
  )

  const views = [main, garage, silomat]

  const device = new Device(i, 'EL' + i, [], lamps, motors_, views)

  devices_.push(device)
  drives_.push(IV1, IV2)
  motors_.push(M1, M2, M3, M4, M5, M6, M7, ...silomat.motors)
  positions_.push(LV)

  EB += 11
  AB += 8
}

module.exports = { devices_, drives_, positions_ }
