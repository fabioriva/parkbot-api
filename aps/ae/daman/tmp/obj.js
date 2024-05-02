const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EL
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3) // EL
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 4) // EL
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 5) // EL
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6) // SH
const al07 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 7) // SH
const al08 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 8) // SH
const al09 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 9) // SH
const al10 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 10) // SH
const al11 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 11) // SH
const al12 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 12) // SH
const al13 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 13) // SH
const al14 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 14) // SH
const al15 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 15) // SH
const al16 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 16) // SH
const al17 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 17) // SH
const al18 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 18) // SH
const al19 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 19) // SH
exports.alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10, al11, al12, al13, al14, al15, al16, al17, al18, al19]
// console.log(al01._active)

const inputs1 = generateBits('E', 16, 18, str.inputs1) // EL
const inputs2 = generateBits('E', 20, 27, str.inputs2)
const inputs3 = generateBits('E', 16, 18, str.inputs3) // SH
const inputs4 = generateBits('E', 20, 21, str.inputs4)
// const inputs = inputs1.concat(inputs2, inputs3, inputs4)
const inputs = [
  ...inputs1, ...inputs2, // EL1
  ...inputs1, ...inputs2, // EL2
  ...inputs1, ...inputs2, // EL3
  ...inputs1, ...inputs2, // EL4
  ...inputs1, ...inputs2, // EL5
  ...inputs3, ...inputs4, // SH1
  ...inputs3, ...inputs4, // SH2
  ...inputs3, ...inputs4, // SH3
  ...inputs3, ...inputs4, // SH4
  ...inputs3, ...inputs4, // SH5
  ...inputs3, ...inputs4, // SH6
  ...inputs3, ...inputs4, // SH7
  ...inputs3, ...inputs4, // SH8
  ...inputs3, ...inputs4, // SH9
  ...inputs3, ...inputs4, // SH10
  ...inputs3, ...inputs4, // SH11
  ...inputs3, ...inputs4, // SH12
  ...inputs3, ...inputs4, // SH13
  ...inputs3, ...inputs4 // SH14
]
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb
// console.log(eb.length, eb[0], eb.slice(0,2))
// console.log(inputs.slice(0, 96))
// console.log(eb[10], eb[10].find(b => b.addr === 'E27.0'))

const outputs1 = generateBits('A', 16, 17, str.outputs1) // EL
const outputs2 = generateBits('A', 20, 25, str.outputs2)
const outputs3 = generateBits('A', 16, 17, str.outputs3) // SH
const outputs4 = generateBits('A', 20, 21, str.outputs4)
const outputs = [
  ...outputs1, ...outputs2, // EL1
  ...outputs1, ...outputs2, // EL2
  ...outputs1, ...outputs2, // EL3
  ...outputs1, ...outputs2, // EL4
  ...outputs1, ...outputs2, // EL5
  ...outputs3, ...outputs4, // SH1
  ...outputs3, ...outputs4, // SH2
  ...outputs3, ...outputs4, // SH3
  ...outputs3, ...outputs4, // SH4
  ...outputs3, ...outputs4, // SH5
  ...outputs3, ...outputs4, // SH6
  ...outputs3, ...outputs4, // SH7
  ...outputs3, ...outputs4, // SH8
  ...outputs3, ...outputs4, // SH9
  ...outputs3, ...outputs4, // SH10
  ...outputs3, ...outputs4, // SH11
  ...outputs3, ...outputs4, // SH12
  ...outputs3, ...outputs4, // SH13
  ...outputs3, ...outputs4 // SH14
]
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab
console.log(ab.length)

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const racks = require('./racks')
exports.racks = racks

const el = require('./el.js')
const sh = require('./sh.js')

const devices = [...el.devices_, ...sh.devices_]
console.log(devices.length)
exports.devices = devices

exports.drives = [...el.drives_, ...sh.drives_]

exports.positions = [...el.positions_, ...sh.positions_]

const queue = generateQueue(def)
exports.queue = queue

exports.modes = str.MODES

exports.overview = {
  devices: [
    [...el.devices_],
    [...sh.devices_]
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
  { id: 'el-5', label: 'EL5' }
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
      label: 'P1 (-3)',
      min: 1,
      max: 88,
      stalls: stalls.slice(0, 88),
      elevators
    },
    {
      nr: 2,
      label: 'P2 (-2)',
      min: 89,
      max: 176,
      stalls: stalls.slice(88, 176),
      elevators
    },
    {
      nr: 3,
      label: 'P3 (-1)',
      min: 177,
      max: 264,
      stalls: stalls.slice(176, 264),
      elevators
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
