
import { db, User, Post,Session,Comment } from '../db/config';
import { Scrypt } from "oslo/password";

export default async function seed() {
    const scrypt = new Scrypt();
    
    // 1. Генерируем хеш пароля для админа (например, для пароля "admin123")
    // В реальном проекте лучше один раз сгенерировать его и вставить строкой
    const adminPasswordHash = await scrypt.hash("111111");

    // 2 Наполняем таблицу пользователей.
    await db.insert(User).values([
        {
            id: "admin_id",
            username: "admin",
            password_hash: adminPasswordHash,
            role: "admin"
        },
        {
            id: "test_user_id",
            username: "tester",
            password_hash: await scrypt.hash("user123"),
            role: "user"
        }
    ]);
// Создаем тестовый пост
    await db.insert(Post).values([
        {
            id: "post_1",
            title: "Добро пожаловать в мой блог",
            body: "Это мой первый пост, созданный через Astro DB!",
            slug: "welcome-post",
            authorId: "admin_id"
        }
    ]);

    // Создаем тестовый комментарий
    await db.insert(Comment).values([
        {
            id: "comm_1",
            body: "Крутой блог! Жду новых постов.",
            postId: "post_1",
            authorId: "admin_id" // Админ сам себе прокомментировал :)
        }
    ]);
    console.log('✅ База данных успешно наполнена тестовыми данными!');
}