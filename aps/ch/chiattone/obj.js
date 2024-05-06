const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4)
exports.alarms = [al01, al02, al03, al04]

const inputs1 = generateBits('E', 0, 13, str.inputs1)
const inputs2 = generateBits('E', 20, 23, str.inputs2)
const inputs3 = generateBits('E', 30, 33, str.inputs3)
const inputs = inputs1.concat(inputs2, inputs3)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 10, 13, str.outputs2)
const outputs3 = generateBits('A', 20, 23, str.outputs3)
const outputs4 = generateBits('A', 30, 33, str.outputs4)
const outputs = outputs1.concat(outputs2, outputs3, outputs4)
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

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions
)

exports.modes = str.MODES

exports.overview = {
  devices: [[device1.device, device2.device], [device3.device, device4.device]],
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
      label: 'Piano -1 (SH1)',
      min: 1,
      max: 13,
      stalls: stalls.slice(0, 13),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Piano -2 (SH2)',
      min: 14,
      max: 26,
      stalls: stalls.slice(13, 26),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Piano -3 (SH3)',
      min: 27,
      max: 40,
      stalls: stalls.slice(26, 40),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
