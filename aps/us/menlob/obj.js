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
import { generateTags } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EU1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4) // T1
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5)
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6)
export const alarms = [al01, al02, al03, al04, al05, al06]

// const inputs1 = generateBits('E', 0, 3, str.inputs1)
// const inputs2 = generateBits('E', 100, 107, str.inputs2)
// const inputs3 = generateBits('E', 200, 205, str.inputs3)
// const inputs4 = generateBits('E', 300, 307, str.inputs4)
// const inputs5 = generateBits('E', 400, 405, str.inputs5)
// const inputs6 = generateBits('E', 500, 507, str.inputs6)
// const inputs7 = generateBits('E', 600, 605, str.inputs7)
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
// const outputs2 = generateBits('A', 100, 103, str.outputs2)
// const outputs3 = generateBits('A', 200, 205, str.outputs3)
// const outputs4 = generateBits('A', 300, 303, str.outputs4)
// const outputs5 = generateBits('A', 400, 405, str.outputs5)
// const outputs6 = generateBits('A', 500, 503, str.outputs6)
// const outputs7 = generateBits('A', 600, 605, str.outputs7)
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
    [device1.device, device2.device, device3.device],
    [device4.device, device5.device, device6.device]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, def.MIN_CARD, def.MAX_CARD)
  }
}

export const cards = generateTags(def)

export const stalls = generateStalls(def)

export const map = {
  definitions: {
    cards: def.CARDS,
    minCard: def.MIN_CARD,
    maxCard: def.MAX_CARD,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: '1st Level (P1)',
      min: 1,
      max: 62,
      stalls: stalls.slice(0, 62),
      elevators: [
        { id: 'el-1', label: 'EU1' },
        { id: 'el-2', label: 'EU2' },
        { id: 'el-3', label: 'EU3' }
      ]
    },
    {
      nr: 2,
      label: '2nd Level (P2)',
      min: 63,
      max: 149,
      stalls: stalls.slice(62, 149),
      elevators: [
      //  { id: 'el-1', label: 'EU1' },
      //  { id: 'el-2', label: 'EU2' },
      //  { id: 'el-3', label: 'EU3' }
      ]
    },
    {
      nr: 3,
      label: '3rd Level (P3)',
      min: 150,
      max: 234,
      stalls: stalls.slice(149, 234),
      elevators: [
      //  { id: 'el-1', label: 'EU1' },
      //  { id: 'el-2', label: 'EU2' },
      //  { id: 'el-3', label: 'EU3' }
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
