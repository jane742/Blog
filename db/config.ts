import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// 1. ОПИСАНИЕ ТАБЛИЦ (СХЕМА)
export const User = sqliteTable('User', {
  id: text('id').primaryKey(),
  username: text('username').unique().notNull(),
  password_hash: text('password_hash').notNull(),
  role: text('role').default('user').notNull(), // 'user' или 'admin'
});

export const Session = sqliteTable('Session', {
  id: text('id').primaryKey(),
  expiresAt: text('expiresAt').notNull(),
  userId: text('userId').references(() => User.id).notNull(),
});

export const Post = sqliteTable('Post', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  views: integer('views').default(0),
  slug: text('slug').unique().notNull(),
  publishedAt: text('publishedAt').default(new Date().toISOString()).notNull(), // В SQLite даты лучше хранить строкой
  authorId: text('authorId').references(() => User.id).notNull(),
  image: text('image'), // Опциональное поле
});

export const Comment = sqliteTable('Comment', {
  id: text('id').primaryKey(),
  body: text('body').notNull(),
  publishedAt: text('publishedAt').default(new Date().toISOString()).notNull(),
  postId: text('postId').references(() => Post.id, { onDelete: 'cascade' }).notNull(),
  authorId: text('authorId').references(() => User.id).notNull(),
});

export const Tag = sqliteTable('Tag', {
  id: text('id').primaryKey(),
  name: text('name').unique().notNull(),
});

export const PostTag = sqliteTable('PostTag', {
  postId: text('postId').references(() => Post.id, { onDelete: 'cascade' }).notNull(),
  tagId: text('tagId').references(() => Tag.id, { onDelete: 'cascade' }).notNull(),
});

// 2. ИНИЦИАЛИЗАЦИЯ КЛИЕНТА ДЛЯ СВЯЗИ С TURSO
const databaseUrl = import.meta.env.TURSO_DATABASE_URL || import.meta.env.ASTRO_DB_REMOTE_URL || process.env.TURSO_DATABASE_URL || '';
const authToken = import.meta.env.TURSO_AUTH_TOKEN || import.meta.env.ASTRO_DB_APP_TOKEN || process.env.TURSO_AUTH_TOKEN || '';

if (!databaseUrl) {
  console.error("⚠️ КРИТИЧНА ПОМИЛКА: URL бази даних не знайдено в змінних оточення!");
}

const client = createClient({
  url: databaseUrl,
  authToken: authToken,
});
// ГЛАВНЫЙ ЭКСПОРТ ДЛЯ ЗАПРОСОВ (db)
export const db = drizzle(client);
