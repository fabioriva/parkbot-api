export const APS = 'parshvnath'
export const PORT = 49028
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9023
export const PLC = {
  ip: '192.168.63.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534, 535, 536]

// const CARDS = 214
// const CARD_LEN = 10
export const CARDS = 214
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 388
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 128
export const DB_DATA_INIT_POS = 218
export const DB_DATA_INIT_QUEUE = 278
export const DB_DATA_INIT_AB = 298
export const DB_DATA_INIT_EB = 330
export const DB_DATA_INIT_MB = 380
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 218
// const STALL_LEN = 10
export const STALLS = 218
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
  start: 404,
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
  start: 400,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 408,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 412,
  amount: 2,
  wordLen: 0x02
}
