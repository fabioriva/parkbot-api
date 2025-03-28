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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EU1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU2
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EL
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 0, 11, str.inputs1)
// const inputs2 = generateBits('E', 12, 13, str.inputs2)
// const inputs3 = generateBits('E', 14, 19, str.inputs3)
// const inputs = inputs1.concat(inputs2, inputs3)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 7, str.outputs1)
// const outputs2 = generateBits('A', 12, 13, str.outputs2)
// const outputs3 = generateBits('A', 14, 17, str.outputs3)
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

// const device1 = require('./device1') // EU1
// const device2 = require('./device2') // EU2
// const device3 = require('./device3') // EL

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives
)

// export const motors = device1.motors.concat(
//   device2.motors,
//   device3.motors
// )

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
      label: '3rd basement (P1)',
      min: 1,
      max: 10,
      stalls: stalls.slice(0, 10),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: '2nd basement (P2)',
      min: 11,
      max: 20,
      stalls: stalls.slice(10, 20),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: '1st basement (P3)',
      min: 21,
      max: 28,
      stalls: stalls.slice(20, 28),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 4,
      label: 'Ground level (P4)',
      min: 29,
      max: 32,
      stalls: stalls.slice(28, 32),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 5,
      label: '1st floor (P5)',
      min: 33,
      max: 40,
      stalls: stalls.slice(32, 40),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 6,
      label: '2nd floor (P6)',
      min: 41,
      max: 48,
      stalls: stalls.slice(40, 48),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 7,
      label: '3rd floor (P7)',
      min: 49,
      max: 56,
      stalls: stalls.slice(48, 56),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 8,
      label: '4th floor (P8)',
      min: 57,
      max: 64,
      stalls: stalls.slice(56, 64),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 9,
      label: '5th floor (P9)',
      min: 65,
      max: 72,
      stalls: stalls.slice(64, 72),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 18,
      label: '6th floor (P10)',
      min: 73,
      max: 80,
      stalls: stalls.slice(72, 80),
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
