const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
// const {
//   Barrier,
//   Door,
//   Flap,
//   Garage,
//   Lock,
//   Hoisting,
//   Panel,
//   Silomat,
//   Traveling
// } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')

let EB = 36
let AB = 18

const devices_ = []
const drives_ = []
const motors_ = []
const positions_ = []
// const silomats_ = []
// const views_ = []
// const diagnostic_ = []

for (let i = 4; i <= 15; i++) {
  // const device = new Device(i, 'SH' + (i - 3))

  const LH = new Position(i, 'LH')
  // const positions = [LH]

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 3).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 0).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 0).toString() + '.6'),
    inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3') // REH
  ]

  // const RMV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.0')
  // const RMH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.1')
  // const RES = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.2')
  // const REH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3')
  // const RCVH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.4')
  // const REAV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.5')
  // const REAH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.6')
  // const REP = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.7')
  // const T2 = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.1')
  // const TRA = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.2')
  // const TRB = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.3')
  // const KCS = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.4')
  // const KCV = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.5')
  // const KCH = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.6')

  // const view = {
  //   a: device,
  //   b: positions,
  //   c: lamps,
  //   d: [],
  //   e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  //   alarms: alarms[i - 1]._active
  // }

  const EN = inputs.find(b => b.addr === 'E' + (EB + 3).toString() + '.0')
  const IV = new Drive(i, 'IV', EN)
  // const inverters = [IV]

  // const FEMV = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.4')
  // const FEMH = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.5')
  // const LC = [FEMV, FEMH]
  // const AH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.6')
  // const T10 = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.0')
  // const T10F = outputs.find(b => b.addr === 'A' + (AB + 0).toString() + '.5')

  // const M1 = new Traveling(
  //   i,
  //   { key: 'mot-traveling' },
  //   [AH],
  //   [T10, T10F],
  //   [LH],
  //   LC,
  //   IV
  // )
  // const motors = [M1]

  // const silomat = new Silomat(
  //   i,
  //   'SIL' + i,
  //   [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  //   [T2, TRA, TRB, KCS, KCV, KCH]
  // )

  const views = []

  const device = new Device(i, 'SH' + (i - 3), [], lamps, motors_, views)

  devices_.push(device)
  drives_.push(IV)
  // motors_.push(M1)
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

  EB += 5
  AB += 3
}

module.exports = { devices_, drives_, positions_ }
