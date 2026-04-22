import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device1.js'
import device3 from './device1.js'
import device4 from './device4.js'
import device5 from './device4.js'
import device6 from './device4.js'
import device7 from './device7.js'
import device8 from './device7.js'
import device9 from './device7.js'

import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms1), 2) // EL1
const al03 = new Alarms(generateAlarms(1, 64, str.alarms1), 3) // EL1
const al04 = new Alarms(generateAlarms(1, 64, str.alarms2), 4) // EU1
const al05 = new Alarms(generateAlarms(1, 64, str.alarms2), 5) // EU2
const al06 = new Alarms(generateAlarms(1, 64, str.alarms2), 6) // EU3
export const alarms = [al01, al02, al03, al04, al05, al06]

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device,
  device7.device,
  device8.device,
  device9.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives,
  device6.drives,
  device7.drives,
  device8.drives,
  device9.drives
)

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions,
  device7.positions,
  device8.positions,
  device9.positions
)

export const modes = str.MODES

export const overview = {
  devices: [
    [device1.device, device2.device, device3.device],
    [device4.device, device5.device, device6.device],
    [device7.device, device8.device, device9.device]
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
  { id: 'el-1', label: 'EL1' },
  { id: 'el-2', label: 'EL2' },
  { id: 'el-3', label: 'EL3' }
]

let offset = 0
const levels = []
for (let i = 1; i < 14; i++) {
  const level = {
    nr: i,
    label: `Level P${i}`,
    min: 1 + offset,
    max: 22 + offset,
    stalls: stalls.slice(0 + offset, 22 + offset),
    elevators
  }
  offset += 22
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
