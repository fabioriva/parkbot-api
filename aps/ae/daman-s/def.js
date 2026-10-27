export const APS = 'daman-s'
export const HTTP = 9050
export const PLC = {
  ip: '192.168.24.2',
  rack: 0,
  slot: 1,
  polling_time: 999
}
export const TIME_ZONE = 'Asia/Dubai'
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
export const DBS_ALARM = [
  531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543
] // EL1-5, SH1-8; verify DB numbers for Daman S

export const CARDS = 999
export const CARD_LEN = 10

const DB_DATA = 506
const DB_DATA_LEN = 726
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_DRIVE = 240
export const DB_DATA_INIT_POS = 420
export const DB_DATA_INIT_QUEUE = 472
export const DB_DATA_INIT_AB = 512
export const DB_DATA_INIT_EB = 610
export const DB_DATA_INIT_MB = 718
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// Data log read for PlcW used for connection testing purpose
export const DATA_LOG_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: 32,
  wordLen: 0x02
}

export const STALLS = 322
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
  start: 730,
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
  start: 726,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 734,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 738,
  amount: 2,
  wordLen: 0x02
}
