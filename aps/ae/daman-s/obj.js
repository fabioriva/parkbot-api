import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
// import device1 from './device1.js'
import el from './el.js'
import sh from './sh.js'
import racks from './racks.js'
import { ExitActionDefinition } from '../../../models/Parking.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EL
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3) // EL
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 4) // EL
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 5) // EL
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6) // SH
const al07 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 7) // SH
const al08 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 8) // SH
const al09 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 9) // SH
const al10 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 10) // SH
const al11 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 11) // SH
const al12 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 12) // SH
const al13 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 13) // SH
export const alarms = [
  al01,
  al02,
  al03,
  al04,
  al05,
  al06,
  al07,
  al08,
  al09,
  al10,
  al11,
  al12,
  al13
]

export const devices = [...el.devices_, ...sh.devices_]

export const drives = [...el.drives_, ...sh.drives_]

export const positions = [...el.positions_, ...sh.positions_]

export const queue = generateQueue(def)

export const modes = str.MODES

export const overview = {
  devices: [[...el.devices_], [...sh.devices_]],
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

const elevators = [
  { id: 'el-1', label: 'EL1' },
  { id: 'el-2', label: 'EL2' },
  { id: 'el-3', label: 'EL3' },
  { id: 'el-4', label: 'EL4' },
  { id: 'el-5', label: 'EL5' }
]

export const map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'Basement (-3)',
      min: 1,
      max: 94,
      stalls: stalls.slice(0, 94),
      elevators
    },
    {
      nr: 2,
      label: 'Basement (-2)',
      min: 95,
      max: 188,
      stalls: stalls.slice(94, 188),
      elevators
    },
    {
      nr: 3,
      label: 'Basement (-1)',
      min: 189,
      max: 282,
      stalls: stalls.slice(188, 282),
      elevators
    },
    {
      nr: 4,
      label: 'Level (+1)',
      min: 283,
      max: 322,
      stalls: stalls.slice(282, 322),
      elevators: elevators.filter(el => el.id === 'el-1' || el.id === 'el-3')
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
