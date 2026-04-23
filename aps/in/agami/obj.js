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

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms2), 2) // EU1
export const alarms = [al01, al02]

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
]

export const drives = device1.drives.concat(
  device2.drives,
)

export const positions = device1.positions.concat(
  device2.positions,
)

export const modes = str.MODES

export const overview = {
  devices: [
    [device1.device, device2.device],
  ],
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

const elevators = [
  { id: 'el-1', label: 'EL1' }
]

const P1 = {
  nr: 1,
    label: `Level P1`,
    min: 1,
    max: 2,
    stalls: stalls.slice(0, 2),
    elevators
}

let offset = 0
const levels = []
for (let i = 2; i < 29; i++) {
  const level = {
    nr: i,
    label: `Level P${i}`,
    min: 3 + offset,
    max: 6 + offset,
    stalls: stalls.slice(2 + offset, 6 + offset),
    elevators
  }
  offset += 4
  levels.push(level)
}

export const map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels,
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
