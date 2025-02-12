const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2) // EU
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 4, 16, str.inputs1)
const inputs = inputs1
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 4, 7, str.outputs1)
const outputs2 = generateBits('A', 12, 16, str.outputs2)
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device, device2.device]

exports.drives = device1.drives.concat(device2.drives)

exports.positions = device1.positions.concat(device2.positions)

exports.modes = str.MODES

exports.overview = {
  devices: [[device1.device, device2.device]],
  exitQueue: {
    queueList: queue,
    exitButton: new Action(
      'action-exit',
      merkers.find((b) => b.addr === 'M3.0'),
      def.REQ_0,
      1,
      def.CARDS
    )
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
      label: 'Level -5 (P1)',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 12),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Level -4 (P2)',
      min: 13,
      max: 24,
      stalls: stalls.slice(12, 24),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Level -3 (P3)',
      min: 25,
      max: 36,
      stalls: stalls.slice(24, 36),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 4,
      label: 'Level -2 (P2)',
      min: 37,
      max: 48,
      stalls: stalls.slice(36, 48),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 5,
      label: 'Level -1 (P4)',
      min: 49,
      max: 50,
      stalls: stalls.slice(48, 50),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    }

  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
