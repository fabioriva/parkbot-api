import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
import device1 from './device1.js'
import device2 from './device2.js'
import device3 from './device3.js'
import racks from './racks.js'
import { Action } from '../../models/Action.js'
import { Alarms, generateAlarms } from '../../models/Alarm.js'
import { generateCards } from '../../models/Card.js'
import { generateQueue } from '../../models/Queue.js'
import { generateStalls } from '../../models/Stall.js'
// import { Exit, ExitScreen, GarageScreen/*, Occupancy */ } = require('../../models/Dss')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EU1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU2
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EL
export const alarms = [al01, al02, al03]

// const inputs1 = generateBits('E', 0, 17, str.inputs1)
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

// const pn = require('./pn') // PROFINET network
// export const pn = pn

// const racks = require('./racks')
// export const racks = racks

// const device1 = require('./device1') // EU1
// const device2 = require('./device2') // EU2
// const device3 = require('./device3') // EL

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

export const modes = str.MODES

export const overview = {
  // definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [[device1.device, device2.device, device3.device]],
  // drives,
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
    // exitButton: {
    //   // conn: def.REQ_0,
    //   enable: merkers.find(b => b.addr === 'M3.0'),
    //   key: 'action-exit',
    //   min: 1,
    //   max: def.CARDS
    // }
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
      label: '2nd basement (P1)',
      min: 1,
      max: 20,
      stalls: stalls.slice(0, 20),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: '1st basement (P2)',
      min: 21,
      max: 40,
      stalls: stalls.slice(20, 40),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: '3rd floor (P4)',
      min: 41,
      max: 60,
      stalls: stalls.slice(40, 60),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 4,
      label: '4th floor (P5)',
      min: 61,
      max: 80,
      stalls: stalls.slice(60, 80),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 5,
      label: '5th floor (P6)',
      min: 81,
      max: 100,
      stalls: stalls.slice(80, 100),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 6,
      label: '6th floor (P7)',
      min: 101,
      max: 120,
      stalls: stalls.slice(100, 120),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}

/**
 * Dss
 */

// const exit1 = new Exit(1, 'EXIT 1')
// const exit2 = new Exit(2, 'EXIT 2')
// const exits = [exit1, exit2]
// export const exits = exits

// const exitScreen = new ExitScreen(1, 'EXIT SCREEN')
// export const exitScreen = exitScreen

// const screen1 = new GarageScreen(1, 'GARAGE 1')
// const screen2 = new GarageScreen(2, 'GARAGE 2')
// const screens = [screen1, screen2]
// export const screens = screens

// export const dss = { screens, exitScreen }

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
