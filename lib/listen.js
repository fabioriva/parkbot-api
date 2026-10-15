export function listen (app, aps, port) {
  return new Promise((resolve, reject) => {
    app.listen(port, socket => {
      if (!socket) {
        reject(new Error(`Cannot listen on port ${port} for APS ${aps}`))
        return
      }
      console.info({ aps, port }, 'API listening')
      resolve(socket)
    })
  })
}
