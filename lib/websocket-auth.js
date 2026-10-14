import { AuthorizationError } from './authorization.js'

const trustedOrigins = new Set([
  'https://sotefinservice.com',
  'https://sotefinservice.com:8080',
  ...(process.env.BETTER_AUTH_URL ? [new URL(process.env.BETTER_AUTH_URL).origin] : []),
  ...(process.env.WEBSOCKET_TRUSTED_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean),
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://localhost:3000'] : [])
])

export function authenticatedWebSocket ({ authorize, aps, permission, topic, origins = trustedOrigins }) {
  return {
    async upgrade (res, req, context) {
      let aborted = false
      res.onAborted(() => { aborted = true })
      // uWS requests are valid only until the first await.
      const headers = {}
      req.forEach((key, value) => { headers[key] = value })
      const key = req.getHeader('sec-websocket-key')
      const protocol = req.getHeader('sec-websocket-protocol')
      const extensions = req.getHeader('sec-websocket-extensions')
      if (!origins.has(headers.origin)) {
        res.cork(() => res.writeStatus('403 Forbidden').end())
        return
      }
      const protocols = protocol.split(',').map(value => value.trim())
      const credentials = protocols.filter(value => value.startsWith('parkbot-session.'))
      let selectedProtocol = ''
      if (credentials.length) {
        const token = credentials[0].slice('parkbot-session.'.length)
        if (credentials.length !== 1 || !protocols.includes('parkbot') || !/^[A-Za-z0-9_-]+$/.test(token)) {
          res.cork(() => res.writeStatus('401 Unauthorized').end())
          return
        }
        headers.authorization = `Bearer ${token}`
        // Return only the application protocol, never echo the credential.
        selectedProtocol = 'parkbot'
      }
      try {
        const session = await authorize(headers, aps, permission)
        if (aborted) return
        res.cork(() => res.upgrade({ headers, expiresAt: session.session.expiresAt, closed: false }, key, selectedProtocol, extensions, context))
      } catch (error) {
        if (aborted) return
        const status = error instanceof AuthorizationError
          ? (error.status === 401 ? '401 Unauthorized' : '403 Forbidden')
          : '500 Internal Server Error'
        res.cork(() => res.writeStatus(status).end())
      }
    },
    open (ws) {
      const state = ws.getUserData()
      const schedule = () => {
        if (state.closed) return
        const remaining = new Date(state.expiresAt).getTime() - Date.now()
        if (!Number.isFinite(remaining) || remaining <= 0) {
          state.closed = true
          ws.end(1008, 'Session expired')
          return
        }
        state.timer = setTimeout(async () => {
          try {
            const session = await authorize(state.headers, aps, permission)
            if (state.closed) return
            state.expiresAt = session.session.expiresAt
            schedule()
          } catch (error) {
            if (!state.closed) {
              state.closed = true
              ws.end(error instanceof AuthorizationError ? 1008 : 1011, 'Authorization failed')
            }
          }
        }, Math.min(15_000, remaining))
        state.timer.unref?.()
      }
      schedule()
      if (!state.closed) ws.subscribe(topic)
    },
    close (ws) {
      const state = ws.getUserData()
      state.closed = true
      clearTimeout(state.timer)
    }
  }
}
