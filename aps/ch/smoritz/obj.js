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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2) // EL(L)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EL(R)
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 4, 15, str.inputs1)
// const inputs2 = generateBits('E', 28, 31, str.inputs2)
// const inputs3 = generateBits('E', 32, 32, str.inputs3)
// const inputs = inputs1.concat(inputs2, inputs3)
// exports.inputs = inputs
// const eb = generateBytes(inputs)
// exports.eb = eb

// const outputs1 = generateBits('A', 4, 11, str.outputs1)
// const outputs2 = generateBits('A', 28, 29, str.outputs2)
// const outputs3 = generateBits('A', 32, 32, str.outputs3)
// const outputs = outputs1.concat(outputs2, outputs3)
// exports.outputs = outputs
// const ab = generateBytes(outputs)
// exports.ab = ab

// const racks = require('./racks')
// exports.racks = racks

// const merkers = generateBits('M', 0, 7)
// exports.merkers = merkers
// const mb = generateBytes(merkers)
// exports.mb = mb

// const device1 = require('./device1') // EL
// const device2 = require('./device2') // EL(L)
// const device3 = require('./device3') // EL(R)

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device
]

export const drives = device1.drives.concat(device2.drives, device3.drives)

export const positions = device1.positions.concat(device2.positions, device3.positions)

export const modes = str.MODES

export const overview = {
  devices: [[
    device1.device,
    device2.device,
    device3.device
  ]],
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
      label: 'Pano -1 / -2',
      min: 1,
      max: 10,
      stalls: stalls.slice(0, 10),
      elevators: [
        { id: 'el-l', label: '(L)' },
        { id: 'el-r', label: '(R)' }
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
