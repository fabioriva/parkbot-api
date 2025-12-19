import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device1.js'
import device3 from './device1.js'
import device4 from './device1.js'
import device5 from './device1.js'
import device6 from './device6.js'
import device7 from './device6.js'
import device8 from './device6.js'
import device9 from './device6.js'
import device10 from './device6.js'
import device11 from './device6.js'
import device12 from './device6.js'

import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms1), 2) // EL2
const al03 = new Alarms(generateAlarms(1, 64, str.alarms2), 3) // EL3
const al04 = new Alarms(generateAlarms(1, 64, str.alarms1), 4) // EL4
const al05 = new Alarms(generateAlarms(1, 64, str.alarms1), 5) // EL5
const al06 = new Alarms(generateAlarms(1, 64, str.alarms2), 1) // SH1
const al07 = new Alarms(generateAlarms(1, 64, str.alarms2), 2) // SH2
const al08 = new Alarms(generateAlarms(1, 64, str.alarms2), 3) // SH3
const al09 = new Alarms(generateAlarms(1, 64, str.alarms2), 4) // SH4
const al10 = new Alarms(generateAlarms(1, 64, str.alarms2), 5) // SH5
const al11 = new Alarms(generateAlarms(1, 64, str.alarms2), 6) // SH6
const al12 = new Alarms(generateAlarms(1, 64, str.alarms2), 7) // SH7
export const alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10, al11, al12]

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
  device9.device,
  device10.device,
  device11.device,
  device12.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives,
  device5.drives,
  device6.drives,
  device7.drives,
  device8.drives,
  device9.drives,
  device10.drives,
  device11.drives,
  device12.drives
)

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions,
  device7.positions,
  device8.positions,
  device9.positions,
  device10.positions,
  device11.positions,
  device12.positions
)

export const modes = str.MODES

export const overview = {
  devices: [
    [device1.device, device2.device, device3.device, device4.device, device5.device],
    [device6.device, device7.device, device8.device],
    [device9.device, device10.device, device11.device],
    [device12.device]
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

export const map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: '1st floor(P1)',
      min: 1,
      max: 58,
      stalls: stalls.slice(0, 58),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 2,
      label: '2nd floor (P2)',
      min: 59,
      max: 116,
      stalls: stalls.slice(58, 116),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 3,
      label: '3rd floor (P3)',
      min: 117,
      max: 174,
      stalls: stalls.slice(116, 174),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 4,
      label: '4th floor (P4)',
      min: 175,
      max: 232,
      stalls: stalls.slice(174, 232),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 5,
      label: '5th floor (P5)',
      min: 233,
      max: 290,
      stalls: stalls.slice(232, 290),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 6,
      label: '6th floor (P6)',
      min: 291,
      max: 348,
      stalls: stalls.slice(290, 348),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
      ]
    },
    {
      nr: 7,
      label: '7th floor (P7)',
      min: 349,
      max: 406,
      stalls: stalls.slice(348, 406),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' },
        { id: 'el-5', label: 'EL5' }
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
