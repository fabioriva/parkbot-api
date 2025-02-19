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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2) // EU
export const alarms = [al01, al02]

// const inputs1 = generateBits('E', 4, 11, str.inputs1)
// const inputs2 = generateBits('E', 12, 12, str.inputs2)
// const inputs3 = generateBits('E', 24, 25, str.inputs3)
// const inputs4 = generateBits('E', 0, 4, str.inputs4)
// const inputs = inputs1.concat(inputs2, inputs3)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb
// // shuttle I/O
// const inputsSH = inputs4
// export const inputsSH = inputsSH
// const ebSH = generateBytes(inputsSH)
// export const ebSH = ebSH

// const outputs1 = generateBits('A', 4, 7, str.outputs1)
// const outputs2 = generateBits('A', 12, 12, str.outputs2)
// const outputs3 = generateBits('A', 24, 25, str.outputs3)
// const outputs4 = generateBits('A', 0, 2, str.outputs4)
// const outputs = outputs1.concat(outputs2, outputs3)
// export const outputs = outputs
// const ab = generateBytes(outputs)
// export const ab = ab
// // shuttle I/O
// const outputsSH = outputs4
// export const outputsSH = outputsSH
// const abSH = generateBytes(outputsSH)
// export const abSH = abSH

// const merkers = generateBits('M', 0, 7)
// export const merkers = merkers
// const mb = generateBytes(merkers)
// export const mb = mb

// const racks = require('./racks')
// export const racks = racks

// const device1 = require('./device1')
// const device2 = require('./device2')

export const queue = generateQueue(def)

export const devices = [device1.device, device2.device]

export const drives = device1.drives.concat(device2.drives)

export const positions = device1.positions.concat(device2.positions)

export const modes = str.MODES

export const overview = {
  devices: [[device1.device, device2.device]],
  exitQueue: {
    queueList: queue,
    exitButton: new Action(
      'action-exit',
      io.merkers.find((b) => b.addr === 'M3.0'),
      def.REQ_0,
      1,
      def.CARDS
    )
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
      label: 'Piano -4 (P1)',
      min: 1,
      max: 9,
      stalls: stalls.slice(0, 9),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Piano -3 (P2)',
      min: 10,
      max: 18,
      stalls: stalls.slice(9, 18),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Piano -2 (P3)',
      min: 19,
      max: 27,
      stalls: stalls.slice(18, 27),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 4,
      label: 'Piano -1 (P4)',
      min: 28,
      max: 34,
      stalls: stalls.slice(27, 34),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 5,
      label: 'Piano +1 (P6)',
      min: 35,
      max: 43,
      stalls: stalls.slice(34, 43),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 6,
      label: 'Piano +2 (P7)',
      min: 44,
      max: 52,
      stalls: stalls.slice(43, 52),
      elevators: [
        { id: 'el', label: 'EL' }
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
