export const APS = 'sdmc'
export const PORT = 49046
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9043
export const PLC = {
  ip: '192.168.93.2',
  rack: 0,
  slot: 1,
  polling_time: 999
}

export const MQTT_TOPIC = 'aps/in/sdmc/#'
export const MQTT_TZ = 'Asia/Kolkata'

export const QUEUE_LEN = 10

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542] // EL1, EL2, EL3, EL4, EL5, SH1, ...

export const CARDS = 392
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 644
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 224
export const DB_DATA_INIT_POS = 354
export const DB_DATA_INIT_QUEUE = 458
export const DB_DATA_INIT_AB = 498
export const DB_DATA_INIT_EB = 550
export const DB_DATA_INIT_MB = 636
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const STALLS = 406
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
  start: 648,
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
  start: 644,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 652,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 656,
  amount: 2,
  wordLen: 0x02
}
