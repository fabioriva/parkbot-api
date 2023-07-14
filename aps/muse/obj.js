const def = require('./def')
const str = require('./str')
const { Action } = require('../../models/Action')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4)
exports.alarms = [al01, al02, al03, al04]

const inputs1 = generateBits('E', 0, 5, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 111, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs4)
const inputs5 = generateBits('E', 210, 211, str.inputs5)
const inputs6 = generateBits('E', 300, 305, str.inputs6)
const inputs7 = generateBits('E', 310, 314, str.inputs7)
const inputs8 = generateBits('E', 400, 405, str.inputs8)
const inputs9 = generateBits('E', 410, 414, str.inputs9)
const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 110, 110, str.outputs3)
const outputs4 = generateBits('A', 200, 205, str.outputs4)
const outputs5 = generateBits('A', 210, 210, str.outputs5)
const outputs6 = generateBits('A', 300, 301, str.outputs6)
const outputs7 = generateBits('A', 304, 304, str.outputs7)
const outputs8 = generateBits('A', 310, 312, str.outputs8)
const outputs9 = generateBits('A', 400, 401, str.outputs9)
const outputs10 = generateBits('A', 404, 404, str.outputs10)
const outputs11 = generateBits('A', 410, 412, str.outputs11)
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
  outputs11
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device
]

exports.drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives
)

exports.motors = device1.motors.concat(
  device2.motors,
  device3.motors,
  device4.motors
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions
)

exports.modes = str.MODES

exports.overview = {
  devices: [
    [device1.device, device2.device],
    [device3.device, device4.device]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', merkers.find(b => b.addr === 'M3.5'), def.REQ_0, 1, def.CARDS)
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
      nr: 26,
      label: 'G26',
      min: 201,
      max: 208,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(200, 208)
    },
    {
      nr: 25,
      label: 'G25',
      min: 193,
      max: 200,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(192, 200)
    },
    {
      nr: 24,
      label: 'G24',
      min: 185,
      max: 192,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(184, 192)
    },
    {
      nr: 23,
      label: 'G23',
      min: 177,
      max: 184,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(176, 184)
    },
    {
      nr: 22,
      label: 'G22',
      min: 169,
      max: 176,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(168, 176)
    },
    {
      nr: 21,
      label: 'G21',
      min: 161,
      max: 168,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(160, 168)
    },
    {
      nr: 20,
      label: 'G20',
      min: 153,
      max: 160,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(152, 160)
    },
    {
      nr: 19,
      label: 'G19',
      min: 145,
      max: 152,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(144, 152)
    },
    {
      nr: 18,
      label: 'G18',
      min: 137,
      max: 144,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(136, 144)
    },
    {
      nr: 17,
      label: 'G17',
      min: 129,
      max: 136,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(128, 136)
    },
    {
      nr: 16,
      label: 'G16',
      min: 121,
      max: 128,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(120, 128)
    },
    {
      nr: 15,
      label: 'G15',
      min: 113,
      max: 120,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(112, 120)
    },
    {
      nr: 14,
      label: 'G14',
      min: 105,
      max: 112,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(104, 112)
    },
    {
      nr: 13,
      label: 'G13',
      min: 97,
      max: 104,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(96, 104)
    },
    {
      nr: 12,
      label: 'G12',
      min: 89,
      max: 96,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(88, 96)
    },
    {
      nr: 11,
      label: 'G11',
      min: 81,
      max: 88,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(80, 88)
    },
    {
      nr: 10,
      label: 'G10',
      min: 73,
      max: 80,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(72, 80)
    },
    {
      nr: 9,
      label: 'G9',
      min: 65,
      max: 72,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(64, 72)
    },
    {
      nr: 8,
      label: 'G8',
      min: 57,
      max: 64,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(56, 64)
    },
    {
      nr: 7,
      label: 'G7',
      min: 49,
      max: 56,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(48, 56)
    },
    {
      nr: 6,
      label: 'G6',
      min: 41,
      max: 48,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(40, 48)
    },
    {
      nr: 5,
      label: 'G5',
      min: 33,
      max: 40,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(32, 40)
    },
    {
      nr: 4,
      label: 'G4',
      min: 25,
      max: 32,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(24, 32)
    },
    {
      nr: 3,
      label: 'G3',
      min: 17,
      max: 24,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(16, 24)
    },
    {
      nr: 2,
      label: 'G2',
      min: 9,
      max: 16,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(8, 16)
    },
    {
      nr: 1,
      label: 'G1',
      min: 1,
      max: 8,
      elevators: [
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ],
      stalls: stalls.slice(0, 8)
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
