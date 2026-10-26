import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import racks from './racks.js'
import { ExitActionDefinition } from '../../../models/Parking.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // T
export const alarms = [al01]

export const queue = generateQueue(def)

export const devices = [device1.device]

export const drives = device1.drives

export const positions = device1.positions

export const modes = str.MODES

export const overview = {
  devices: [
    [device1.device]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new ExitActionDefinition('action-exit', io.merkers.find(b => b.addr === 'M3.0'), 1, def.CARDS)
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
      label: '1° Piano (P1)',
      min: 1,
      max: 2,
      stalls: stalls.slice(0, 2),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 2,
      label: '2° Piano (P2)',
      min: 3,
      max: 6,
      stalls: stalls.slice(2, 6),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 3,
      label: '3° Piano (P3)',
      min: 7,
      max: 8,
      stalls: stalls.slice(6, 8),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 4,
      label: '4° Piano (P4)',
      min: 9,
      max: 14,
      stalls: stalls.slice(8, 14),
      elevators: [{ id: 't', label: 'T' }]
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
