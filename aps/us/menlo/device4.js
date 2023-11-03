const { inputs, outputs } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const { Hoisting, Traveling } = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E100.2'),
  outputs.find(b => b.addr === 'A203.7'),
  outputs.find(b => b.addr === 'A203.6'),
  inputs.find(b => b.addr === 'E412.3')
]

const EN1 = inputs.find(b => b.addr === 'E200.0')
const EN2 = inputs.find(b => b.addr === 'E200.1')

const IV1 = new Drive(4, 'IV1', EN1)
const IV2 = new Drive(5, 'IV2', EN2)

// ...

/**
 * Silomat
 */
const RMV = inputs.find(b => b.addr === 'E205.0')
const RMH = inputs.find(b => b.addr === 'E205.1')
const RES = inputs.find(b => b.addr === 'E205.2')
const REH = inputs.find(b => b.addr === 'E205.3')
const RCV = inputs.find(b => b.addr === 'E205.4')
const REAV = inputs.find(b => b.addr === 'E205.5')
const REAH = inputs.find(b => b.addr === 'E205.6')
const RCH = inputs.find(b => b.addr === 'E205.7')
const T2 = outputs.find(b => b.addr === 'A201.2')
const TRA = outputs.find(b => b.addr === 'A204.1')
const TRB = outputs.find(b => b.addr === 'A204.2')
const KCS = outputs.find(b => b.addr === 'A204.3')
const KCV = outputs.find(b => b.addr === 'A204.4')
const KCH = outputs.find(b => b.addr === 'A204.5')

const AF8 = inputs.find(b => b.addr === 'E201.5')
const AGF = inputs.find(b => b.addr === 'E201.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, AGF]
)

const drives = [IV1, IV2]

// const motors = [M1, M2, ...silomat.motors]
const motors = [...silomat.motors]

// const main = new Main(drives, [M1, M2])
const main = new Main(drives, [])

const views = [main, silomat]

const device = new Device(4, 'T1', [], lamps, motors, views)

module.exports = { device, drives, positions }
