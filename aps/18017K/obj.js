const def = require('./def')
const str = require('./str')
const { Action } = require('../../models/Action')
const { Alarms, generateAlarms } = require('../../models/Alarm')
const { generateBits, generateBytes } = require('../../models/Bit')
const { generateCards } = require('../../models/Card')
// const { Exit, ExitScreen, GarageScreen/*, Occupancy */ } = require('../../models/Dss')
const { generateQueue } = require('../../models/Queue')
const { generateStalls } = require('../../models/Stall')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EU1
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU2
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EL
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 0, 17, str.inputs1)
const inputs = inputs1
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 13, str.outputs1)
const outputs = outputs1
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

// const pn = require('./pn') // PROFINET network
// exports.pn = pn

const racks = require('./racks')
exports.racks = racks

const device1 = require('./device1') // EU1
const device2 = require('./device2') // EU2
const device3 = require('./device3') // EL

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device
]

const drives = device1.drives.concat(
  device2.drives,
  device3.drives
)
exports.drives = drives

// exports.motors = device1.motors.concat(
//   device2.motors,
//   device3.motors
// )

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions
)

exports.modes = str.MODES

exports.overview = {
  // definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [[device1.device, device2.device, device3.device]],
  // drives,
  exitQueue: {
    queueList: queue,
    exitButton: new Action('action-exit', merkers.find(b => b.addr === 'M3.0'), def.REQ_0, 1, def.CARDS)
    // exitButton: {
    //   // conn: def.REQ_0,
    //   enable: merkers.find(b => b.addr === 'M3.0'),
    //   key: 'action-exit',
    //   min: 1,
    //   max: def.CARDS
    // }
  }
}

const cards = generateCards(def)
exports.cards = cards

const stalls = generateStalls(def)
exports.stalls = stalls

exports.map = {
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
// exports.exits = exits

// const exitScreen = new ExitScreen(1, 'EXIT SCREEN')
// exports.exitScreen = exitScreen

// const screen1 = new GarageScreen(1, 'GARAGE 1')
// const screen2 = new GarageScreen(2, 'GARAGE 2')
// const screens = [screen1, screen2]
// exports.screens = screens

// exports.dss = { screens, exitScreen }
