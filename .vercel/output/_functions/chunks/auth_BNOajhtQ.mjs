import { Lucia } from 'lucia';
import { eq } from 'drizzle-orm';
import { d as db, S as Session, U as User } from './config_CudtQ6iI.mjs';

const customAdapter = {
  async getSessionAndUser(sessionId) {
    const [databaseSession] = await db.select().from(Session).where(eq(Session.id, sessionId)).limit(1);
    if (!databaseSession) return [null, null];
    const [databaseUser] = await db.select().from(User).where(eq(User.id, databaseSession.userId)).limit(1);
    if (!databaseUser) return [null, null];
    const session = {
      id: databaseSession.id,
      userId: databaseSession.userId,
      expiresAt: new Date(databaseSession.expiresAt),
      attributes: {}
    };
    const user = {
      id: databaseUser.id,
      attributes: {
        username: databaseUser.username,
        role: databaseUser.role
      }
    };
    return [session, user];
  },
  async getUserSessions(userId) {
    const databaseSessions = await db.select().from(Session).where(eq(Session.userId, userId));
    return databaseSessions.map((session) => ({
      id: session.id,
      userId: session.userId,
      expiresAt: new Date(session.expiresAt),
      attributes: {}
    }));
  },
  async setSession(session) {
    await db.insert(Session).values({
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt.toISOString()
    });
  },
  async updateSessionExpiration(sessionId, expiresAt) {
    await db.update(Session).set({ expiresAt: expiresAt.toISOString() }).where(eq(Session.id, sessionId));
  },
  async deleteSession(sessionId) {
    await db.delete(Session).where(eq(Session.id, sessionId));
  },
  async deleteUserSessions(userId) {
    await db.delete(Session).where(eq(Session.userId, userId));
  },
  async deleteExpiredSessions() {
    await db.delete(Session).where(eq(Session.expiresAt, (/* @__PURE__ */ new Date()).toISOString()));
  }
};
const lucia = new Lucia(customAdapter, {
  sessionCookie: {
    attributes: {
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      role: attributes.role
    };
  }
});

export { lucia as l };
