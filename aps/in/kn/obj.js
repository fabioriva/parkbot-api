const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(0, 32)), 1)
const al02 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(0, 32)), 2)
const al03 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(0, 32)), 3)
const al04 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 4)
const al05 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 5)
const al06 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 6)
const al07 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 7)
const al08 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 8)
const al09 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 9)
const al10 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 10)
const al11 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 11)
const al12 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 12)
const al13 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 13)
const al14 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 14)
const al15 = new Alarms(generateAlarms(1, 32, str.ALARMS.slice(32, 64)), 15)
exports.alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10, al11, al12, al13, al14, al15]

const inputs1 = generateBits('E', 0, 95, str.inputs1)
exports.inputs = inputs1
const eb = generateBytes(inputs1)
exports.eb = eb

const outputs1 = generateBits('A', 0, 53, str.outputs1)
exports.outputs = outputs1
const ab = generateBytes(outputs1)
exports.ab = ab

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const racks = require('./racks')
exports.racks = racks

const el = require('./el.js')
const sh = require('./sh.js')

exports.devices = [...el.devices_, ...sh.devices_]

exports.drives = [...el.drives_, ...sh.drives_]

exports.motors = [...el.motors_, ...sh.motors_]

exports.positions = [...el.positions_, ...sh.positions_]

// console.log([...el.positions_, ...sh.positions_])

// exports.silomats = [...el.silomats_, ...sh.silomats_]

// exports.diagnostic = [...el.diagnostic_, ...sh.diagnostic_]

// const device1 = require('./el1')
// const device2 = require('./el2')
// const device3 = require('./el3')
// const device4 = require('./sh1')
// const device5 = require('./sh2')
// const device6 = require('./sh3')
// const device7 = require('./sh4')
// const device8 = require('./sh5')
// const device9 = require('./sh6')
// const device10 = require('./sh7')
// const device11 = require('./sh8')
// const device12 = require('./sh9')
// const device13 = require('./sh10')
// const device14 = require('./sh11')
// const device15 = require('./sh12')

const queue = generateQueue(def)
exports.queue = queue

// exports.devices = [
//   device1.device,
//   device2.device,
//   device3.device,
//   device4.device,
//   device5.device,
//   device6.device,
//   device7.device,
//   device8.device,
//   device9.device,
//   device10.device,
//   device11.device,
//   device12.device,
//   device13.device,
//   device14.device,
//   device15.device
// ]

// exports.inverters = device1.inverters.concat(
//   device2.inverters,
//   device3.inverters,
//   device4.inverters,
//   device5.inverters,
//   device6.inverters,
//   device7.inverters,
//   device8.inverters,
//   device9.inverters,
//   device10.inverters,
//   device11.inverters,
//   device12.inverters,
//   device13.inverters,
//   device14.inverters,
//   device15.inverters
// )

// exports.motors = device1.motors.concat(
//   device2.motors,
//   device3.motors,
//   device4.motors,
//   device5.motors,
//   device6.motors,
//   device7.motors,
//   device8.motors,
//   device9.motors,
//   device10.motors,
//   device11.motors,
//   device12.motors,
//   device13.motors,
//   device14.motors,
//   device15.motors
// )

// exports.positions = device1.positions.concat(
//   device2.positions,
//   device3.positions,
//   device4.positions,
//   device5.positions,
//   device6.positions,
//   device7.positions,
//   device8.positions,
//   device9.positions,
//   device10.positions,
//   device11.positions,
//   device12.positions,
//   device13.positions,
//   device14.positions,
//   device15.positions
// )

// exports.silomats = device1.silomat.motors.concat(
//   device2.silomat.motors,
//   device3.silomat.motors,
//   device4.silomat.motors,
//   device6.silomat.motors,
//   device7.silomat.motors,
//   device8.silomat.motors,
//   device9.silomat.motors,
//   device10.silomat.motors,
//   device11.silomat.motors,
//   device12.silomat.motors,
//   device13.silomat.motors,
//   device14.silomat.motors,
//   device15.silomat.motors
// )

// exports.diagnostic = [
//   device1,
//   device2,
//   device3,
//   device4,
//   device5,
//   device6,
//   device7,
//   device8,
//   device9,
//   device10,
//   device11,
//   device12,
//   device13,
//   device14,
//   device15
// ]

exports.modes = str.MODES

exports.overview = {
  // definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    [...el.devices_],
    [...sh.devices_]
  // device1.view,
  // device2.view,
  // device3.view,
  // device4.view,
  // device5.view,
  // device6.view,
  // device7.view,
  // device8.view,
  // device9.view,
  // device10.view,
  // device11.view,
  // device12.view,
  // device13.view,
  // device14.view,
  // device15.view
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
  }
}

const cards = generateCards(def)
exports.cards = cards

const stalls = generateStalls(def)
exports.stalls = stalls

const elevators = [
  { id: 'el-1', label: 'EL1' },
  { id: 'el-2', label: 'EL2' },
  { id: 'el-3', label: 'EL3' },
  { id: 'el-4', label: 'EL4' },
  { id: 'el-5', label: 'EL5' },
  { id: 'el-6', label: 'EL6' },
  { id: 'sh-1L', label: 'SH1L' },
  { id: 'sh-2L', label: 'SH2L' },
  { id: 'sh-1R', label: 'SH1R' },
  { id: 'sh-2R', label: 'SH2R' }
]

exports.map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'P6 (-2)',
      min: 1,
      max: 152,
      stalls: stalls.slice(0, 152),
      elevators
    },
    {
      nr: 2,
      label: 'P5 (-3)',
      min: 153,
      max: 304,
      stalls: stalls.slice(152, 304),
      elevators
    },
    {
      nr: 3,
      label: 'P4 (-4)',
      min: 305,
      max: 456,
      stalls: stalls.slice(304, 456),
      elevators
    },
    {
      nr: 4,
      label: 'P3 (-5)',
      min: 457,
      max: 608,
      stalls: stalls.slice(456, 608),
      elevators
    },
    {
      nr: 5,
      label: 'P2 (-6)',
      min: 609,
      max: 760,
      stalls: stalls.slice(608, 760),
      elevators
    },
    {
      nr: 6,
      label: 'P1 (-7)',
      min: 761,
      max: 912,
      stalls: stalls.slice(760, 912),
      elevators
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
