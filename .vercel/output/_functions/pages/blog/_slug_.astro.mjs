import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_rOUT-VGP.mjs';
import 'piccolore';
import { d as db, P as Post, T as Tag, a as PostTag, C as Comment, U as User } from '../../chunks/config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Layout } from '../../chunks/Layout_kW219FBg.mjs';
import { $ as $$Menu } from '../../chunks/Menu_Bh_G5M9m.mjs';
import { marked } from 'marked';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) return Astro2.redirect("/404");
  const { user } = Astro2.locals;
  const post = await db.select().from(Post).where(eq(Post.slug, slug)).get();
  const renderedMarkdown = await marked(post?.body ?? "");
  if (!post) return Astro2.redirect("/404");
  const tags = await db.select({
    id: Tag.id,
    name: Tag.name
  }).from(PostTag).where(eq(PostTag.postId, post.id)).innerJoin(Tag, eq(PostTag.tagId, Tag.id));
  const comments = await db.select({
    id: Comment.id,
    body: Comment.body,
    authorName: User.username,
    date: Comment.publishedAt
  }).from(Comment).innerJoin(User, eq(Comment.authorId, User.id)).where(eq(Comment.postId, post.id));
  await db.update(Post).set({ views: (post.views || 0) + 1 }).where(eq(Post.id, post.id));
  const isLoggedIn = !!user;
  if (Astro2.request.method === "POST") {
    if (!isLoggedIn) {
      return new Response("\u0414\u043E\u0441\u0442\u0443\u043F \u0437\u0430\u0431\u043E\u0440\u043E\u043D\u0435\u043D\u043E!", { status: 403 });
    }
    try {
      const data = await Astro2.request.formData();
      const action = data.get("_action")?.toString();
      console.log("--- \u041F\u041E\u0421\u0422-\u0417\u0410\u041F\u0420\u041E\u0421 \u041F\u0420\u0418\u041D\u042F\u0422 ---");
      console.log("\u0412\u044B\u0437\u0432\u0430\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435:", action);
      if (action === "delete_comment") {
        if (user.role !== "admin") {
          return new Response("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F", { status: 403 });
        }
        const commentId = data.get("commentId")?.toString();
        if (commentId) {
          console.log("\u0423\u0434\u0430\u043B\u044F\u0435\u043C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441 ID:", commentId);
          await db.delete(Comment).where(eq(Comment.id, commentId));
          return Astro2.redirect(`/blog/${post.slug}#comments-section`);
        }
      }
      if (action === "add_comment") {
        const body = data.get("body")?.toString();
        if (body && body.trim() !== "") {
          const newId = crypto.randomUUID();
          console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u043A\u043E\u043C\u043C\u0435\u043D\u0442 \u0441 UUID:", newId);
          await db.insert(Comment).values({
            id: newId,
            body: body.trim(),
            postId: post.id,
            authorId: user.id,
            publishedAt: (/* @__PURE__ */ new Date()).toISOString()
            // ИСПРАВЛЕНО: добавили .toISOString()
          });
          return Astro2.redirect(`/blog/${post.slug}#comments-section`);
        }
      }
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0441 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F\u043C\u0438:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${maybeRenderHead()}<div class="container my-5" style="max-width: 850px;"> <div class="d-flex justify-content-between align-items-center mb-4"> <a href="/blog" class="btn btn-link text-decoration-none p-0 text-secondary">
← Назад до блогу
</a> <span class="text-dark small bg-light px-2 py-1 rounded">
👀 ${post.views || 0} ${post.views === 1 ? "\u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434" : "\u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0456\u0432"} </span> </div> ${post.image && renderTemplate`<div class="mb-5 overflow-hidden rounded-4 shadow-sm"> <img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="img-fluid w-100 object-fit-cover" style="max-height: 350px;"> </div>`} <header class="mb-5 border-bottom pb-4"> <h1 class="display-7 fw-bold text-light mb-3">${post.title}</h1> <div class="d-flex flex-wrap gap-2 align-items-center text-muted small"> <time${addAttribute(new Date(post.publishedAt).toISOString(), "datetime")}>
🗓️ ${new Date(post.publishedAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })} </time> <span class="text-secondary-subtle">|</span> <div class="d-inline-flex gap-2"> ${tags && tags.map((tag) => renderTemplate`<span class="badge text-bg-light border text-secondary px-2.5 py-1.5 rounded-pill">
#${tag.name} </span>`)} </div> </div> </header> <article class="blog-content"> <div>${unescapeHTML(renderedMarkdown)}</div> </article> <div class="d-flex flex-column gap-3"> ${comments.length === 0 && renderTemplate`<p class="text-muted text-center py-4 bg-body-tertiary rounded-4 border border-dashed">
✨ Станьте першим, хто прокоментує цю статтю!
</p>`} ${comments.map((comment) => renderTemplate`<div class="comment-item p-4 bg-white border rounded-4 shadow-sm"> <div class="d-flex align-items-start gap-3"> <div class="avatar-placeholder rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style="width: 42px; height: 42px;"> ${comment.authorName ? comment.authorName.charAt(0).toUpperCase() : "\u{1F464}"} </div> <div class="flex-grow-1">  <div class="d-flex flex-wrap justify-content-between align-items-baseline mb-2 w-100"> <div> <span class="fw-bold text-dark">${comment.authorName}</span> ${comment.authorName === user?.username && user?.role === "admin" && renderTemplate`<span class="badge bg-danger-subtle text-danger small ms-1 fs-xs">Адмін</span>`} </div> <div class="d-flex align-items-center gap-2"> <time class="text-success small"${addAttribute(comment.date, "datetime")}> ${new Date(comment.date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })} </time> ${user?.role === "admin" && renderTemplate`<form method="POST" class="d-inline" onsubmit="return confirm('Видалити цей коментар безповоротно?');"> <input type="hidden" name="_action" value="delete_comment"> <input type="hidden" name="commentId"${addAttribute(comment.id, "value")}> <button type="submit" class="btn btn-link text-danger p-0 border-0 ms-2 lh-1" title="Видалити коментар">
❌
</button> </form>`} </div> </div> <p class="text-secondary mb-0 text-comment-body"> ${comment.body} </p> </div> </div> </div>`)} </div> ${isLoggedIn ? (
    // Если пользователь вошел — выводим форму с его реальным именем
    renderTemplate`<div class="card border-0 bg-light rounded-4 p-4 mb-5 shadow-sm"> <div class="d-flex align-items-center gap-2 mb-3"> <span class="fs-5">✍️</span> <h4 class="h6 fw-bold text-dark mb-0">
Ви коментуєте як <span class="text-primary fw-semibold">${user.username}</span> </h4> </div> <form method="POST" class="row g-3"> <input type="hidden" name="postId"${addAttribute(post.id, "value")}> <input type="hidden" name="_action" value="add_comment"> <div class="col-12"> <textarea class="form-control border-0 px-3 py-2.5 rounded-3 shadow-inner" id="commentText" name="body" rows="3" placeholder="Напишіть, що ви думаєте про цю статтю..." required></textarea> </div> <div class="col-12 text-end"> <button type="submit" class="btn btn-primary px-4 py-2 rounded-3 fw-medium" value="add_comment">
Відправити коментар
</button> </div> </form> </div>`
  ) : (
    // Если пользователь ГОСТЬ
    renderTemplate`<div class="card border-0 bg-light rounded-4 p-5 mb-5 shadow-sm text-center border border-dashed"> <div class="fs-2 mb-2">🔒</div> <h4 class="h5 fw-bold text-dark mb-2">Обговорення доступне лише для своїх</h4> <p class="text-secondary small mb-4 mx-auto" style="max-width: 400px;">
Щоб поділитися думкою, поставити запитання автору або взяти участь у дискусії, будь ласка, увійдіть до свого облікового запису.
</p> <div> <a href="/login" class="btn btn-outline-primary px-4 py-2 rounded-3 fw-medium">
Увійти або зареєструватись
</a> </div> </div>`
  )} <footer class="mt-5 pt-5 border-top text-center text-muted small"> <p>Дякую за читання! Якщо вам сподобалася стаття, поділіться посиланням із друзями)</p> </footer> </div> ` })}`;
}, "C:/Users/jane/blog/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
