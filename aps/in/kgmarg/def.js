export const APS = 'kgmarg'
export const PORT = 49049
// export const HOST =
//   process.env.NODE_ENV !== 'production'
//     ? process.env.DEVELOPMENT_SERVER
//     : process.env.PRODUCTION_SERVER
export const HTTP = 9046
export const PLC = {
  ip: '192.168.92.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const MQTT_TOPIC = 'aps/in/kgmarg/#'
export const MQTT_TZ = 'Asia/Kolkata'

export const QUEUE_LEN = 5

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532] // EL1, EU1

export const CARDS = 306
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 398
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 176
export const DB_DATA_INIT_POS = 236
export const DB_DATA_INIT_QUEUE = 272
export const DB_DATA_INIT_AB = 292
export const DB_DATA_INIT_EB = 332
export const DB_DATA_INIT_MB = 390
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const STALLS = 312
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
  start: 402,
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
  start: 398,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 406,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 410,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 412,
  amount: 2,
  wordLen: 0x02
}
export const REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 414,
  amount: 2,
  wordLen: 0x02
}
export const REQ_3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 416,
  amount: 2,
  wordLen: 0x02
}
