import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // T
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2) // EU1
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EU2
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 0, 8, str.inputs1)
// const inputs2 = generateBits('E', 20, 35, str.inputs2)
// const inputs = inputs1.concat(inputs2)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 6, str.outputs1)
// const outputs2 = generateBits('A', 20, 29, str.outputs2)
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
// const device2 = require('./device2')
// const device3 = require('./device3')

export const queue = generateQueue(def)

export const devices = [device1.device, device2.device, device3.device]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives
)

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions
)

export const modes = str.MODES

export const overview = {
  devices: [[device1.device, device2.device, device3.device]],
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
      label: '5th Basement (P1)',
      min: 1,
      max: 22,
      stalls: stalls.slice(0, 22),
      elevators: []
    },
    {
      nr: 2,
      label: '4th Basement (P2)',
      min: 23,
      max: 42,
      stalls: stalls.slice(22, 42),
      elevators: [
        { id: 'el-1', label: 'VT1' },
        { id: 'el-2', label: 'VT2' }
      ]
    },
    {
      nr: 3,
      label: '3rd Basement (P3)',
      min: 42,
      max: 62,
      stalls: stalls.slice(42, 62),
      elevators: [
        { id: 'el-1', label: 'VT1' },
        { id: 'el-2', label: 'VT2' }
      ]
    },
    {
      nr: 4,
      label: '2nd Basement (P4)',
      min: 63,
      max: 83,
      stalls: stalls.slice(62, 83),
      elevators: [
        { id: 'el-1', label: 'VT1' },
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
