export const APS = 'donini'
export const PORT = 49023
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9018
export const PLC = {
  ip: '192.168.54.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 533]

// const CARDS = 84
// const CARD_LEN = 12 // stall fixed
export const CARDS = 84
export const CARD_LEN = 12

const DB_DATA = 505
const DB_DATA_LEN = 158
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 64
export const DB_DATA_INIT_POS = 94
export const DB_DATA_INIT_QUEUE = 102
export const DB_DATA_INIT_AB = 122
export const DB_DATA_INIT_EB = 132
export const DB_DATA_INIT_MB = 150
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const DB_MAP = 510
export const DB_MAP = 510
// const STALLS = 81
// const STALL_LEN = 10
export const STALLS = 81
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
  start: 166,
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
  start: 162,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 170,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 174,
  amount: 2,
  wordLen: 0x02
}
