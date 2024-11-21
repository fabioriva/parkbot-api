const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // T1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // T2
// const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64)), 3) // EU1
// const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64)), 4) // EU2
exports.alarms = [al01, al02] // , al03, al04]

const inputs1 = generateBits('E', 0, 7, str.inputs1)
const inputs2 = generateBits('E', 10, 16, str.inputs2)
const inputs3 = generateBits('E', 100, 107, str.inputs3)
const inputs4 = generateBits('E', 110, 116, str.inputs4)
const inputs = inputs1.concat(inputs2, inputs3, inputs4)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 10, 13, str.outputs2)
const outputs3 = generateBits('A', 100, 105, str.outputs3)
const outputs4 = generateBits('A', 110, 113, str.outputs4)
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

exports.devices = [device1.device, device2.device, device3.device, device4.device]

exports.drives = device1.drives.concat(device2.drives, device3.drives, device4.drives)

exports.positions = device1.positions.concat(device2.positions, device3.positions, device4.positions)

exports.modes = str.MODES

exports.overview = {
  devices: [
    [device1.device, device2.device],
    [device3.device, device4.device]
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
      label: '1st Basement (P1)',
      min: 1,
      max: 24,
      stalls: stalls.slice(0, 24),
      elevators: []
    },
    {
      nr: 2,
      label: '2nd Basement (P2)',
      min: 25,
      max: 48,
      stalls: stalls.slice(24, 48),
      elevators: []
    },
    {
      nr: 3,
      label: '3rd Basement (P3)',
      min: 49,
      max: 72,
      stalls: stalls.slice(48, 72),
      elevators: []
    },
    {
      nr: 4,
      label: '4rd Basement (P4)',
      min: 73,
      max: 96,
      stalls: stalls.slice(72, 96),
      elevators: [
        { id: 'eu-1', label: 'EU1' },
        { id: 'eu-2', label: 'EU2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
