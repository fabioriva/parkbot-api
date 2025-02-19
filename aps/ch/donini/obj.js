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

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2)
export const alarms = [al01, al02]

export const queue = generateQueue(def)

export const devices = [device1.device, device2.device]

export const drives = device1.drives.concat(device2.drives)

export const positions = device1.positions.concat(device2.positions)

export const modes = str.MODES

export const overview = {
  devices: [[device1.device, device2.device]],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
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
      label: 'Piano 1 (-3)',
      min: 1,
      max: 40,
      stalls: stalls.slice(0, 40),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 2,
      label: 'Piano 2 (-2)',
      min: 41,
      max: 78,
      stalls: stalls.slice(40, 78),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 3,
      label: 'Piano 3 (-1)',
      min: 79,
      max: 81,
      stalls: stalls.slice(78, 81),
      elevators: [{ id: 't', label: 'T' }, { id: 'el', label: 'EL' }]
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
