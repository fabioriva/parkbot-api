const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

let EB = 55
let AB = 40

const devices_ = []
const drives_ = []
const motors_ = []
const positions_ = []

for (let i = 1; i <= 14; i++) {
  const LH = new Position(i, 'LH')

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.6'),
    inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3') // REH
  ]

  const EN = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.0')
  const IV = new Drive(i, 'IV', EN)

  // const FEMV = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.4')
  // const FEMH = inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.5')
  // const LC = [FEMV, FEMH]
  const AH = inputs.find(b => b.addr === 'E' + (EB + 3).toString() + '.6')
  const T10 = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.0')
  const KBA = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.3')

  const M1 = new Traveling(
    0,
    IV,
    [LH],
    [AH],
    [T10, KBA],
    [],
    KBA
  )

  const main = new Main([IV], [M1])

  const RMV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.0')
  const RMH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.1')
  const RES = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.2')
  const REH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.3')
  const RCV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.4')
  const REAV = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.5')
  const REAH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.6')
  const RCH = inputs.find(b => b.addr === 'E' + (EB + 2).toString() + '.7')
  const T2 = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.1')
  const TRA = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.2')
  const TRB = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.3')
  const KCS = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.4')
  const KCV = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.5')
  const KCH = outputs.find(b => b.addr === 'A' + (AB + 3).toString() + '.6')

  const AF8 = inputs.find(b => b.addr === 'E' + (EB + 3).toString() + '.7')
  const MTC = inputs.find(b => b.addr === 'E' + (EB + 3).toString() + '.7')

  const silomat = new Silomat(
    IV,
    [],
    [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
    [AF8, MTC]
  )

  const views = [main, silomat]

  const device = new Device(i, 'SH' + i, [], lamps, motors_, views)

  devices_.push(device)
  drives_.push(IV)
  motors_.push(M1, ...silomat.motors)
  positions_.push(LH)

  EB += 5
  AB += 4
}

module.exports = { devices_, drives_, positions_ }
