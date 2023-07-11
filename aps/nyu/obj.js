const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 114, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs4)
const inputs5 = generateBits('E', 210, 214, str.inputs5)
const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 1, str.outputs1)
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 110, 112, str.outputs3)
const outputs4 = generateBits('A', 200, 205, str.outputs4)
const outputs5 = generateBits('A', 210, 212, str.outputs5)
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device, device2.device]

exports.drives = device1.drives.concat(device2.drives)

exports.motors = device1.motors.concat(device2.motors)

exports.positions = device1.positions.concat(device2.positions)

exports.modes = str.MODES

exports.overview = {
  // definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [[device1.device, device2.device]],
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
      label: 'Level +1',
      min: 1,
      max: 18,
      stalls: stalls.slice(0, 18),
      elevators: [
        { id: 'el-a1', label: 'A1' },
        { id: 'el-b1', label: 'B2' }
      ]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 19,
      max: 45,
      stalls: stalls.slice(18, 45),
      elevators: [
        { id: 'el-a2', label: 'A1' },
        { id: 'el-b2', label: 'B2' }
      ]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 46,
      max: 83,
      stalls: stalls.slice(45, 83),
      elevators: [
        { id: 'el-a3', label: 'A1' },
        { id: 'el-b3', label: 'B2' }
      ]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 84,
      max: 121,
      stalls: stalls.slice(83, 121),
      elevators: [
        { id: 'el-a4', label: 'A1' },
        { id: 'el-b4', label: 'B2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
