exports.APS = 'knr'
exports.PORT = 49022
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9016
exports.PLC = {
  ip: '140.80.25.12',
  rack: 0,
  slot: 2,
  polling_time: 1200 // 999
}

exports.QUEUE_LEN = 10

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 10
exports.DB_ALARM_LEN = 32 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545]

const CARDS = 9999
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 680
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_DRIVE = 272
exports.DB_DATA_INIT_POS = 422
exports.DB_DATA_INIT_QUEUE = 482
exports.DB_DATA_INIT_AB = 522
exports.DB_DATA_INIT_EB = 576
exports.DB_DATA_INIT_MB = 672
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
  start: 680,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 688,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 692,
  amount: 2,
  wordLen: 0x02
}

// const DB_DIAG = 506
// const DB_DIAG_LEN = 306
// exports.DB_DIAG_INIT_MOT = 0
// exports.DB_DIAG_INIT_VFD = 36
// exports.DB_DIAG_INIT_SIL = 186
// exports.DIAG_READ = {
//   area: 0x84,
//   dbNumber: DB_DIAG,
//   start: 0,
//   amount: DB_DIAG_LEN,
//   wordLen: 0x02
// }
