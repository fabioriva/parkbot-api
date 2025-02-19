export const APS = '18017K'
export const PORT = 49026
export const HOST = process.env.NODE_ENV !== 'production'
  ? process.env.DEVELOPMENT_SERVER
  : process.env.PRODUCTION_SERVER
export const HTTP = 9021
export const PLC = {
  ip: '192.168.76.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533] // EU1, EU2, EL

// const CARDS = 300
// const CARD_LEN = 10
export const CARDS = 300
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 226
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 80
export const DB_DATA_INIT_POS = 100
export const DB_DATA_INIT_QUEUE = 120
export const DB_DATA_INIT_EXITS = 140
export const DB_DATA_INIT_SCREENS = 158
export const DB_DATA_INIT_OCCUPANCY = 168
export const DB_DATA_INIT_AB = 186
export const DB_DATA_INIT_EB = 200
export const DB_DATA_INIT_MB = 218
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 120
// const STALL_LEN = 10
export const STALLS = 120
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
//   start: 205 * 8 + 6, // Offset 205.6 (M7.6)
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
  start: 230,
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
  start: 226,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 234,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 238,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 240,
  amount: 2,
  wordLen: 0x02
}
export const REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 242,
  amount: 2,
  wordLen: 0x02
}
