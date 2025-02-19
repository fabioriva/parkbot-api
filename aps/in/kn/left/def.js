export const APS = 'knl'
export const PORT = 49021
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9015
export const PLC = {
  ip: '140.80.25.22',
  rack: 0,
  slot: 2,
  polling_time: 1200 // 999
}

export const QUEUE_LEN = 10

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 10
export const DB_ALARM_LEN = 32 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545]

// const CARDS = 9999
// const CARD_LEN = 10
export const CARDS = 9999
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 680
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 272
export const DB_DATA_INIT_POS = 422
export const DB_DATA_INIT_QUEUE = 482
export const DB_DATA_INIT_AB = 522
export const DB_DATA_INIT_EB = 576
export const DB_DATA_INIT_MB = 672
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 912
// const STALL_LEN = 10
export const STALLS = 912
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: -3,
  RSVD: -2,
  LOCK: -1
}

export const MAP_READ = {
  area: 0x84,
  dbNumber: 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
export const MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 680,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 688,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 692,
  amount: 2,
  wordLen: 0x02
}

// const DB_DIAG = 506
// const DB_DIAG_LEN = 306
// export const DB_DIAG_INIT_MOT = 0
// export const DB_DIAG_INIT_VFD = 36
// export const DB_DIAG_INIT_SIL = 186
// export const DIAG_READ = {
//   area: 0x84,
//   dbNumber: DB_DIAG,
//   start: 0,
//   amount: DB_DIAG_LEN,
//   wordLen: 0x02
// }
