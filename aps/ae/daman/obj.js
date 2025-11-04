import * as def from './def.js'
import * as str from './str.js'
import * as io from './io.js'
// import device1 from './device1.js'
import el from './el.js'
import sh from './sh.js'
import racks from './racks.js'
import { Action } from '../../../models/Action.js'
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
const al14 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 14) // SH
const al15 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 15) // SH
const al16 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 16) // SH
const al17 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 17) // SH
const al18 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 18) // SH
const al19 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 19) // SH
export const alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10, al11, al12, al13, al14, al15, al16, al17, al18, al19]

// const inputs1 = generateBits('E', 0, 10, str.inputsEL)
// const inputs2 = generateBits('E', 11, 21, str.inputsEL)
// const inputs3 = generateBits('E', 22, 32, str.inputsEL)
// const inputs4 = generateBits('E', 33, 43, str.inputsEL)
// const inputs5 = generateBits('E', 44, 54, str.inputsEL)
// const inputs6 = generateBits('E', 55, 59, str.inputsSH)
// const inputs7 = generateBits('E', 60, 64, str.inputsSH)
// const inputs8 = generateBits('E', 65, 69, str.inputsSH)
// const inputs9 = generateBits('E', 70, 74, str.inputsSH)
// const inputs10 = generateBits('E', 75, 79, str.inputsSH)
// const inputs11 = generateBits('E', 80, 84, str.inputsSH)
// const inputs12 = generateBits('E', 85, 89, str.inputsSH)
// const inputs13 = generateBits('E', 90, 94, str.inputsSH)
// const inputs14 = generateBits('E', 95, 99, str.inputsSH)
// const inputs15 = generateBits('E', 100, 104, str.inputsSH)
// const inputs16 = generateBits('E', 105, 109, str.inputsSH)
// const inputs17 = generateBits('E', 110, 114, str.inputsSH)
// const inputs18 = generateBits('E', 115, 119, str.inputsSH)
// const inputs19 = generateBits('E', 120, 124, str.inputsSH)
// const inputs = [
//   ...inputs1, ...inputs2, ...inputs3, ...inputs4, ...inputs5,
//   ...inputs6, ...inputs7, ...inputs8, ...inputs9, ...inputs10,
//   ...inputs11, ...inputs12, ...inputs13, ...inputs14, ...inputs15,
//   ...inputs16, ...inputs17, ...inputs18, ...inputs19
// ]
// export const inputs_ = inputs
// export const eb = generateBytes(inputs)
// export const eb = eb

// const outputs1 = generateBits('A', 0, 7, str.outputsEL)
// const outputs2 = generateBits('A', 8, 15, str.outputsEL)
// const outputs3 = generateBits('A', 16, 23, str.outputsEL)
// const outputs4 = generateBits('A', 24, 31, str.outputsEL)
// const outputs5 = generateBits('A', 32, 39, str.outputsEL)
// const outputs6 = generateBits('A', 40, 43, str.outputsSH)
// const outputs7 = generateBits('A', 44, 47, str.outputsSH)
// const outputs8 = generateBits('A', 48, 51, str.outputsSH)
// const outputs9 = generateBits('A', 52, 55, str.outputsSH)
// const outputs10 = generateBits('A', 56, 59, str.outputsSH)
// const outputs11 = generateBits('A', 60, 63, str.outputsSH)
// const outputs12 = generateBits('A', 64, 67, str.outputsSH)
// const outputs13 = generateBits('A', 68, 71, str.outputsSH)
// const outputs14 = generateBits('A', 72, 75, str.outputsSH)
// const outputs15 = generateBits('A', 76, 79, str.outputsSH)
// const outputs16 = generateBits('A', 80, 83, str.outputsSH)
// const outputs17 = generateBits('A', 84, 87, str.outputsSH)
// const outputs18 = generateBits('A', 88, 91, str.outputsSH)
// const outputs19 = generateBits('A', 92, 95, str.outputsSH)
// const outputs = [
//   ...outputs1, ...outputs2, ...outputs3, ...outputs4, ...outputs5,
//   ...outputs6, ...outputs7, ...outputs8, ...outputs9, ...outputs10,
//   ...outputs11, ...outputs12, ...outputs13, ...outputs14, ...outputs15,
//   ...outputs16, ...outputs17, ...outputs18, ...outputs19
// ]
// export const outputs_ = outputs
// export const ab = generateBytes(outputs)
// export const ab = ab

// const merkers = generateBits('M', 0, 7)
// export const merkers_ = merkers
// export const mb = generateBytes(merkers)
// export const mb = mb

// export const racks = require('./racks')
// export const racks = racks

// const el = require('./el.js')
// const sh = require('./sh.js')

export const devices = [...el.devices_, ...sh.devices_]
// export const devices = devices

export const drives = [...el.drives_, ...sh.drives_]

export const positions = [...el.positions_, ...sh.positions_]

export const queue = generateQueue(def)

export const modes = str.MODES

export const overview = {
  devices: [
    [...el.devices_],
    [...sh.devices_]
  ],
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', io.merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
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
      max: 88,
      stalls: stalls.slice(0, 88),
      elevators
    },
    {
      nr: 2,
      label: 'Basement (-2)',
      min: 89,
      max: 176,
      stalls: stalls.slice(88, 176),
      elevators
    },
    {
      nr: 3,
      label: 'Basement (-1)',
      min: 177,
      max: 264,
      stalls: stalls.slice(176, 264),
      elevators
    },
    {
      nr: 4,
      label: 'Level (+1)',
      min: 265,
      max: 329,
      stalls: stalls.slice(264, 329),
      elevators: elevators.filter(el => el.id !== 'el-5')
    },
    {
      nr: 5,
      label: 'Level (+2)',
      min: 330,
      max: 395,
      stalls: stalls.slice(329, 395),
      elevators: elevators.filter(el => el.id !== 'el-2' && el.id !== 'el-5')
    },
    {
      nr: 6,
      label: 'Level (+3)',
      min: 396,
      max: 473,
      stalls: stalls.slice(395, 473),
      elevators: elevators.filter(el => el.id !== 'el-2' && el.id !== 'el-5')
    },
    {
      nr: 7,
      label: 'Level (+4)',
      min: 474,
      max: 558,
      stalls: stalls.slice(473, 558),
      elevators: elevators.filter(el => el.id !== 'el-2' && el.id !== 'el-5')
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
