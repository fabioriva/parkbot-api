const def = require('./def')
const str = require('./str')
const { Action } = require('../../models/Action')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4)
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5)
exports.alarms = [al01, al02, al03, al04, al05]

const inputs1 = generateBits('E', 0, 19, str.inputs1)
const inputs2 = generateBits('E', 20, 25, str.inputs2)
const inputs3 = generateBits('E', 26, 31, str.inputs3)
const inputs4 = generateBits('E', 32, 34, str.inputs4)
const inputs = inputs1.concat(inputs2, inputs3, inputs4)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 11, str.outputs1)
const outputs2 = generateBits('A', 20, 23, str.outputs2)
const outputs3 = generateBits('A', 26, 29, str.outputs3)
const outputs4 = generateBits('A', 32, 33, str.outputs4)
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
const device5 = require('./device5')

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device
]

exports.drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives
)

// exports.motors = device1.motors.concat(
//   device2.motors,
//   device3.motors,
//   device4.motors,
//   device5.motors
// )

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions
)

exports.modes = str.MODES

const queue = generateQueue(def)
exports.queue = queue

exports.overview = {
  devices: [
    [device1.device, device2.device],
    [device3.device, device4.device, device5.device]
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

const B3 = [
  stalls[0],
  stalls[1],
  stalls[8],
  stalls[9],
  stalls[16],
  stalls[17],
  stalls[24],
  stalls[25],
  stalls[30],
  stalls[31],
  stalls[36],
  stalls[37],
  stalls[42],
  stalls[43],
  stalls[44],
  stalls[50],
  stalls[51],
  stalls[52],
  stalls[58],
  stalls[59],
  stalls[60],
  stalls[66],
  stalls[67],
  stalls[68],
  stalls[74],
  stalls[75],
  stalls[76],
  stalls[82],
  stalls[83],
  stalls[84],
  stalls[90],
  stalls[91],
  stalls[92],
  stalls[98],
  stalls[99],
  stalls[100],
  stalls[106],
  stalls[107],
  stalls[108]
]

const B2 = [
  stalls[2],
  stalls[3],
  stalls[10],
  stalls[11],
  stalls[18],
  stalls[19],
  stalls[26],
  stalls[27],
  stalls[32],
  stalls[33],
  stalls[38],
  stalls[39],
  stalls[45],
  stalls[46],
  stalls[47],
  stalls[53],
  stalls[54],
  stalls[55],
  stalls[61],
  stalls[62],
  stalls[63],
  stalls[69],
  stalls[70],
  stalls[71],
  stalls[77],
  stalls[78],
  stalls[79],
  stalls[85],
  stalls[86],
  stalls[87],
  stalls[93],
  stalls[94],
  stalls[95],
  stalls[101],
  stalls[102],
  stalls[103],
  stalls[109],
  stalls[110],
  stalls[111]
]

const B0 = [
  stalls[4],
  stalls[5],
  stalls[12],
  stalls[13],
  stalls[20],
  stalls[21],
  stalls[28],
  stalls[34],
  stalls[40],
  stalls[48],
  stalls[56],
  stalls[64],
  stalls[72],
  stalls[80],
  stalls[88],
  stalls[96],
  stalls[104],
  stalls[112]
]

const B1 = [
  stalls[6],
  stalls[7],
  stalls[14],
  stalls[15],
  stalls[22],
  stalls[23],
  stalls[29],
  stalls[35],
  stalls[41],
  stalls[49],
  stalls[57],
  stalls[65],
  stalls[73],
  stalls[81],
  stalls[89],
  stalls[97],
  stalls[105],
  stalls[113]
]

exports.map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'Level B3 (-2)',
      min: 1,
      max: 39,
      stalls: B3,
      elevators: [
        { id: 'el-1', label: 'T1' },
        { id: 'el-2', label: 'T2' }
      ]
    },
    {
      nr: 2,
      label: 'Level B2 (-1)',
      min: 40,
      max: 39,
      stalls: B2,
      elevators: [
        { id: 'el-1', label: 'T1' },
        { id: 'el-2', label: 'T2' }
      ]
    },
    {
      nr: 3,
      label: 'Level B0',
      min: 40,
      max: 39,
      stalls: B0,
      elevators: [
        { id: 'el-1', label: 'T1' },
        { id: 'el-2', label: 'T2' },
        { id: 'vg-a', label: 'A' },
        { id: 'vg-b', label: 'B' },
        { id: 'vg-c', label: 'C' }
      ]
    },
    {
      nr: 4,
      label: 'Level B1',
      min: 40,
      max: 39,
      stalls: B1,
      elevators: [
        { id: 'el-1', label: 'T1' },
        { id: 'el-2', label: 'T2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
