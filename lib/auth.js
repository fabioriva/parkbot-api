import { betterAuth } from 'better-auth/minimal'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { bearer } from 'better-auth/plugins'
import { MongoClient } from 'mongodb'
import { createAuthorizer } from './authorization.js'

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db('parkbot-auth')

export const auth = betterAuth({
  advanced: { cookiePrefix: 'parkbot' },
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      twoFactorEnabled: { type: 'boolean', required: false, input: false }
    }
  },
  plugins: [bearer()]
})

export async function checkAuth (headers) {
  return auth.api.getSession({ headers: new Headers(headers), query: { disableCookieCache: true, disableRefresh: true } })
}

export const authorize = createAuthorizer({
  getSession: checkAuth,
  requireTwoFactor: process.env.TWO_FACTOR === 'enabled',
  async findSubscription (email) {
    const normalized = email.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const matches = await db.collection('subscription').find({ email: { $regex: `^${normalized}$`, $options: 'i' } }).limit(2).toArray()
    if (matches.length > 1) throw new Error('Duplicate subscriptions for email')
    return matches[0] ?? null
  }
})
