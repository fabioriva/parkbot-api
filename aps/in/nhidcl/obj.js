import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import device4 from './device4.js'
import device5 from './device5.js'
import device6 from './device6.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
export const alarms = [al01, al02]

// const inputs1 = generateBits('E', 0, 3, str.inputs1)
// const inputs2 = generateBits('E', 100, 109, str.inputs2)
// const inputs3 = generateBits('E', 110, 111, str.inputs3)
// const inputs4 = generateBits('E', 120, 125, str.inputs4)
// const inputs5 = generateBits('E', 200, 209, str.inputs2)
// const inputs6 = generateBits('E', 210, 211, str.inputs3)
// const inputs7 = generateBits('E', 220, 225, str.inputs4)
// const inputs = inputs1.concat(
//   inputs2,
//   inputs3,
//   inputs4,
//   inputs5,
//   inputs6,
//   inputs7
// )
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 3, str.outputs1)
// const outputs2 = generateBits('A', 100, 107, str.outputs2)
// const outputs3 = generateBits('A', 110, 111, str.outputs3)
// const outputs4 = generateBits('A', 120, 123, str.outputs4)
// const outputs5 = generateBits('A', 200, 207, str.outputs2)
// const outputs6 = generateBits('A', 210, 211, str.outputs3)
// const outputs7 = generateBits('A', 220, 223, str.outputs4)
// const outputs = outputs1.concat(
//   outputs2,
//   outputs3,
//   outputs4,
//   outputs5,
//   outputs6,
//   outputs7
// )
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
// const device5 = require('./device5')
// const device6 = require('./device6')

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives,
  device6.drives
)

// export const motors = device1.motors.concat(
//   device2.motors,
//   device3.motors,
//   device4.motors,
//   device5.motors,
//   device6.motors
// )

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions
)

export const modes = str.MODES

export const overview = {
  devices: [
    [device3.device, device1.device, device4.device],
    [device5.device, device2.device, device6.device]
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
      label: 'Level +1',
      min: 1,
      max: 16,
      stalls: stalls.slice(0, 16),
      elevators: [
        { id: 'el-a1', label: 'A1' },
        { id: 'el-b1', label: 'B2' }
      ]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 17,
      max: 32,
      stalls: stalls.slice(16, 32),
      elevators: [
        { id: 'el-a2', label: 'A1' },
        { id: 'el-b2', label: 'B2' }
      ]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 33,
      max: 48,
      stalls: stalls.slice(32, 48),
      elevators: [
        { id: 'el-a3', label: 'A1' },
        { id: 'el-b3', label: 'B2' }
      ]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 49,
      max: 64,
      stalls: stalls.slice(48, 64),
      elevators: [
        { id: 'el-a4', label: 'A1' },
        { id: 'el-b4', label: 'B2' }
      ]
    },
    {
      nr: 5,
      label: 'Level +5',
      min: 65,
      max: 80,
      stalls: stalls.slice(64, 80),
      elevators: [
        { id: 'el-a5', label: 'A1' },
        { id: 'el-b5', label: 'B2' }
      ]
    },
    {
      nr: 6,
      label: 'Level +6',
      min: 81,
      max: 96,
      stalls: stalls.slice(80, 96),
      elevators: [
        { id: 'el-a6', label: 'A1' },
        { id: 'el-b6', label: 'B2' }
      ]
    },
    {
      nr: 7,
      label: 'Level +7',
      min: 97,
      max: 112,
      stalls: stalls.slice(96, 112),
      elevators: [
        { id: 'el-a7', label: 'A1' },
        { id: 'el-b7', label: 'B2' }
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
