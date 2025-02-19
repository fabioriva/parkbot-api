import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS), 1)
export const alarms = [al01]

// const inputs1 = generateBits('E', 0, 7, str.inputs1)
// const inputs2 = generateBits('E', 8, 9, str.inputs2)
// const inputs3 = generateBits('E', 10, 15, str.inputs3)
// const inputs = inputs1.concat(inputs2, inputs3)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 5, str.outputs1)
// const outputs2 = generateBits('A', 6, 7, str.outputs2)
// const outputs3 = generateBits('A', 8, 11, str.outputs3)
// const outputs = outputs1.concat(outputs2, outputs3)
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

export const queue = generateQueue(def)

export const devices = [device1.device]

export const drives = device1.drives

// export const motors = device1.motors

export const positions = device1.positions

export const modes = str.MODES

export const overview = {
  devices: [[device1.device]],
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
      max: 8,
      stalls: stalls.slice(0, 8),
      elevators: [{ id: 'el-a1', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 9,
      max: 16,
      stalls: stalls.slice(8, 16),
      elevators: [{ id: 'el-a2', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 17,
      max: 24,
      stalls: stalls.slice(16, 24),
      elevators: [{ id: 'el-a3', label: 'EL' }]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 25,
      max: 32,
      stalls: stalls.slice(24, 32),
      elevators: [{ id: 'el-a4', label: 'EL' }]
    },
    {
      nr: 5,
      label: 'Level +5',
      min: 33,
      max: 40,
      stalls: stalls.slice(32, 40),
      elevators: [{ id: 'el-a5', label: 'EL' }]
    },
    {
      nr: 6,
      label: 'Level +6',
      min: 41,
      max: 48,
      stalls: stalls.slice(40, 48),
      elevators: [{ id: 'el-a6', label: 'EL' }]
    },
    {
      nr: 7,
      label: 'Level +7',
      min: 49,
      max: 56,
      stalls: stalls.slice(48, 56),
      elevators: [{ id: 'el-a7', label: 'EL' }]
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
