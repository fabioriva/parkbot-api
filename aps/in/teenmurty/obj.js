const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 3)
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 0, 7, str.inputs1)
const inputs2 = generateBits('E', 10, 15, str.inputs2)
const inputs = inputs1.concat(inputs2)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 10, 13, str.outputs2)
const outputs = outputs1.concat(outputs2)
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device, device2.device, device3.device]

exports.drives = device1.drives.concat(device2.drives, device3.drives)

exports.motors = device1.motors.concat(device2.motors, device3.motors)

exports.positions = device1.positions.concat(device2.positions, device3.positions)

exports.modes = str.MODES

exports.overview = {
  devices: [[device1.device, device2.device, device3.device]],
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
      label: 'Level +1',
      min: 1,
      max: 6,
      stalls: stalls.slice(0, 6),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 7,
      max: 12,
      stalls: stalls.slice(6, 12),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 13,
      max: 18,
      stalls: stalls.slice(12, 18),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 19,
      max: 24,
      stalls: stalls.slice(18, 24),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 5,
      label: 'Level +5',
      min: 25,
      max: 30,
      stalls: stalls.slice(24, 30),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 6,
      label: 'Level +6',
      min: 31,
      max: 36,
      stalls: stalls.slice(30, 36),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 7,
      label: 'Level +7',
      min: 37,
      max: 42,
      stalls: stalls.slice(36, 42),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 8,
      label: 'Level +8',
      min: 43,
      max: 48,
      stalls: stalls.slice(42, 48),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 9,
      label: 'Level +9',
      min: 49,
      max: 54,
      stalls: stalls.slice(48, 54),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 10,
      label: 'Level +10',
      min: 55,
      max: 60,
      stalls: stalls.slice(54, 60),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 11,
      label: 'Level +11',
      min: 61,
      max: 66,
      stalls: stalls.slice(60, 66),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 12,
      label: 'Level +12',
      min: 67,
      max: 72,
      stalls: stalls.slice(66, 72),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 13,
      label: 'Level +13',
      min: 73,
      max: 78,
      stalls: stalls.slice(72, 78),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 14,
      label: 'Level +14',
      min: 79,
      max: 84,
      stalls: stalls.slice(78, 84),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 15,
      label: 'Level +15',
      min: 85,
      max: 90,
      stalls: stalls.slice(84, 90),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 16,
      label: 'Level +16',
      min: 91,
      max: 96,
      stalls: stalls.slice(90, 96),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 17,
      label: 'Level +17',
      min: 97,
      max: 102,
      stalls: stalls.slice(96, 102),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 18,
      label: 'Level +18',
      min: 103,
      max: 108,
      stalls: stalls.slice(102, 108),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 19,
      label: 'Level +19',
      min: 109,
      max: 114,
      stalls: stalls.slice(108, 114),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 20,
      label: 'Level +20',
      min: 115,
      max: 120,
      stalls: stalls.slice(114, 120),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 21,
      label: 'Level +21',
      min: 121,
      max: 126,
      stalls: stalls.slice(120, 126),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 22,
      label: 'Level +22',
      min: 127,
      max: 132,
      stalls: stalls.slice(126, 132),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 23,
      label: 'Level +23',
      min: 133,
      max: 138,
      stalls: stalls.slice(132, 138),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 24,
      label: 'Level +24',
      min: 139,
      max: 144,
      stalls: stalls.slice(138, 144),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 25,
      label: 'Level +25',
      min: 145,
      max: 150,
      stalls: stalls.slice(144, 150),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 26,
      label: 'Level +26',
      min: 151,
      max: 156,
      stalls: stalls.slice(150, 156),
      elevators: [{ id: 'el', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
