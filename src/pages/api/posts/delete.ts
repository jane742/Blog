import { db, Post, PostTag, Comment } from '../../../../db/config';
import { eq, count, desc  } from 'drizzle-orm';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIContext } from 'astro';

export async function POST({ request, locals, redirect }: APIContext) {
  const user = locals.user;
    
  // 1. Проверка прав
  if (!user || user.role !== 'admin') {
    return new Response("Доступ запрещен", { status: 403 });
  }

  const formData = await request.formData();
  const postId = formData.get("postId")?.toString();
  const imagePath = formData.get("imagePath")?.toString();

  if (!postId) return new Response("ID не указан", { status: 400 });

  // 2. Удаление файла картинки с диска (если она есть)
  if (imagePath) {
    try {
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      await fs.unlink(fullPath);
    } catch (e) {
      console.log("Файл не найден или уже удален:", e);
    }
  }
  // 3. Удаление записи из базы данных
// 1. Сначала железно удаляем все упоминания поста из таблицы связей
await db.delete(PostTag).where(eq(PostTag.postId, postId));
await db.delete(Comment).where(eq(Comment.postId, postId));
// 2. И только теперь, когда базе ничего не мешает, удаляем сам пост
await db.delete(Post).where(eq(Post.id, postId));
return redirect('/admin/dashboard');
}