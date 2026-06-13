import { d as db, C as Comment } from './config_CudtQ6iI.mjs';
import { generateId } from 'lucia';

async function POST(context) {
  const session = context.locals.session;
  const user = context.locals.user;
  if (!session || !user) {
    return new Response("Вы должны войти в систему, чтобы оставить комментарий", { status: 401 });
  }
  const formData = await context.request.formData();
  const body = formData.get("commentBody");
  const postId = formData.get("postId");
  if (typeof body !== "string" || body.length < 3) {
    return new Response("Комментарий слишком короткий", { status: 400 });
  }
  if (typeof postId !== "string") {
    return new Response("Некорректный ID поста", { status: 400 });
  }
  try {
    await db.insert(Comment).values({
      id: generateId(15),
      body,
      postId,
      authorId: user.id,
      publishedAt: (/* @__PURE__ */ new Date()).toISOString()
      // ИСПРАВЛЕНО: добавили .toISOString()
    });
    const referer = context.request.headers.get("referer");
    return context.redirect(referer || "/");
  } catch (e) {
    console.error(e);
    return new Response("Ошибка при сохранении комментария", { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
