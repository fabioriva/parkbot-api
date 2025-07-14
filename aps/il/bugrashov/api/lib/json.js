export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
}

// const SEVERITY_UNKNOWN = 0
// const SEVERITY_SUCCESS = 1
// const SEVERITY_WARNING = 2
// const SEVERITY_ERROR = 3

export const SEVERITY = {
  UNKNOWN: 0,
  SUCCESS: 1,
  WARNING: 2,
  ERROR: 3
}

export const MESG = {
  UNKNOWN: 0,
  BAY_NOT_VALID: 1,
  BAY_NOT_READY: 2,
  CARD_NOT_VALID: 3,
  CARD_IN_OPERATION: 4,
  CARD_IN_USE: 5,
  CARD_NOT_FOUND: 6,
  ENTRY_OK: 7,
  EXIT_OK: 8,
  GATE_OK: 9,
  QUEUE_FULL: 10,
  QUEUE_BUSY: 11,
  WRITE_ERROR: 12,
  ROLLBACK_OK: 13,
  HEIGHT_NOT_VALID: 14
}

export const readJson = function readJson (res, cb, err) {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    const chunk = Buffer.from(ab)
    if (isLast) {
      let json
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]))
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(json)
      } else {
        try {
          json = JSON.parse(chunk)
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(json)
      }
    } else {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk])
      } else {
        buffer = Buffer.concat([chunk])
      }
    }
  })
  /* Register error cb */
  res.onAborted(err)
}

// export const sendJson = function sendJson(res, data) {
//   /* If we were aborted, you cannot respond */
//   if (!res.aborted) {
//     res.writeHeader("Content-Type", "application/json");
//     res.end(JSON.stringify(data));
//   }
// };

export const sendJson = function sendJson (res, data) {
  res.cork(() => {
    res
      .writeStatus('200 OK')
      .writeHeader('Content-Type', 'application/json')
      .end(JSON.stringify(data))
  })
}
