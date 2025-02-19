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

// const inputs1 = generateBits('E', 4, 13, str.inputs1)
// const inputs2 = generateBits('E', 14, 17, str.inputs2)
// const inputs = inputs1.concat(inputs2)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 4, 9, str.outputs1)
// const outputs2 = generateBits('A', 14, 15, str.outputs2)
// const outputs = outputs1.concat(outputs2)
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
      label: 'Level -3',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 13),
      elevators: [{ id: 'el-1', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level -2',
      min: 13,
      max: 26,
      stalls: stalls.slice(13, 26),
      elevators: [{ id: 'el-2', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 27,
      max: 40,
      stalls: stalls.slice(26, 40),
      elevators: [{ id: 'el-3', label: 'EL' }]
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
