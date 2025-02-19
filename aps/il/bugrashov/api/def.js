export const APS = 'bugrashov'
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9100
export const PLC = {
  // ip: '192.168.20.55',
  ip: '192.168.85.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

const DB_DATA = 507
const DB_DATA_LEN = 188
export const DB_DATA_INIT_BAY = 32
export const DB_DATA_INIT_DEVICE = 72
export const DB_DATA_INIT_QUEUE = 160
const DB_DATA_INIT_MB = 180
export const DB_DATA_INIT_MB = DB_DATA_INIT_MB
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const BAY_OFFSET = 10
export const DEVICE_OFFSET = 8
export const QUEUE_OFFSET = 4

export const QUEUE_LEN = 5

const CARDS = 225
export const CARDS = CARDS

const STALLS = 225
const STALL_LEN = 10
export const STALLS = STALLS
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

export const MAP_READ = {
  area: 0x84,
  dbNumber: 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}

export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 188,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 190,
  amount: 2,
  wordLen: 0x02
}
export const REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 192,
  amount: 2,
  wordLen: 0x02
}
export const REQ_3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 194,
  amount: 2,
  wordLen: 0x02
}
export const REQ_4 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 196,
  amount: 2,
  wordLen: 0x02
}
// E1 gate close command
export const E1_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 0, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E1 gate open command
export const E1_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 1, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate close command
export const E2_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 2, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate open command
export const E2_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 3, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate close command
export const E3_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 4, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate open command
export const E3_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 5, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate close command
export const E4_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 6, // Offset 180.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate open command
export const E4_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 7, // Offset 180.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
