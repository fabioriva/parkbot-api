exports.APS = 'bugrashov'
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 5001
exports.PLC = {
  // ip: '192.168.20.55',
  ip: '192.168.85.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

const DB_DATA = 507
const DB_DATA_LEN = 188
exports.DB_DATA_INIT_BAY = 32
exports.DB_DATA_INIT_DEVICE = 72
exports.DB_DATA_INIT_QUEUE = 160
const DB_DATA_INIT_MB = 180
exports.DB_DATA_INIT_MB = DB_DATA_INIT_MB
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

exports.BAY_OFFSET = 10
exports.DEVICE_OFFSET = 8
exports.QUEUE_OFFSET = 4

exports.QUEUE_LEN = 5

const CARDS = 225
exports.CARDS = CARDS

const STALLS = 225
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

exports.MAP_READ = {
  area: 0x84,
  dbNumber: 512, // 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}

exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 188,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 190,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 192,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 194,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_4 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 196,
  amount: 2,
  wordLen: 0x02
}
// E1 gate close command
exports.E1_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 0, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E1 gate open command
exports.E1_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 1, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate close command
exports.E2_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 2, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate open command
exports.E2_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 3, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate close command
exports.E3_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 4, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate open command
exports.E3_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 5, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate close command
exports.E4_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 6, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate open command
exports.E4_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 7, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
