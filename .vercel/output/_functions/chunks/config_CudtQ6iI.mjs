import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const User = sqliteTable("User", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  role: text("role").default("user").notNull()
  // 'user' или 'admin'
});
const Session = sqliteTable("Session", {
  id: text("id").primaryKey(),
  expiresAt: text("expiresAt").notNull(),
  userId: text("userId").references(() => User.id).notNull()
});
const Post = sqliteTable("Post", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  views: integer("views").default(0),
  slug: text("slug").unique().notNull(),
  publishedAt: text("publishedAt").default((/* @__PURE__ */ new Date()).toISOString()).notNull(),
  // В SQLite даты лучше хранить строкой
  authorId: text("authorId").references(() => User.id).notNull(),
  image: text("image")
  // Опциональное поле
});
const Comment = sqliteTable("Comment", {
  id: text("id").primaryKey(),
  body: text("body").notNull(),
  publishedAt: text("publishedAt").default((/* @__PURE__ */ new Date()).toISOString()).notNull(),
  postId: text("postId").references(() => Post.id, { onDelete: "cascade" }).notNull(),
  authorId: text("authorId").references(() => User.id).notNull()
});
const Tag = sqliteTable("Tag", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull()
});
const PostTag = sqliteTable("PostTag", {
  postId: text("postId").references(() => Post.id, { onDelete: "cascade" }).notNull(),
  tagId: text("tagId").references(() => Tag.id, { onDelete: "cascade" }).notNull()
});
const client = createClient({
  url: "libsql://my-blog-db-jane742.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjkzNzM2NjQsImlkIjoiNjk1MTg5NjItZjc4Yi00ZDljLTk4MWQtODIwY2IzN2E1NzNjIiwicmlkIjoiN2E5Njc5NTQtN2QyMC00ZmNlLTlkZTMtZTMzODM1MDI2NWQ3In0.wZbCB_fg_Qx777AdpPrPyWto5Jw8m8O23JUXmfDVyR4YjNRvL9H9lmyBCc6BvGl6MGprFjLlCinl7o57TjbrAA"
});
const db = drizzle(client);

export { Comment as C, Post as P, Session as S, Tag as T, User as U, PostTag as a, db as d };
