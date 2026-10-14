export const permissions = {
  admin: ['read', 'technical.read', 'entry', 'exit', 'rollback', 'queue.delete', 'pp', 'map.edit', 'pin.edit', 'notifications', 'clock.set', 'admin'],
  service: ['read', 'technical.read', 'entry', 'exit', 'rollback', 'queue.delete', 'pp', 'map.edit', 'pin.edit', 'notifications', 'clock.set'],
  valet: ['read', 'exit', 'rollback', 'queue.delete']
}

export function can (role, permission) {
  return typeof role === 'string' && Object.hasOwn(permissions, role) && permissions[role].includes(permission)
}

export class AuthorizationError extends Error {
  constructor (status, message) {
    super(message)
    this.status = status
  }
}

export function createAuthorizer ({ getSession, findSubscription, requireTwoFactor = false }) {
  return async (headers, aps, permission) => {
    const session = await getSession(headers)
    if (!session) throw new AuthorizationError(401, 'Unauthorized')
    if (!session.user.emailVerified || (requireTwoFactor && !session.user.twoFactorEnabled)) {
      throw new AuthorizationError(403, 'Forbidden')
    }
    const subscription = await findSubscription(session.user.email)
    if (!subscription || !Array.isArray(subscription.aps) ||
        !subscription.aps.includes(aps) || !can(subscription.role, permission)) {
      throw new AuthorizationError(403, 'Forbidden')
    }
    return { ...session, user: { ...session.user, role: subscription.role } }
  }
}
