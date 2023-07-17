const def = require('./def')
const str = require('./str')
const { Action } = require('../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // 'EL1')
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // 'EL2')
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // 'E1')
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4) // 'E2')
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 5) // 'U1')
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 6) // 'U2')
exports.alarms = [al01, al02, al03, al04, al05, al06]

const inputs1 = generateBits('E', 0, 1, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 117, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs4)
const inputs5 = generateBits('E', 210, 217, str.inputs5)
const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5)
exports.inputs = inputs

const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 1, str.outputs1)
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 110, 117, str.outputs3)
const outputs4 = generateBits('A', 200, 205, str.outputs4)
const outputs5 = generateBits('A', 210, 217, str.outputs5)
const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5)
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
  devices: [
    [device1.device, device2.device, device3.device],
    [device4.device, device5.device, device6.device]
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

exports.map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'Level 1',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 12),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 13,
      max: 24,
      stalls: stalls.slice(12, 24),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 25,
      max: 36,
      stalls: stalls.slice(24, 36),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 4,
      label: 'Level 4',
      min: 37,
      max: 48,
      stalls: stalls.slice(36, 48),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 5,
      label: 'Level 5',
      min: 49,
      max: 60,
      stalls: stalls.slice(48, 60),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 6,
      label: 'Level 6',
      min: 61,
      max: 72,
      stalls: stalls.slice(60, 72),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 7,
      label: 'Level 7',
      min: 73,
      max: 84,
      stalls: stalls.slice(72, 84),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 8,
      label: 'Level 8',
      min: 85,
      max: 96,
      stalls: stalls.slice(84, 96),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 9,
      label: 'Level 9',
      min: 97,
      max: 108,
      stalls: stalls.slice(96, 108),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 10,
      label: 'Level 10',
      min: 109,
      max: 120,
      stalls: stalls.slice(108, 120),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 11,
      label: 'Level 11',
      min: 121,
      max: 132,
      stalls: stalls.slice(120, 132),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 12,
      label: 'Level 12',
      min: 133,
      max: 144,
      stalls: stalls.slice(132, 144),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 13,
      label: 'Level 13',
      min: 145,
      max: 156,
      stalls: stalls.slice(144, 156),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 14,
      label: 'Level 14',
      min: 157,
      max: 168,
      stalls: stalls.slice(156, 168),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 15,
      label: 'Level 15',
      min: 169,
      max: 180,
      stalls: stalls.slice(168, 180),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 16,
      label: 'Level 16',
      min: 181,
      max: 192,
      stalls: stalls.slice(180, 192),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 17,
      label: 'Level 17',
      min: 193,
      max: 204,
      stalls: stalls.slice(192, 204),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 18,
      label: 'Level 18',
      min: 205,
      max: 216,
      stalls: stalls.slice(204, 216),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 19,
      label: 'Level 19',
      min: 217,
      max: 228,
      stalls: stalls.slice(216, 228),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 20,
      label: 'Level 20',
      min: 229,
      max: 240,
      stalls: stalls.slice(228, 240),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
