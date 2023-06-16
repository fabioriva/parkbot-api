const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/Device')
const { Drive } = require('../../models/Drive')
const { Position } = require('../../models/Position')

const device = new Device(3, 'EL')

const EN1 = inputs.find(b => b.addr === 'E2.0')
const EN2 = inputs.find(b => b.addr === 'E2.1')

const IV1 = new Drive(1, 'IV1', EN1)
const IV2 = new Drive(2, 'IV2', EN2)

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(3, 'LH2')
const ENR = new Position(5, 'ENR')
const positions = [LV1, LV2, LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E17.0'),
//   inputs.find(b => b.addr === 'E17.1'),
//   inputs.find(b => b.addr === 'E17.2'),
//   inputs.find(b => b.addr === 'E17.3'),
//   inputs.find(b => b.addr === 'E17.4'),
//   inputs.find(b => b.addr === 'E17.5'),
//   inputs.find(b => b.addr === 'E17.6'),
//   inputs.find(b => b.addr === 'E17.7'),
//   outputs.find(b => b.addr === 'A12.2'),
//   outputs.find(b => b.addr === 'A12.3'),
//   outputs.find(b => b.addr === 'A12.4'),
//   outputs.find(b => b.addr === 'A12.5'),
//   outputs.find(b => b.addr === 'A12.6'),
//   outputs.find(b => b.addr === 'A12.7')
// ]

const RMV = inputs.find(b => b.addr === 'E17.0')
const RMH = inputs.find(b => b.addr === 'E17.1')
const RES = inputs.find(b => b.addr === 'E17.2')
const REH = inputs.find(b => b.addr === 'E17.3')
const RCV = inputs.find(b => b.addr === 'E17.4')
const REAV = inputs.find(b => b.addr === 'E17.5')
const REAH = inputs.find(b => b.addr === 'E17.6')
const RCH = inputs.find(b => b.addr === 'E17.7')
const T2 = outputs.find(b => b.addr === 'A12.2')
const TRA = outputs.find(b => b.addr === 'A12.3')
const TRB = outputs.find(b => b.addr === 'A12.4')
const KCS = outputs.find(b => b.addr === 'A12.5')
const KCV = outputs.find(b => b.addr === 'A12.6')
const KCH = outputs.find(b => b.addr === 'A12.7')

const silomat = [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH]
// const steps = [
//   { key: 'step-1', color: 'gray', tooltip: 'step-1' },
//   { key: 'step-2', color: 'gray', tooltip: 'step-2' },
//   { key: 'step-3', color: 'gray', tooltip: 'step-3' },
//   { key: 'step-4', color: 'gray', tooltip: 'step-4' },
//   { key: 'step-5', color: 'gray', tooltip: 'step-5' },
//   { key: 'step-6', color: 'gray', tooltip: 'step-6' },
//   { key: 'step-7', color: 'gray', tooltip: 'step-7' },
//   { key: 'step-8', color: 'gray', tooltip: 'step-8' },
//   { key: 'step-9', color: 'gray', tooltip: 'step-9' }
// ]

// device.steps = steps
// device.alarms = alarms[0]._active

const FKBA = inputs.find(b => b.addr === 'E8.0')
const RTA = inputs.find(b => b.addr === 'E8.6')
const ASBK = inputs.find(b => b.addr === 'E15.0')
const FSBK = inputs.find(b => b.addr === 'E15.1')
const KQA = outputs.find(b => b.addr === 'A4.0')
const SBK1 = outputs.find(b => b.addr === 'A3.7')
const SBK2 = outputs.find(b => b.addr === 'A4.7')

// Add Motor class as a model

const Hoisting = {
  name: 'mot-hoisting',
  drive: IV1,
  encoders: [LV1, LV2],
  io: [FKBA, RTA, ASBK, FSBK, KQA],
  status: 'Going down'
}
const Traveling = {
  name: 'mot-traveling',
  drive: IV2,
  encoders: [LH1, LH2],
  io: [FKBA, RTA, FSBK, KQA, SBK1, SBK2],
  status: 'Going right'
}
const Rotation = {
  name: 'mot-rotation',
  drive: IV2,
  encoders: [ENR],
  io: [FKBA, RTA, FSBK, KQA, SBK1, SBK2],
  status: 'Anticlockwise'
}

const Silomat = {
  inputs: silomat.slice(0, 8),
  outputs: silomat.slice(8),
  motors: [
    {
      name: 'mot-traveling',
      drive: IV2,
      encoders: [],
      io: [RMV, RMH, T2, KCS, KCH],
      status: 'Traveling front'
    },
    {
      name: 'mot-hoisting',
      encoders: [],
      io: [RES, REH, TRA, TRB, KCS],
      status: 'Going down'
    },
    {
      name: 'mot-center-v',
      encoders: [],
      io: [RCV, REAV, TRA, TRB, KCV],
      status: 'Centering V'
    },
    {
      name: 'mot-center-h',
      encoders: [],
      io: [RCH, REAH, TRA, TRB, KCH],
      status: 'Centering H'
    }
  ]
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat,
  main: [Hoisting, Traveling, Rotation],
  more: [],
  silomat: Silomat
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
