const { getPlcDateTime } = require('./utils7')

exports.LOG_LEN = 32

function updateOnLog (def, log, obj, plc) {
  if (log.etx === 0x03 && log.stx === 0x264) {
    switch (log.operation) {
      case 1: // alarm in
      case 2: // alarm out
        plc.alarms(def, obj, { id: log.device })
        break
      case 4: // PIN
        plc.cards(def, obj)
        break
      case 5: // in
      case 6: // out
      case 7: // shuffle in
      case 8: // shuffle out
      case 9: // reserve stall
        plc.stall(def, obj, log.stall)
        // plc.map(def, obj)
        break
    }
  }
}

exports.updateOnLog = updateOnLog

class Log {
  constructor (buffer) {
    this.stx = buffer.readInt16BE(0)
    this.system = buffer.readInt16BE(2)
    this.device = buffer.readInt16BE(4)
    this.mode = buffer.readInt16BE(6)
    this.operation = buffer.readInt16BE(8)
    this.stall = buffer.readInt16BE(10)
    this.card = buffer.readInt16BE(12)
    this.size = buffer.readInt16BE(14)
    this.alarm = buffer.readInt16BE(16)
    this.event = buffer.readInt16BE(18)
    this.date = getPlcDateTime(buffer.readInt16BE(20), buffer.readInt32BE(22))
    this.elapsed = buffer.readInt32BE(26)
    this.etx = buffer.readInt16BE(30)
  }
}

exports.Log = Log
