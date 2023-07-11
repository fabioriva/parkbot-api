const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4)
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5)
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6)
exports.alarms = [al01, al02, al03, al04, al05, al06]

const inputs1 = generateBits('E', 0, 5, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 112, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs2)
const inputs5 = generateBits('E', 210, 212, str.inputs3)
const inputs6 = generateBits('E', 300, 307, str.inputs2)
const inputs7 = generateBits('E', 310, 312, str.inputs3)
const inputs8 = generateBits('E', 400, 403, str.inputs8)
const inputs9 = generateBits('E', 404, 405, str.inputs9)
const inputs10 = generateBits('E', 410, 414, str.inputs10)
const inputs11 = generateBits('E', 500, 503, str.inputs8)
const inputs12 = generateBits('E', 504, 505, str.inputs9)
const inputs13 = generateBits('E', 510, 514, str.inputs10)
const inputs14 = generateBits('E', 600, 603, str.inputs8)
const inputs15 = generateBits('E', 604, 605, str.inputs9)
const inputs16 = generateBits('E', 610, 614, str.inputs10)
// Failsafe
const inputs17 = generateBits('E', 10, 11, str.inputs17) // CPU
const inputs18 = generateBits('E', 20, 21, str.inputs18) // CPU
const inputs19 = generateBits('E', 1000, 1001, str.inputs19) // LS1
const inputs20 = generateBits('E', 1020, 1020, str.inputs20) // KKM1
const inputs21 = generateBits('E', 2000, 2001, str.inputs19) // LS2
const inputs22 = generateBits('E', 2020, 2020, str.inputs20) // KKM2
const inputs23 = generateBits('E', 3000, 3001, str.inputs19) // LS3
const inputs24 = generateBits('E', 3020, 3020, str.inputs20) // KKM2
const inputs25 = generateBits('E', 4000, 4001, str.inputs21) // LS4
const inputs26 = generateBits('E', 4020, 4020, str.inputs22) // KKP4
const inputs27 = generateBits('E', 4040, 4040, str.inputs23) // SH4
const inputs28 = generateBits('E', 5000, 5001, str.inputs21) // LS5
const inputs29 = generateBits('E', 5020, 5020, str.inputs22) // KKP5
const inputs30 = generateBits('E', 5040, 5040, str.inputs23) // SH5
const inputs31 = generateBits('E', 6000, 6001, str.inputs21) // LS6
const inputs32 = generateBits('E', 6020, 6020, str.inputs22) // KKP6
const inputs33 = generateBits('E', 6040, 6040, str.inputs23) // SH6

const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9,
  inputs10,
  inputs11,
  inputs12,
  inputs13,
  inputs14,
  inputs15,
  inputs16,
  inputs17,
  inputs18,
  inputs19,
  inputs20,
  inputs21,
  inputs22,
  inputs23,
  inputs24,
  inputs25,
  inputs26,
  inputs27,
  inputs28,
  inputs29,
  inputs30,
  inputs31,
  inputs32,
  inputs33
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 110, 111, str.outputs3)
const outputs4 = generateBits('A', 200, 203, str.outputs2)
const outputs5 = generateBits('A', 210, 211, str.outputs3)
const outputs6 = generateBits('A', 300, 303, str.outputs2)
const outputs7 = generateBits('A', 310, 311, str.outputs3)
const outputs8 = generateBits('A', 400, 401, str.outputs8)
const outputs9 = generateBits('A', 404, 404, str.outputs9)
const outputs10 = generateBits('A', 410, 412, str.outputs10)
const outputs11 = generateBits('A', 500, 501, str.outputs8)
const outputs12 = generateBits('A', 504, 504, str.outputs9)
const outputs13 = generateBits('A', 510, 512, str.outputs10)
const outputs14 = generateBits('A', 600, 601, str.outputs8)
const outputs15 = generateBits('A', 604, 604, str.outputs9)
const outputs16 = generateBits('A', 610, 612, str.outputs10)
// Failsafe
const outputs17 = generateBits('A', 30, 30, str.outputs17) // CPU
const outputs18 = generateBits('A', 1010, 1010, str.outputs18) // LS1
const outputs19 = generateBits('A', 1030, 1030, str.outputs19) // KKM1
const outputs20 = generateBits('A', 2010, 2010, str.outputs18) // LS2
const outputs21 = generateBits('A', 2030, 2030, str.outputs19) // KKM2
const outputs22 = generateBits('A', 3010, 3010, str.outputs18) // LS3
const outputs23 = generateBits('A', 3030, 3030, str.outputs19) // KKM3
const outputs24 = generateBits('A', 4010, 4010, str.outputs20) // LS4
const outputs25 = generateBits('A', 4030, 4030, str.outputs21) // KKP4
const outputs26 = generateBits('A', 4050, 4050, str.outputs22) // SH4
const outputs27 = generateBits('A', 5010, 5010, str.outputs20) // LS4
const outputs28 = generateBits('A', 5030, 5030, str.outputs21) // KKP4
const outputs29 = generateBits('A', 5050, 5050, str.outputs22) // SH4
const outputs30 = generateBits('A', 6010, 6010, str.outputs20) // LS4
const outputs31 = generateBits('A', 6030, 6030, str.outputs21) // KKP4
const outputs32 = generateBits('A', 6050, 6050, str.outputs22) // SH4

const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7,
  outputs8,
  outputs9,
  outputs10,
  outputs11,
  outputs12,
  outputs13,
  outputs14,
  outputs15,
  outputs16,
  outputs17,
  outputs18,
  outputs19,
  outputs20,
  outputs21,
  outputs22,
  outputs23,
  outputs24,
  outputs25,
  outputs26,
  outputs27,
  outputs28,
  outputs29,
  outputs30,
  outputs31,
  outputs32
)
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const racks = require('./racks')
exports.racks = racks

const device1 = require('./device1')
const device2 = require('./device2')
const device3 = require('./device3')
const device4 = require('./device4')
const device5 = require('./device5')
const device6 = require('./device6')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device
]

exports.drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives,
  device6.drives
)

exports.motors = device1.motors.concat(
  device2.motors,
  device3.motors,
  device4.motors,
  device5.motors,
  device6.motors
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions
)

exports.modes = str.MODES

exports.overview = {
  // definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    [device1.device, device2.device, device3.device],
    [device4.device, device5.device, device6.device]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: {
      // conn: def.REQ_0,
      enable: merkers.find(b => b.addr === 'M3.0'),
      key: 'action-exit',
      min: 1,
      max: def.CARDS
    }
  }
}

const cards = generateCards(def)
exports.cards = cards

const stalls = generateStalls(def)
exports.stalls = stalls

exports.map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: '1st Level (P1)',
      min: 1,
      max: 38,
      stalls: stalls.slice(0, 38),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 2,
      label: '2nd Level (P2)',
      min: 39,
      max: 76,
      stalls: stalls.slice(38, 76),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 3,
      label: '3rd Level (P3)',
      min: 77,
      max: 114,
      stalls: stalls.slice(76, 114),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 4,
      label: '4th Level (P4)',
      min: 115,
      max: 152,
      stalls: stalls.slice(114, 152),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 5,
      label: '5th Level (P5)',
      min: 153,
      max: 190,
      stalls: stalls.slice(152, 190),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 6,
      label: '6th Level (P6)',
      min: 191,
      max: 227,
      stalls: stalls.slice(190, 227),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 7,
      label: '7th Level (P7)',
      min: 228,
      max: 255,
      stalls: stalls.slice(227, 255),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 8,
      label: '8th Level (P8)',
      min: 256,
      max: 276,
      stalls: stalls.slice(255, 276),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
