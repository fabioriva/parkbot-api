export const APS = 'smoritz'
export const PORT = 49031
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9026
const POLL_TIME = 500
export const PLC = {
  ip: '140.80.33.3',
  rack: 0,
  slot: 2,
  polling_time: POLL_TIME
}

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533] // EL, EL(L), EL(R)

export const CARDS = 9
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 142
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 80
export const DB_DATA_INIT_QUEUE = 84
export const DB_DATA_INIT_AB = 104
export const DB_DATA_INIT_EB = 116
export const DB_DATA_INIT_MB = 134
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const STALLS = 10
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
  start: 152,
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
  start: 148,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 156,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 160,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 162,
  amount: 2,
  wordLen: 0x02
}
