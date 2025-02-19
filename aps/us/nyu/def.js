export const APS = 'nyu'
export const PORT = 49003
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9011
export const PLC = {
  ip: '192.168.55.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [431, 432]

// const CARDS = 119
// const CARD_LEN = 10
export const CARDS = 119
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 194
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 64
export const DB_DATA_INIT_POS = 84
export const DB_DATA_INIT_QUEUE = 116
export const DB_DATA_INIT_AB = 136
export const DB_DATA_INIT_EB = 156
export const DB_DATA_INIT_MB = 186
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 121
// const STALL_LEN = 10
export const STALLS = 121
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
  start: 202,
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
  start: 198,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 206,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 210,
  amount: 2,
  wordLen: 0x02
}
