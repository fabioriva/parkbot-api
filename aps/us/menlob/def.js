export const APS = 'menlob'
export const PORT = 49040
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9037
export const PLC = {
  ip: '192.168.183.102',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const MQTT_TOPIC = 'aps/us/menlob/#'
export const MQTT_TZ = 'America/Los_Angeles'

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534, 535, 536] // EU1, EU2, EU3, T1, T2, T3

// const CARDS = 242
// const CARD_LEN = 10
// export const CARDS = CARDS
// export const CARD_LEN = 10

// const CARDS = 228
// const CARD_LEN = 10 // 6
export const CARDS = 228
export const CARD_LEN = 10
export const MIN_CARD = 243
export const MAX_CARD = 471

const DB_DATA = 505
const DB_DATA_LEN = 386
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 128
export const DB_DATA_INIT_POS = 218
export const DB_DATA_INIT_QUEUE = 278
export const DB_DATA_INIT_AB = 298
export const DB_DATA_INIT_EB = 332
export const DB_DATA_INIT_MB = 378
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 234
// const STALL_LEN = 10
export const STALLS = 234
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

// export const CARD_READ = {
//   area: 0x84,
//   dbNumber: 511,
//   start: 0,
//   amount: CARDS * CARD_LEN,
//   wordLen: 0x02
// }
export const CARD_READ = {
  area: 0x84,
  dbNumber: 512,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
export const CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 390,
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
  start: 386,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 394,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 398,
  amount: 2,
  wordLen: 0x02
}
