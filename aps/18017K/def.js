exports.APS = '18017K'
exports.PORT = 49026
exports.HOST = process.env.NODE_ENV !== 'production'
  ? process.env.DEVELOPMENT_SERVER
  : process.env.PRODUCTION_SERVER
exports.HTTP = 9021
exports.PLC = {
  ip: '192.168.76.12',
  rack: 0,
  slot: 1,
  polling_time: 500
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 6
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533] // EU1, EU2, EL

const CARDS = 300
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 226
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_DRIVE = 80
exports.DB_DATA_INIT_POS = 100
exports.DB_DATA_INIT_QUEUE = 120
exports.DB_DATA_INIT_EXITS = 140
exports.DB_DATA_INIT_SCREENS = 158
exports.DB_DATA_INIT_OCCUPANCY = 168
exports.DB_DATA_INIT_AB = 186
exports.DB_DATA_INIT_EB = 200
exports.DB_DATA_INIT_MB = 218
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 120
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

// exports.ACTIVATE = {
//   area: 0x84,
//   dbNumber: DB_DATA,
//   start: 205 * 8 + 6, // Offset 205.6 (M7.6)
//   amount: 1,
//   wordLen: 0x01 // Bit (inside a word)
// }
exports.CARD_READ = {
  area: 0x84,
  dbNumber: 511,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 230,
  amount: 4,
  wordLen: 0x02
}
exports.MAP_READ = {
  area: 0x84,
  dbNumber: 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
exports.MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 226,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 234,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 238,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 240,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 242,
  amount: 2,
  wordLen: 0x02
}
