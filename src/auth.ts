import { Lucia, type DatabaseSession, type DatabaseUser } from "lucia";
import { eq } from "drizzle-orm";
import { db, User, Session } from "../db/config"; // перевір шлях до файлу config.ts

// Описуємо інтерфейс нашого адаптера з правильними типами для Lucia
const customAdapter = {
	async getSessionAndUser(sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		const [databaseSession] = await db
			.select()
			.from(Session)
			.where(eq(Session.id, sessionId))
			.limit(1);
		
		if (!databaseSession) return [null, null];

		const [databaseUser] = await db
			.select()
			.from(User)
			.where(eq(User.id, databaseSession.userId))
			.limit(1);

		if (!databaseUser) return [null, null];

		// Формуємо об'єкт сесії чітко за стандартом DatabaseSession
		const session: DatabaseSession = {
			id: databaseSession.id,
			userId: databaseSession.userId,
			expiresAt: new Date(databaseSession.expiresAt),
			attributes: {}
		};

		// Формуємо об'єкт користувача чітко за стандартом DatabaseUser
		const user: DatabaseUser = {
			id: databaseUser.id,
			attributes: {
				username: databaseUser.username,
				role: databaseUser.role
			}
		};

		return [session, user];
	},

	async getUserSessions(userId: string): Promise<DatabaseSession[]> {
		const databaseSessions = await db
			.select()
			.from(Session)
			.where(eq(Session.userId, userId));

		return databaseSessions.map((session) => ({
			id: session.id,
			userId: session.userId,
			expiresAt: new Date(session.expiresAt),
			attributes: {}
		}));
	},

	async setSession(session: DatabaseSession): Promise<void> {
		await db.insert(Session).values({
			id: session.id,
			userId: session.userId,
			expiresAt: session.expiresAt.toISOString()
		});
	},

	async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		await db
			.update(Session)
			.set({ expiresAt: expiresAt.toISOString() })
			.where(eq(Session.id, sessionId));
	},

	async deleteSession(sessionId: string): Promise<void> {
		await db.delete(Session).where(eq(Session.id, sessionId));
	},

	async deleteUserSessions(userId: string): Promise<void> {
		await db.delete(Session).where(eq(Session.userId, userId));
	},

	async deleteExpiredSessions(): Promise<void> {
		await db
			.delete(Session)
			.where(eq(Session.expiresAt, new Date().toISOString()));
	}
};

// Тепер Lucia прийме цей адаптер без жодних зауважень
export const lucia = new Lucia(customAdapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes: any) => {
		return {
			username: attributes.username,
			role: attributes.role
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			username: string;
			role: string;
		};
	}
}