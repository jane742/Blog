import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, User, Session } from '../db/config';


const adapter = new DrizzleSQLiteAdapter(
  db as any, 
  Session as any, // Таблица сессий
  User as any    // Таблица пользователей
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD
    }
  },
  getUserAttributes: (attributes: any) => {
    return {
      username: attributes.username,
      role: attributes.role // Добавляем передачу роли
    };
  }
});
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			username: string;
            role: string; // Добавляем в типы
		};
	}
}
