import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
import { Alarms, generateAlarms } from '../../../models/Alarm.js'
import { generateCards } from '../../../models/Card.js'
import { generateQueue } from '../../../models/Queue.js'
import { generateStalls } from '../../../models/Stall.js'

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS), 1)
export const alarms = [al01]

export const cards = generateCards(def)

export const devices = [device1.device]

export const drives = device1.drives

export const positions = device1.positions

export const modes = str.MODES

export const queue = generateQueue(def)

export const stalls = generateStalls(def)

const map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'Level -3',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 12),
      elevators: [{ id: 'el-1', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level -2',
      min: 13,
      max: 24,
      stalls: stalls.slice(12, 24),
      elevators: [{ id: 'el-2', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 25,
      max: 36,
      stalls: stalls.slice(24, 36),
      elevators: [{ id: 'el-3', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}

const overview = {
  devices: [[device1.device]],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
  }
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
