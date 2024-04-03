exports.APS = 'hdante'
exports.PORT = 49027
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9022
const POLL_TIME = 600
exports.PLC = {
  ip: '140.80.20.12',
  rack: 0,
  slot: 2,
  polling_time: POLL_TIME
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 6
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532] // EL, EU

const CARDS = 52
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 142
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 64
exports.DB_DATA_INIT_QUEUE = 88
exports.DB_DATA_INIT_AB = 108
exports.DB_DATA_INIT_EB = 118
exports.DB_DATA_INIT_MB = 134
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 52
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

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
  start: 150,
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
  start: 146,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 154,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 158,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 160,
  amount: 2,
  wordLen: 0x02
}

/**
 * PLC SH
 */

exports.PLC_SH = {
  ip: '140.80.20.13',
  rack: 0,
  slot: 2,
  polling_time: POLL_TIME
}
exports.DB_DATA_INIT_AB_SH = 32
exports.DB_DATA_INIT_EB_SH = 36
exports.DB_DATA_INIT_MB_SH = 42
exports.DATA_READ_SH = {
  area: 0x84,
  dbNumber: 505,
  start: 0,
  amount: 49,
  wordLen: 0x02
}
