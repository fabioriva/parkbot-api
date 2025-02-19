export const APS = 'xian'
export const PORT = 49030
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9025

export const PLC = {
  ip: '192.168.82.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533]

// const CARDS = 30
// const CARD_LEN = 10
export const CARDS = 30
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 158
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 80
export const DB_DATA_INIT_QUEUE = 96
export const DB_DATA_INIT_AB = 116
export const DB_DATA_INIT_EB = 130
export const DB_DATA_INIT_MB = 150
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 30
// const STALL_LEN = 10
export const STALLS = 30
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

// export const ACTIVATE = {
//   area: 0x84,
//   dbNumber: DB_DATA,
//   start: 157 * 8 + 6, // Offset 331.6 (M7.6)
//   amount: 1,
//   wordLen: 0x01 // Bit (inside a word)
// }
export const CARD_READ = {
  area: 0x84,
  dbNumber: 511,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
export const CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 168,
  amount: 4,
  wordLen: 0x02
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
  start: 164,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 172,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 176,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 178,
  amount: 2,
  wordLen: 0x02
}
