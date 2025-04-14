export const APS = 'bugrashov'
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9100
export const PLC = {
  ip: '192.168.85.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

const DB_DATA = 507
const DB_DATA_LEN = 206
export const DB_DATA_INIT_BAY = 32
export const DB_DATA_INIT_DEVICE = 88
export const DB_DATA_INIT_QUEUE = 176
export const DB_DATA_INIT_MB = 196
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

export const BAY_OFFSET = 14
export const DEVICE_OFFSET = 8
export const QUEUE_OFFSET = 4

export const QUEUE_LEN = 5

export const CARDS = 225

export const STALLS = 229
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
  start: 206,
  amount: 2,
  wordLen: 0x02
}
export const REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 208,
  amount: 2,
  wordLen: 0x02
}
export const REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 210,
  amount: 2,
  wordLen: 0x02
}
export const REQ_3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 212,
  amount: 2,
  wordLen: 0x02
}
export const REQ_4 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 214,
  amount: 2,
  wordLen: 0x02
}
export const REQ_BAY = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 216,
  amount: 2,
  wordLen: 0x02
}
// E1 gate close command
export const E1_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 0, // Offset 196.0 (M0.0)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E1 gate open command
export const E1_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 1, // Offset 196.1 (M0.1)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate close command
export const E2_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 2, // Offset 196.2 (M0.2)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E2 gate open command
export const E2_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 3, // Offset 196.3 (M0.3)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate close command
export const E3_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 4, // Offset 196.4 (M0.4)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E3 gate open command
export const E3_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 5, // Offset 196.5 (M0.5)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate close command
export const E4_CLS = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 6, // Offset 196.6 (M0.6)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
// E4 gate open command
export const E4_OPN = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: DB_DATA_INIT_MB * 8 + 7, // Offset 196.7 (M0.7)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}
