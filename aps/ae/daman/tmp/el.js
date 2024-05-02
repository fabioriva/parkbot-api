const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
//   Barrier,
//   Door,
//   Flap,
//   Garage,
  Hoisting,
  Lock
//   Panel,
//   Silomat,
//   Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main } = require('../../../models/View')

let EB = 0
let AB = 0

const devices_ = []
const drives_ = []
const motors_ = []
const positions_ = []
// const silomats_ = []
// const views_ = []
// const diagnostic_ = []

for (let i = 1; i <= 5; i++) {
  // const device = new Device(i, 'EL' + i)

  const LV = new Position(i, 'LV')
  // const positions = [LV]

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 23).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 23).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 23).toString() + '.6'),
    inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.3') // REH
  ]

  // const view = {
  //   a: device,
  //   b: positions,
  //   c: lamps,
  //   d: [],
  //   e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  //   alarms: alarms[i - 1]._active
  // }

  const EN = inputs.find(b => b.addr === 'E' + (EB + 23).toString() + '.0')
  // const EN1 = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.0')
  const IV = new Drive(i, 'IV', EN)
  // const IV1 = new Drive(i, 'IV', EN)
  // const drives = [IV]

  //   /**
  //  * Motors
  //  */
  //   const FTXV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.0')
  //   const FTXH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.1')
  //   const FEMV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.2')
  //   const FEMH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.3')
  //   const LC = [FEMV, FEMH, FTXV, FTXH]

  const RTA = inputs.find(b => b.addr === 'E' + (EB + 24).toString() + '.4')
  const ASBK = inputs.find(b => b.addr === 'E' + (EB + 24).toString() + '.5')
  const FSBK = inputs.find(b => b.addr === 'E' + (EB + 24).toString() + '.7')
  const KQA = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.0')
  const SBK1 = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.7')
  const SBK2 = outputs.find(b => b.addr === 'A' + (AB + 22).toString() + '.7')

  const M1 = new Hoisting(
    0,
    IV,
    [LV],
    [RTA, ASBK, FSBK],
    [KQA, SBK1, SBK2],
    [],
    FSBK
  )

  const AMM = inputs.find(b => b.addr === 'E' + (EB + 25).toString() + '.0')
  const EOM = inputs.find(b => b.addr === 'E' + (EB + 25).toString() + '.1')
  const EZM = inputs.find(b => b.addr === 'E' + (EB + 25).toString() + '.2')
  const SMA = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.1')
  const SMB = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.2')

  const M2 = new Lock(
    0,
    [EZM, EOM, AMM],
    [SMA, SMB]
  )

  //   const motors = [M1, M2]

  const main = new Main([IV], [M1, M2])

  const views = [main]

  const device = new Device(i, 'EL' + i, [], lamps, motors_, views)

  devices_.push(device)
  drives_.push(IV)
  motors_.push(M1, M2)
  positions_.push(LV)
  // silomats_.push(...silomat.motors)
  // views_.push(view)

  // diagnostic_.push({
  //   device,
  //   inverters,
  //   motors,
  //   positions,
  //   silomat,
  //   view
  // })

  EB += 0 // 11
  AB += 0 // 8
}

module.exports = { devices_, drives_, positions_ }
