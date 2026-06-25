export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
}

// export const readJson = function readJson (res, cb, err) {
//   let buffer
//   /* Register data cb */
//   res.onData((ab, isLast) => {
//     const chunk = Buffer.from(ab)
//     if (isLast) {
//       let json
//       if (buffer) {
//         try {
//           json = JSON.parse(Buffer.concat([buffer, chunk]))
//         } catch (e) {
//           /* res.close calls onAborted */
//           res.close()
//           return
//         }
//         cb(json)
//       } else {
//         try {
//           json = JSON.parse(chunk)
//         } catch (e) {
//           /* res.close calls onAborted */
//           res.close()
//           return
//         }
//         cb(json)
//       }
//     } else {
//       if (buffer) {
//         buffer = Buffer.concat([buffer, chunk])
//       } else {
//         buffer = Buffer.concat([chunk])
//       }
//     }
//   })
//   /* Register error cb */
//   res.onAborted(err)
// }

export const readJson = function readJson (res) {
  return new Promise((resolve, reject) => {
    let buffer = ''

    res.onData((chunk, isLast) => {
      if (res.aborted) return

      buffer += Buffer.from(chunk).toString()

      if (isLast) {
        try {
          resolve(JSON.parse(buffer))
        } catch (err) {
          reject(new Error('Invalid JSON'))
        }
      }
    })

    res.onAborted(() => {
      reject(new Error('Aborted'))
    })
  })
}

// export const readJson = function readJson (res) {
//   return new Promise((resolve, reject) => {
//     let buffer

//     res.onData((ab, isLast) => {
//       const chunk = Buffer.from(ab)

//       if (isLast) {
//         try {
//           const json = buffer
//             ? JSON.parse(Buffer.concat([buffer, chunk]))
//             : JSON.parse(chunk)

//           resolve(json)
//         } catch (e) {
//           // Chiude la connessione → attiva onAborted
//           res.close()
//         }
//       } else {
//         buffer = buffer
//           ? Buffer.concat([buffer, chunk])
//           : Buffer.concat([chunk])
//       }
//     })

//     res.onAborted(() => {
//       reject(new Error('Request aborted'))
//     })
//   })
// }

export const sendJson = function sendJson (res, data, status) {
  /* If we were aborted, you cannot respond */
  if (!res.aborted) {
    res.cork(() => {
      res
        .writeStatus(status || '200 OK')
        .writeHeader('Content-Type', 'application/json')
        .end(JSON.stringify(data))
    })
  }
}
