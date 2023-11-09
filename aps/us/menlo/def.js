exports.APS = 'menlo'
exports.PORT = 49037
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9034
exports.PLC = {
  ip: '192.168.83.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

exports.MQTT_TOPIC = 'aps/us/menlo/#'
exports.MQTT_TZ = 'America/Los_Angeles'

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 6
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533, 534, 535, 536] // EU1, EU2, EU3, T1, T2, T3

const CARDS = 242
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 386
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_DRIVE = 128
exports.DB_DATA_INIT_POS = 218
exports.DB_DATA_INIT_QUEUE = 278
exports.DB_DATA_INIT_AB = 298
exports.DB_DATA_INIT_EB = 332
exports.DB_DATA_INIT_MB = 378
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 248
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

exports.CARD_READ = {
  area: 0x84,
  dbNumber: 511,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 390,
  amount: 4,
  wordLen: 0x02
}
exports.MAP_READ = {
  area: 0x84,
  dbNumber: 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
exports.MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 386,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 394,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 398,
  amount: 2,
  wordLen: 0x02
}
