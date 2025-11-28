export const APS = 'daman'
export const HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
export const HTTP = 9100
export const PLC = {
  ip: '192.168.24.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const DATA_READ = {
  area: 0x84,
  dbNumber: 182,
  start: 0,
  amount: 40,
  wordLen: 0x02
}
