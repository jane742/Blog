import { d as db, a as PostTag, C as Comment, P as Post } from '../../../chunks/config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import fs from 'node:fs/promises';
import nodePath from 'node:path';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, locals, redirect }) {
  const user = locals.user;
  if (!user || user.role !== "admin") {
    return new Response("Доступ запрещен", { status: 403 });
  }
  const formData = await request.formData();
  const postId = formData.get("postId")?.toString();
  const imagePath = formData.get("imagePath")?.toString();
  if (!postId) return new Response("ID не указан", { status: 400 });
  if (imagePath) {
    try {
      const fullPath = nodePath.join(process.cwd(), "public", imagePath);
      await fs.unlink(fullPath);
    } catch (e) {
      console.log("Файл не найден или уже удален:", e);
    }
  }
  await db.delete(PostTag).where(eq(PostTag.postId, postId));
  await db.delete(Comment).where(eq(Comment.postId, postId));
  await db.delete(Post).where(eq(Post.id, postId));
  return redirect("/admin/dashboard");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
