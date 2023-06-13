const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // 'E1')
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // 'U1')
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // 'T')
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 0, 19, str.inputs1)
const inputs = inputs1
exports.inputs = inputs

const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 13, str.outputs1)
const outputs = outputs1
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

exports.devices = [
  device1.device,
  device2.device,
  device3.device
]

// exports.inverters = device1.inverters.concat(
//   device2.inverters,
//   device3.inverters
// )

// exports.motors = device1.motors.concat(
//   device2.motors,
//   device3.motors
// )

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions
)

// exports.diagnostic = [
//   device1,
//   device2,
//   device3
// ]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view
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
      label: 'Level 1',
      min: 1,
      max: 10,
      stalls: stalls.slice(0, 10),
      elevators: [
        { id: 'el', label: 'T' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 11,
      max: 20,
      stalls: stalls.slice(10, 20),
      elevators: [
        { id: 'el', label: 'T' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 21,
      max: 30,
      stalls: stalls.slice(20, 30),
      elevators: [
        { id: 'el', label: 'T' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
