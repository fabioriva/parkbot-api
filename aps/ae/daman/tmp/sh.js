const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
//   Barrier,
//   Door,
//   Flap,
//   Garage,
//   Lock,
//   Hoisting,
//   Panel,
  // Silomat,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

let EB = 0
let AB = 0

const devices_ = []
const drives_ = []
const motors_ = []
const positions_ = []
// const silomats_ = []
// const views_ = []
// const diagnostic_ = []

for (let i = 1; i <= 14; i++) {
  // const device = new Device(i, 'SH' + (i - 3))

  const LH = new Position(i, 'LH')
  // const positions = [LH]

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 17).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 20).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 20).toString() + '.6'),
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

  const EN = inputs.find(b => b.addr === 'E' + (EB + 17).toString() + '.0')
  const IV = new Drive(i, 'IV', EN)
  // const inverters = [IV]

  // const FEMV = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.4')
  // const FEMH = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.5')
  // const LC = [FEMV, FEMH]
  const AH = inputs.find(b => b.addr === 'E' + (EB + 20).toString() + '.6')
  const T10 = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.0')
  const T10F = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.0')

  const M1 = new Traveling(
    0,
    IV,
    [LH],
    [AH],
    [T10, T10F],
    [],
    T10F
  )

  const RMV = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.0')
  const RMH = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.1')
  const RES = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.2')
  const REH = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.3')
  const RCV = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.4')
  const REAV = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.5')
  const REAH = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.6')
  const RCH = inputs.find(b => b.addr === 'E' + (EB + 18).toString() + '.7')
  const T2 = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.1')
  const TRA = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.2')
  const TRB = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.3')
  const KCS = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.4')
  const KCV = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.5')
  const KCH = outputs.find(b => b.addr === 'A' + (AB + 21).toString() + '.6')

  const AF8 = inputs.find(b => b.addr === 'E' + (EB + 20).toString() + '.7')
  const MTC = inputs.find(b => b.addr === 'E' + (EB + 20).toString() + '.7')

  const silomat = new Silomat(
    IV,
    [],
    [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
    [AF8, MTC]
  )

  // const motors = [M1]

  // const silomat = new Silomat(
  //   i,
  //   'SIL' + i,
  //   [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  //   [T2, TRA, TRB, KCS, KCV, KCH]
  // )

  const main = new Main([IV], [M1])

  const views = [main, silomat]

  const device = new Device(i, 'SH' + i, [], lamps, motors_, views)

  devices_.push(device)
  drives_.push(IV)
  motors_.push(M1, ...silomat.motors)
  positions_.push(LH)
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

  EB += 0 // 5
  AB += 0 // 4
}

module.exports = { devices_, drives_, positions_ }
