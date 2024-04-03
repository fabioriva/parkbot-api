const { inputs, inputsSH, outputsSH } = require('./obj')
const { Device } = require('../../../models/Device')
const { Drive } = require('../../../models/Drive')
const {
  Hoisting,
  Traveling
} = require('../../../models/Motor')
const { Position } = require('../../../models/Position')
const { Main, Silomat } = require('../../../models/View')

const EN1 = inputs.find(b => b.addr === 'E3.0')
const EN2 = inputsSH.find(b => b.addr === 'E3.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const ENC = new Position(5, 'ENC')
const positions = [LV1, LV2, LH1, LH2, ENC]

const lamps = [
  inputsSH.find(b => b.addr === 'E3.3'),
  outputsSH.find(b => b.addr === 'A0.7'),
  outputsSH.find(b => b.addr === 'A0.6')
]

const RMV = inputsSH.find(b => b.addr === 'E2.0')
const RMH = inputsSH.find(b => b.addr === 'E2.1')
const RES = inputsSH.find(b => b.addr === 'E2.2')
const REH = inputsSH.find(b => b.addr === 'E2.3')
const RCV = inputsSH.find(b => b.addr === 'E2.4')
const REAV = inputsSH.find(b => b.addr === 'E2.5')
const REAH = inputsSH.find(b => b.addr === 'E2.6')
const RCH = inputsSH.find(b => b.addr === 'E2.7')
const T2 = outputsSH.find(b => b.addr === 'A2.1')
const TRA = outputsSH.find(b => b.addr === 'A2.2')
const TRB = outputsSH.find(b => b.addr === 'A2.3')
const KCS = outputsSH.find(b => b.addr === 'A2.4')
const KCV = outputsSH.find(b => b.addr === 'A2.5')
const KCH = outputsSH.find(b => b.addr === 'A2.6')

const AF8 = inputsSH.find(b => b.addr === 'E3.5')
const MTC = inputsSH.find(b => b.addr === 'E13.7')

const silomat = new Silomat(
  IV2,
  [],
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  [AF8, MTC]
)

const drives = [IV1, IV2]

// const motors = [M1, M2, M3, ...silomat.motors]
const motors = [...silomat.motors]

// const main = new Main(drives, [M1, M2, M3])
const main = new Main(drives, [])

const views = [main, silomat]

const device = new Device(1, 'EL', [], lamps, motors, views)

module.exports = { device, drives, positions }
