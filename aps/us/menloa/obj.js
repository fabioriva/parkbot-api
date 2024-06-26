const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
// const { generateCards } = require('../../../models/Card')
const { generateTags } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EU1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4) // T1
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5)
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6)
exports.alarms = [al01, al02, al03, al04, al05, al06]

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 200, 205, str.inputs3)
const inputs4 = generateBits('E', 300, 307, str.inputs4)
const inputs5 = generateBits('E', 400, 405, str.inputs5)
const inputs6 = generateBits('E', 500, 507, str.inputs6)
const inputs7 = generateBits('E', 600, 605, str.inputs7)
const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 200, 205, str.outputs3)
const outputs4 = generateBits('A', 300, 303, str.outputs4)
const outputs5 = generateBits('A', 400, 405, str.outputs5)
const outputs6 = generateBits('A', 500, 503, str.outputs6)
const outputs7 = generateBits('A', 600, 605, str.outputs7)
const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7
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

// const cards = generateCards(def)
const cards = generateTags(def)
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
      max: 65,
      stalls: stalls.slice(0, 65),
      elevators: [
        { id: 'el-1', label: 'EU1' },
        { id: 'el-2', label: 'EU2' },
        { id: 'el-3', label: 'EU3' }
      ]
    },
    {
      nr: 2,
      label: '2nd Level (P2)',
      min: 66,
      max: 157,
      stalls: stalls.slice(65, 157),
      elevators: [
        // { id: 'el-1', label: 'EU1' },
        // { id: 'el-2', label: 'EU2' },
        // { id: 'el-3', label: 'EU3' }
      ]
    },
    {
      nr: 3,
      label: '3rd Level (P3)',
      min: 158,
      max: 248,
      stalls: stalls.slice(157, 248),
      elevators: [
        // { id: 'el-1', label: 'EU1' },
        // { id: 'el-2', label: 'EU2' },
        // { id: 'el-3', label: 'EU3' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
