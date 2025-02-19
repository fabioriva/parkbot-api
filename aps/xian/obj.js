import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import racks from './racks.js'
import { Alarms, generateAlarms } from '../../models/Alarm.js'
import { generateCards } from '../../models/Card.js'
import { generateQueue } from '../../models/Queue.js'
import { generateStalls } from '../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // 'E1')
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // 'U1')
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // 'T')
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 0, 19, str.inputs1)
// const inputs = inputs1
// export const inputs_ = inputs

// const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 13, str.outputs1)
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
// const device2 = require('./device2')
// const device3 = require('./device3')

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

// export const diagnostic = [
//   device1,
//   device2,
//   device3
// ]

export const modes = str.MODES

export const overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view
  ],
  exitQueue: {
    queueList: queue,
    exitButton: {
      // conn: def.REQ_0,
      enable: io.merkers.find(b => b.addr === 'M3.0'),
      key: 'action-exit',
      min: 1,
      max: def.CARDS
    }
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
      label: 'Level 1',
      min: 1,
      max: 10,
      stalls: stalls.slice(0, 10),
      elevators: [
        { id: 'el', label: 'T' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 11,
      max: 20,
      stalls: stalls.slice(10, 20),
      elevators: [
        { id: 'el', label: 'T' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 21,
      max: 30,
      stalls: stalls.slice(20, 30),
      elevators: [
        { id: 'el', label: 'T' }
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
