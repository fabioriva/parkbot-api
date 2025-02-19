export const QUEUE_LEN = 10

// const ALARM_LEN = 8
// export const ALARM_LEN = ALARM_LEN
// export const DB_ALARM_INIT = 6
// export const DB_ALARM_LEN = 64 * ALARM_LEN
// export const DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545]

// const CARDS = 9999
// const CARD_LEN = 10
export const CARDS = 9999
export const CARD_LEN = 10

const DB_DATA = 505
const DB_DATA_LEN = 530
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 272
export const DB_DATA_INIT_QUEUE = 332
export const DB_DATA_INIT_AB = 372
export const DB_DATA_INIT_EB = 426
export const DB_DATA_INIT_MB = 522
export const DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

// const STALLS = 912
// const STALL_LEN = 10
export const STALLS = 912
export const STALL_LEN = 10
export const STALL_STATUS = {
  FREE: 0,
  PAPA: -3,
  RSVD: -2,
  LOCK: -1
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
  start: 530,
  amount: 4,
  wordLen: 0x02
}
export const QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 538,
  amount: 4,
  wordLen: 0x02
}
export const REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 542,
  amount: 2,
  wordLen: 0x02
}
