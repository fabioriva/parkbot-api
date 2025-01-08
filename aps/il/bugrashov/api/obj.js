const def = require('./def')
const { generateBits, generateBytes } = require('./models/Bit')
const { Bay } = require('./models/Bay')
const { Device } = require('./models/Device')
const { generateQueue } = require('./models/Queue')
const { generateStalls } = require('./models/Stall')

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const EU1 = new Bay(1, 'EU1')
const EU2 = new Bay(2, 'EU2')
const EU3 = new Bay(3, 'EU3')
const EU4 = new Bay(4, 'EU4')
const bays = [EU1, EU2, EU3, EU4]
exports.bays = bays

const VT1 = new Device(1, 'VT1')
const VT2 = new Device(2, 'VT2')
const VT3 = new Device(3, 'VT3')
const VT4 = new Device(4, 'VT4')
const SH1 = new Device(5, 'SH1')
const SH2 = new Device(6, 'SH2')
const SH3 = new Device(7, 'SH3')
const SH4 = new Device(8, 'SH4')
const SH5 = new Device(9, 'SH5')
const SH6 = new Device(10, 'SH6')
const SH7 = new Device(11, 'SH7')

const devices = [VT1, VT2, VT3, VT4, SH1, SH2, SH3, SH4, SH5, SH6, SH7]
exports.devices = devices

const queue = generateQueue(def)
exports.queue = queue

exports.overview = {
  bays,
  devices,
  queue
}

const occupancy = [
  // { id: "busy", value: 0 },
  // { id: "free", value: 0 },
  // { id: "lock", value: 0 },
]
// exports.occupancy = occupancy;

const stalls = generateStalls(def)
exports.stalls = stalls

exports.map = {
  occupancy,
  stalls
}
