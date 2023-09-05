exports.APS = 'alumim'
exports.PORT = 49017
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9009
exports.PLC = {
  ip: '192.168.57.12',
  rack: 0,
  slot: 1,
  polling_time: 500
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 12
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531]

const CARDS = 35
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 134
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_DRIVE = 48
exports.DB_DATA_INIT_POS = 68
exports.DB_DATA_INIT_QUEUE = 84
exports.DB_DATA_INIT_AB = 104
exports.DB_DATA_INIT_EB = 112
exports.DB_DATA_INIT_MB = 126
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 36
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 100
}

exports.CARD_READ = {
  area: 0x84,
  dbNumber: 411,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 140,
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
  start: 136,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 144,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 148,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 150,
  amount: 2,
  wordLen: 0x02
}
