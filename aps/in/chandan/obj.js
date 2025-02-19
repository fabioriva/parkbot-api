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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 3)
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 0, 1, str.inputs1)
// const inputs2 = generateBits('E', 10, 17, str.inputs2)
// const inputs3 = generateBits('E', 20, 27, str.inputs3)
// const inputs4 = generateBits('E', 30, 35, str.inputs4)
// const inputs = inputs1.concat(inputs2, inputs3, inputs4)
// export const inputs_ = inputs
// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 1, str.outputs1)
// const outputs2 = generateBits('A', 10, 17, str.outputs2)
// const outputs3 = generateBits('A', 20, 25, str.outputs3)
// const outputs4 = generateBits('A', 30, 33, str.outputs4)
// const outputs = outputs1.concat(outputs2, outputs3, outputs4)
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

// export const motors = device1.motors.concat(device2.motors, device3.motors)

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
      max: 35,
      stalls: stalls.slice(0, 35),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 2,
      label: '2nd basement (P2)',
      min: 36,
      max: 70,
      stalls: stalls.slice(35, 70),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 3,
      label: '1st basement (P3)',
      min: 71,
      max: 105,
      stalls: stalls.slice(70, 105),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
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
