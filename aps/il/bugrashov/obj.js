const def = require('./def')
const str = require('./str')
const { Action } = require('../../../models/Action')
const { Alarms, generateAlarms } = require('../../../models/Alarm')
const { generateBits, generateBytes } = require('../../../models/Bit')
const { generateCards } = require('../../../models/Card')
const { generateQueue } = require('../../../models/Queue')
const { generateStalls } = require('../../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // VT1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // VT2
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3) // VT3
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 4) // VT4
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5) // SH1
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6) // SH2
const al07 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 7) // SH3
const al08 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 8) // SH4
const al09 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 9) // SH5
const al10 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 10) // SH6
const al11 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 11) // SH7
exports.alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10, al11]

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 113, str.inputs2)
const inputs3 = generateBits('E', 200, 213, str.inputs2)
const inputs4 = generateBits('E', 300, 313, str.inputs2)
const inputs5 = generateBits('E', 400, 413, str.inputs2)
const inputs6 = generateBits('E', 1000, 1005, str.inputs3)
const inputs7 = generateBits('E', 1100, 1105, str.inputs3)
const inputs8 = generateBits('E', 1200, 1205, str.inputs3)
const inputs9 = generateBits('E', 1300, 1305, str.inputs3)
const inputs10 = generateBits('E', 1400, 1405, str.inputs3)
const inputs11 = generateBits('E', 1500, 1505, str.inputs3)
const inputs12 = generateBits('E', 1600, 1605, str.inputs3)
const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9,
  inputs10,
  inputs11,
  inputs12
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 107, str.outputs2)
const outputs3 = generateBits('A', 200, 207, str.outputs2)
const outputs4 = generateBits('A', 300, 307, str.outputs2)
const outputs5 = generateBits('A', 400, 407, str.outputs2)
const outputs6 = generateBits('A', 1000, 1003, str.outputs3)
const outputs7 = generateBits('A', 1100, 1103, str.outputs3)
const outputs8 = generateBits('A', 1200, 1203, str.outputs3)
const outputs9 = generateBits('A', 1300, 1303, str.outputs3)
const outputs10 = generateBits('A', 1400, 1403, str.outputs3)
const outputs11 = generateBits('A', 1500, 1503, str.outputs3)
const outputs12 = generateBits('A', 1600, 1603, str.outputs3)
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
  outputs11,
  outputs12
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
const device6 = require('./device5')
const device7 = require('./device5')
const device8 = require('./device5')
const device9 = require('./device5')
const device10 = require('./device5')
const device11 = require('./device5')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device,
  device7.device,
  device8.device,
  device9.device,
  device10.device,
  device11.device
]

exports.drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives,
  device6.drives,
  device7.drives,
  device8.drives,
  device9.drives,
  device10.drives,
  device11.drives
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions,
  device7.positions,
  device8.positions,
  device9.positions,
  device10.positions,
  device11.positions
)

exports.modes = str.MODES

exports.overview = {
  devices: [
    [device1.device, device2.device, device3.device, device4.device],
    [device5.device, device6.device, device7.device, device8.device],
    [device9.device, device10.device, device11.device]
  ],
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
      label: '4th Basement (P1)',
      min: 1,
      max: 70,
      stalls: stalls.slice(0, 70),
      elevators: [
        { id: 'el-1', label: 'VT1' },
        { id: 'el-2', label: 'VT2' },
        { id: 'el-3', label: 'VT3' },
        { id: 'el-4', label: 'VT4' }
      ]
    },
    {
      nr: 2,
      label: '3rd Basement (P2)',
      min: 71,
      max: 140,
      stalls: stalls.slice(70, 140),
      elevators: [
        { id: 'el-1', label: 'VT1' },
        { id: 'el-2', label: 'VT2' },
        { id: 'el-3', label: 'VT3' },
        { id: 'el-4', label: 'VT4' }
      ]
    },
    {
      nr: 3,
      label: '2nd Basement (P3)',
      min: 141,
      max: 210,
      stalls: stalls.slice(140, 210),
      elevators: [
        { id: 'el-1', label: 'VT1' },
        { id: 'el-2', label: 'VT2' },
        { id: 'el-3', label: 'VT3' },
        { id: 'el-4', label: 'VT4' }
      ]
    },
    {
      nr: 4,
      label: '1st Basement (P4)',
      min: 211,
      max: 229,
      stalls: stalls.slice(210, 229),
      elevators: [
        { id: 'el-2', label: 'VT2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
