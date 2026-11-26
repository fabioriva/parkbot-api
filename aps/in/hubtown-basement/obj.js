import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import device4 from './device4.js'
import racks from './racks.js'
import { ExitActionDefinition } from '../../../models/Parking.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms2), 2) // SH1
const al03 = new Alarms(generateAlarms(1, 64, str.alarms2), 3) // SH2
const al04 = new Alarms(generateAlarms(1, 64, str.alarms2), 4) // SH3
export const alarms = [al01, al02, al03, al04]

export const queue = generateQueue(def)

export const devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device
]

export const drives = device1.drives.concat(
  device2.drives,
  device3.drives,
  device4.drives
)

export const positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions
)

export const modes = str.MODES

export const overview = {
  devices: [[device1.device], [device2.device, device3.device, device4.device]],
  exitQueue: {
    queueList: queue,
    exitButton: new ExitActionDefinition(
      'action-exit',
      io.merkers.find((b) => b.addr === 'M3.0'),
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
      label: '1st basement (P1)',
      min: 1,
      max: 30,
      stalls: stalls.slice(0, 30),
      elevators: [{ id: 'el-1', label: 'EL' }]
    },
    {
      nr: 2,
      label: '2nd basement (P2)',
      min: 31,
      max: 60,
      stalls: stalls.slice(30, 60),
      elevators: [{ id: 'el-1', label: 'EL' }]
    },
    {
      nr: 3,
      label: '3rd basement (P3)',
      min: 61,
      max: 90,
      stalls: stalls.slice(60, 90),
      elevators: [{ id: 'el-1', label: 'EL' }]
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
