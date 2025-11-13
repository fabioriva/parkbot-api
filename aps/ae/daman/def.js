export const APS = 'daman'
export const PORT = 49039
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9036
export const PLC = {
  ip: '192.168.24.2',
  rack: 0,
  slot: 1,
  polling_time: 750
}

export const MQTT_TOPIC = 'aps/ae/daman/#'
export const MQTT_TZ = 'Asia/Dubai'

export const QUEUE_LEN = 10

export const ALARM_LEN = 8
export const DB_ALARM_INIT = 6
export const DB_ALARM_LEN = 64 * ALARM_LEN
export const DBS_ALARM = [531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531, 531] // , 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549] // EL1-5, SH1-14

// const CARDS = 557
// const CARD_LEN = 10
export const CARDS = 557
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 922
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 336
export const DB_DATA_INIT_POS = 576
export const DB_DATA_INIT_QUEUE = 652
export const DB_DATA_INIT_AB = 692
export const DB_DATA_INIT_EB = 788
export const DB_DATA_INIT_MB = 914
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const PLC_MAP = {
  ip: '192.168.24.2',
  rack: 0,
  slot: 1,
  polling_time: 750
}

// const STALLS = 558
// const STALL_LEN = 10
export const STALLS = 558
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
  start: 926,
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
  start: 922,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 930,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 934,
  amount: 2,
  wordLen: 0x02
}
