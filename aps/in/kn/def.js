exports.QUEUE_LEN = 10

// const ALARM_LEN = 8
// exports.ALARM_LEN = ALARM_LEN
// exports.DB_ALARM_INIT = 6
// exports.DB_ALARM_LEN = 64 * ALARM_LEN
// exports.DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545]

const CARDS = 9999
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 530
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 272
exports.DB_DATA_INIT_QUEUE = 332
exports.DB_DATA_INIT_AB = 372
exports.DB_DATA_INIT_EB = 426
exports.DB_DATA_INIT_MB = 522
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 912
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: -3,
  RSVD: -2,
  LOCK: -1
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
  start: 530,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 538,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 542,
  amount: 2,
  wordLen: 0x02
}
