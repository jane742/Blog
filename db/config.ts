import { defineDb, defineTable, column } from 'astro:db';
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    password_hash: column.text(),
    role: column.text({ default: 'user' }) // 'user' или 'admin'
  }
})

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.text(),
    userId: column.text({ references: () => User.columns.id })
  }
})

// ТАБЛИЦА ПОСТОВ
const Post = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    body: column.text(),
   views: column.number({ optional: true, defaultValue: 0 }),
    slug: column.text({ unique: true }), // URL поста, 
    publishedAt: column.date({ default: new Date() }),
    authorId: column.text({ references: () => User.columns.id }),
    image: column.text({ optional: true }), // Новое поле для пути к фото
  }
});

// ТАБЛИЦА КОММЕНТАРИЕВ
const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    body: column.text(),
    publishedAt: column.date({ default: new Date() }),
    // Связь с постом: если пост удален, комментарии тоже должны удалиться
    postId: column.text({ references: () => Post.columns.id }),
    // Связь с автором комментария
    authorId: column.text({ references: () => User.columns.id }),
  }
});
// Таблица для самих уникальных тегов
const Tag = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }), // Название тега, например "astro" или "life"
  }
});

// Связующая таблица (многие-ко-многим)

const PostTag = defineTable({
  columns: {
    postId: column.text({ references: () => Post.columns.id, onDelete: 'cascade' }),
    tagId: column.text({ references: () => Tag.columns.id, onDelete: 'cascade' }),
  }
});

// Не забудьте добавить их в экспорт defineDb
export default defineDb({
  tables: { 
    User, 
    Session, 
    Post, 
    Comment,
    Tag,
    PostTag
  }
});
