export const APS = 'bugrashov'
export const PORT = 49041
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9038
export const PLC = {
  ip: '192.168.85.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541] // EL1..EL4, SH1..SH7

// const CARDS = 225
// const CARD_LEN = 10
export const CARDS = 225
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 656
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 208
export const DB_DATA_INIT_POS = 358
export const DB_DATA_INIT_QUEUE = 462
export const DB_DATA_INIT_AB = 482
export const DB_DATA_INIT_EB = 546
export const DB_DATA_INIT_MB = 648
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 229
// const STALL_LEN = 10
export const STALLS = 229
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

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
  start: 660,
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
  start: 656,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 664,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 668,
  amount: 2,
  wordLen: 0x02
}
// PP
// export const PP1B = {
//   area: 0x84,
//   dbNumber: DB_DATA,
//   start: 999 * 8 + 0, // Offset 197.0 (M1.0)
//   amount: 1,
//   wordLen: 0x01 // Bit (inside a word)
// }
export const REQ_PP = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 670,
  amount: 4,
  wordLen: 0x02
}
