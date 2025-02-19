import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import device4 from './device4.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // 'EL1')
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // 'EL2')
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // 'ELA')
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4) // 'ELB')
export const alarms = [al01, al02, al03, al04]

// const inputs1 = generateBits('E', 0, 1, str.inputs1)
// const inputs2 = generateBits('E', 10, 21, str.inputs2)
// const inputs3 = generateBits('E', 30, 39, str.inputs3)
// const inputs4 = generateBits('E', 40, 51, str.inputs4)
// const inputs5 = generateBits('E', 60, 69, str.inputs5)
// const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5)
// export const inputs_ = inputs

// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 1, str.outputs1)
// const outputs2 = generateBits('A', 10, 17, str.outputs2)
// const outputs3 = generateBits('A', 30, 37, str.outputs3)
// const outputs4 = generateBits('A', 40, 47, str.outputs4)
// const outputs5 = generateBits('A', 60, 67, str.outputs5)
// const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5)
// export const outputs = outputs

// const ab = generateBytes(outputs)
// export const ab = ab

// const merkers = generateBits('M', 0, 7)
// export const merkers = merkers
// const mb = generateBytes(merkers)
// export const mb = mb

// const racks = require('./racks')
// export const racks = racks

// const device1 = require('./device1')
// const device2 = require('./device2')
// const device3 = require('./device3')
// const device4 = require('./device4')

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives
)

// export const motors = device1.motors.concat(
//   device2.motors,
//   device3.motors,
//   device4.motors
// )

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions
)

export const modes = str.MODES

export const overview = {
  devices: [
    [device1.device, device2.device],
    [device3.device, device4.device]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
  }
}

export const cards = generateCards(def)

export const stalls = generateStalls(def)

export const map = {
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
      max: 32,
      stalls: stalls.slice(0, 32),
      elevators: [
        { id: 'el-1', label: 'ELA' }
        // { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 33,
      max: 64,
      stalls: stalls.slice(32, 64),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 65,
      max: 96,
      stalls: stalls.slice(64, 96),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 4,
      label: 'Level 4',
      min: 97,
      max: 128,
      stalls: stalls.slice(96, 128),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 5,
      label: 'Level 5',
      min: 129,
      max: 160,
      stalls: stalls.slice(128, 160),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 6,
      label: 'Level 6',
      min: 161,
      max: 192,
      stalls: stalls.slice(160, 192),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 7,
      label: 'Level 7',
      min: 225,
      max: 225,
      stalls: stalls.slice(224),
      elevators: [
        { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    },
    {
      nr: 8,
      label: 'Level 8',
      min: 193,
      max: 224,
      stalls: stalls.slice(192, 224),
      elevators: [
        // { id: 'el-1', label: 'ELA' },
        { id: 'el-2', label: 'ELB' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}

export default {
  ...io,
  alarms,
  cards,
  devices,
  drives,
  map,
  modes,
  overview,
  positions,
  queue,
  racks,
  stalls
}
