export const APS = 'muse'
export const PORT = 49004
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9010
export const PLC = {
  ip: '140.80.49.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [431, 432, 433, 434]

// const CARDS = 208
// const CARD_LEN = 10
export const CARDS = 208
export const CARD_LEN = 10

const DB_DATA = 450
const DB_DATA_LEN = 346 // 398
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 96
export const DB_DATA_INIT_POS = 176
export const DB_DATA_INIT_QUEUE = 240
export const DB_DATA_INIT_AB = 316
export const DB_DATA_INIT_EB = 268
export const DB_DATA_INIT_MB = 260
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 208
// const STALL_LEN = 10
export const STALLS = 208
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

export const CARD_READ = {
  area: 0x84,
  dbNumber: 441,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
export const CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 490,
  amount: 4,
  wordLen: 0x02
}
export const MAP_READ = {
  area: 0x84,
  dbNumber: 440,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
export const MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 486,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 494,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 498,
  amount: 2,
  wordLen: 0x02
}
export const ROLLBACK_EL3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 264 * 8 + 4, // Offset 264.4 (M4.4)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
export const ROLLBACK_EL4 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 264 * 8 + 5, // Offset 264.5 (M4.5)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
