export const APS = 'alumim'
export const PORT = 49017
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9009
export const PLC = {
  ip: '192.168.57.12',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const QUEUE_LEN = 5

// const ALARM_LEN = 8
export const ALARM_LEN = 8
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531]

// const CARDS = 35
// const CARD_LEN = 10
export const CARDS = 35
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 134
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 48
export const DB_DATA_INIT_POS = 68
export const DB_DATA_INIT_QUEUE = 84
export const DB_DATA_INIT_AB = 104
export const DB_DATA_INIT_EB = 112
export const DB_DATA_INIT_MB = 126
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 36
// const STALL_LEN = 10
export const STALLS = 36
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 100
}

export const CARD_READ = {
  area: 0x84,
  dbNumber: 411,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
export const CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 140,
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
  start: 136,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 144,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 148,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 150,
  amount: 2,
  wordLen: 0x02
}
