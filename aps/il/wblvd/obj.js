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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU
export const alarms = [al01, al02]

// const inputs1 = generateBits('E', 0, 17, str.inputs1)
// const inputs = inputs1
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 10, str.outputs1)
// const outputs = outputs1
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

export const drives = device1.drives // .concat(device2.drives)

export const positions = device1.positions // .concat(device2.positions)

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
      label: '1st Basement (P1)',
      min: 1,
      max: 17,
      stalls: stalls.slice(0, 17),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: '2nd Basement (P2)',
      min: 18,
      max: 33,
      stalls: stalls.slice(17, 33),
      elevators: [
        { id: 'el-1', label: 'EL' }
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
