import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device1.js'
import device3 from './device3.js'
import device4 from './device3.js'
import device5 from './device5.js'
import device6 from './device5.js'
import racks from './racks.js'
import { ExitActionDefinition } from '../../../models/Parking.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms1), 2) // EL2
const al03 = new Alarms(generateAlarms(1, 64, str.alarms2), 3) // E1
const al04 = new Alarms(generateAlarms(1, 64, str.alarms2), 4) // E2
const al05 = new Alarms(generateAlarms(1, 64, str.alarms2), 5) // U1
const al06 = new Alarms(generateAlarms(1, 64, str.alarms2), 6) // U2
export const alarms = [al01, al02, al03, al04, al05, al06]

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
    [device1.device, device3.device, device5.device],
    [device2.device, device4.device, device6.device]
  ],
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

const levelOrdinal = (nr) => {
  if (nr === 1) return '1st'
  if (nr === 2) return '2nd'
  if (nr === 3) return '3rd'
  if (nr === 11 || nr === 12 || nr === 13) return `${nr}th`
  if (nr % 10 === 1) return `${nr}st`
  if (nr % 10 === 2) return `${nr}nd`
  if (nr % 10 === 3) return `${nr}rd`
  return `${nr}th`
}

export const map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: Array.from({ length: 17 }, (_, i) => {
    const nr = i + 1
    const offset = i * 16
    return {
      nr,
      label: `${levelOrdinal(nr)} level (P${nr})`,
      min: 1 + offset,
      max: 16 + offset,
      stalls: stalls.slice(offset, offset + 16),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    }
  }),
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
