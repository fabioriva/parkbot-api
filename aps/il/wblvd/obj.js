const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 0, 17, str.inputs1)
const inputs = inputs1
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 10, str.outputs1)
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
// const device2 = require('./device1')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device]

exports.drives = device1.drives // .concat(device2.drives)

exports.positions = device1.positions // .concat(device2.positions)

exports.modes = str.MODES

exports.overview = {
  devices: [[device1.device]],
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
      label: '1st Basement (P1)',
      min: 1,
      max: 17,
      stalls: stalls.slice(0, 17),
      elevators: []
    },
    {
      nr: 2,
      label: '2nd Basement (P2)',
      min: 18,
      max: 33,
      stalls: stalls.slice(17, 33),
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
