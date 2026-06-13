import { db, Comment } from '../../../../db/config';
import { generateId } from "lucia";

export async function POST(context: any) {
  // 1. Проверяем авторизацию через locals (наш Middleware)
  const session = context.locals.session;
  const user = context.locals.user;

  if (!session || !user) {
    return new Response("Вы должны войти в систему, чтобы оставить комментарий", { status: 401 });
  }

  // 2. Получаем данные из формы
  const formData = await context.request.formData();
  const body = formData.get("commentBody");
  const postId = formData.get("postId");

  // 3. Валидация данных
  if (typeof body !== "string" || body.length < 3) {
    return new Response("Комментарий слишком короткий", { status: 400 });
  }

  if (typeof postId !== "string") {
    return new Response("Некорректный ID поста", { status: 400 });
  }

  try {
    // 4. Записываем в базу данных
    await db.insert(Comment).values({
      id: generateId(15),
      body: body,
      postId: postId,
      authorId: user.id,
     publishedAt: new Date().toISOString() // ИСПРАВЛЕНО: добавили .toISOString()
    });

    // 5. Возвращаем пользователя обратно на страницу поста
    // Мы берем Referer из заголовков, чтобы пользователь остался там же, где писал
    const referer = context.request.headers.get("referer");
    return context.redirect(referer || "/");

  } catch (e) {
    console.error(e);
    return new Response("Ошибка при сохранении комментария", { status: 500 });
  }
}