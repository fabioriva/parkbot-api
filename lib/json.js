export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
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

export const sendJson = function sendJson (res, data) {
  /* If we were aborted, you cannot respond */
  if (!res.aborted) {
    res.cork(() => {
      res
        .writeHeader('Content-Type', 'application/json')
        .end(JSON.stringify(data))
    })
  }
}
