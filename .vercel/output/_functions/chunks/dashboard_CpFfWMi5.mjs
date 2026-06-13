import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_CXH78Uga.mjs';
import { d as db, P as Post, T as Tag, a as PostTag } from './config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';
import { $ as $$Menu } from './Menu_bpey7TDX.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Dashboard;
  const { user } = Astro2.locals;
  if (!user || user.role !== "admin") {
    return Astro2.redirect("/");
  }
  const allPosts = await db.select({
    id: Post.id,
    title: Post.title,
    slug: Post.slug,
    publishedAt: Post.publishedAt,
    tagName: Tag.name,
    views: Post.views
  }).from(Post).leftJoin(PostTag, eq(Post.id, PostTag.postId)).leftJoin(Tag, eq(PostTag.tagId, Tag.id));
  const posts = allPosts.reduce((acc, row) => {
    const post = acc.find((p) => p.id === row.id);
    if (post) {
      if (row.tagName) {
        post.tags.push(row.tagName);
      }
    } else {
      acc.push({
        id: row.id,
        title: row.title,
        slug: row.slug,
        publishedAt: new Date(row.publishedAt),
        views: row.views,
        tags: row.tagName ? [row.tagName] : []
        // Инициализируем массив тегов
      });
    }
    return acc;
  }, []);
  const totalViews = posts.reduce((sum, post) => {
    const postViews = post.views || 0;
    return sum + postViews;
  }, 0);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${maybeRenderHead()}<div class="container py-1 mb-0 border-bottom"> <span class="badge bg-primary-subtle text-light mb-0 px-3 py-2 rounded-pill fs-5 fw-semibold">
Панель керування: ${user.username} </span> <div class="container py-2"> <div class="row g-3 mb-1"> <div class="col-6 col-md-3"> <div class="card border-1 bg-transparent rounded-4 p-2 shadow-sm mb-4"> <div class="text-muted small fw-medium mb-1">Всього статей</div> <div class="h3 fw-lighter text-light m-0">${posts.length}</div> </div> </div> <div class="col-6 col-md-3"> <div class="card border-1 bg-transparent rounded-4 p-2 shadow-sm mb-4"> <div class="text-muted small fw-medium mb-1">
Загальні перегляди
</div> <div class="h3 fw-lighter text-light m-0">${totalViews}</div> </div> </div> <div class="mb-3"> <a href="/admin/create" class="btn btn-primary px-4 py-2.5 rounded-3 fw-bold shadow-sm btn-create-post text-uppercase tracking-wider">
➕ Створити новий пост
</a> <a href="/admin/stats" class="btn btn-outline-primary px-4 py-2.5 rounded-3 fw-bold shadow-sm text-uppercase tracking-wider">
📊 Статистика</a> </div> </div> <div class="border-0 shadow-sm rounded-4 overflow-hidden bg-primary"> <table class="table table-striped table-dark align-middle mb-0"> <thead> <tr class="py-3 px-10 text-secondary small text-uppercase text-center fw-bold"> <th>Стаття</th> <th>Дата</th> <th>Перегляди</th> <th>Дії</th> </tr> </thead> <tbody> ${posts.map((post) => renderTemplate`<tr> <td class="px-2 py-2"> <div class="fw-semibold text-mute text-truncate-2"${addAttribute(post.title, "title")}> ${post.title} </div> <div class="d-flex flex-wrap gap-1 mt-2"> ${post.tags.length > 0 ? (
    // Поскольку твоя серверная часть уже собрала теги в массив строк,
    // мы просто перебираем их через .map()
    post.tags.map((tag) => renderTemplate`<span class="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1 font-monospace fs-xs">
#${tag} </span>`)
  ) : (
    // Если у поста нет ни одного тега
    renderTemplate`<span class="text-muted fs-xs fst-italic ps-1">
Немає тегів
</span>`
  )} </div> </td> <td class="py-3 text-muted small"> ${new Date(post.publishedAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })} </td> <td class="py-3 text-center"> <span class="badge bg-secondary text-dark border rounded-pill px-2.5 py-1.5 font-monospace small">
👁️ ${post.views} </span> </td> <td class="pe-4 py-3 text-end"> <div class="d-inline-flex gap-2"> <a${addAttribute(`/admin/edit/${post.id}`, "href")} class="btn btn-sm btn-outline-primary rounded-3 px-3 py-1.5 d-flex align-items-center gap-1 hover-translate" title="Редактировать статью">
✏️ <span class="d-none d-md-inline">Редагувати</span> </a> <form method="POST"${addAttribute(`/api/posts/delete`, "action")} class="m-0" onsubmit="return confirm('Ви впевнені, що хочете видалити цю статтю?');"> <input type="hidden" name="postId"${addAttribute(post.id, "value")}> <button type="submit" class="btn btn-sm btn-outline-danger rounded-3 px-3 py-1.5 d-flex align-items-center gap-1 hover-translate" title="Удалить статью">
🗑️ <span class="d-none d-md-inline">Видалити</span> </button> </form> </div> </td> </tr>`)} ${allPosts.length === 0 && renderTemplate`<tr> <td colspan="4" class="text-center py-5 text-muted"> <span class="fs-2 d-block mb-2">📝</span>
Ви не поки що не створили жодного посту
</td> </tr>`} </tbody> </table> </div> </div> </div> ` })}`;
}, "C:/Users/jane/blog/src/pages/admin/dashboard.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
