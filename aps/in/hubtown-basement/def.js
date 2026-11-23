export const APS = 'hubtown-b'
export const HTTP = 9051
export const PLC = {
  ip: '192.168.90.2',
  rack: 0,
  slot: 1,
  polling_time: 999
}
export const TIME_ZONE = 'Asia/Kolkata'
export const CLOCK_READ = {
  area: 0x84,
  dbNumber: 520,
  start: 2,
  amount: 14,
  wordLen: 0x02
}

export const QUEUE_LEN = 10

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534] // EL, SH1/2/3

export const CARDS = 87
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 280
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 96
export const DB_DATA_INIT_POS = 166
export const DB_DATA_INIT_QUEUE = 210
export const DB_DATA_INIT_AB = 230
export const DB_DATA_INIT_EB = 246
export const DB_DATA_INIT_MB = 272
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const STALLS = 90
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
  start: 284,
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
  start: 280,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 288,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 292,
  amount: 2,
  wordLen: 0x02
}
