import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // T
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64)), 2) // EU1
export const alarms = [al01, al02]

// const inputs1 = generateBits('E', 0, 9, str.inputs1)
// const inputs2 = generateBits('E', 10, 16, str.inputs2)
// const inputs = inputs1.concat(inputs2)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 7, str.outputs1)
// const outputs2 = generateBits('A', 10, 13, str.outputs2)
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

export const devices = [device1.device, device2.device]

export const drives = device1.drives.concat(device2.drives)

export const positions = device1.positions.concat(device2.positions)

export const modes = str.MODES

export const overview = {
  devices: [[device1.device, device2.device]],
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
      label: '1st Basement (P1)',
      min: 1,
      max: 18,
      stalls: stalls.slice(0, 18),
      elevators: []
    },
    {
      nr: 2,
      label: '2nd Basement (P2)',
      min: 19,
      max: 36,
      stalls: stalls.slice(18, 36),
      elevators: []
    },
    {
      nr: 3,
      label: '3rd Basement (P3)',
      min: 37,
      max: 54,
      stalls: stalls.slice(36, 54),
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
