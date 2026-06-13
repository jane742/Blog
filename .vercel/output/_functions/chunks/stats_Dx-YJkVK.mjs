import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_CJ1E1AZm.mjs';
import { d as db, P as Post, C as Comment, U as User } from './config_CudtQ6iI.mjs';
import { count, eq, desc } from 'drizzle-orm';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';
import { $ as $$Menu } from './Menu_TL8S7rRH.mjs';

const $$Stats = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Stats;
  const { user } = Astro2.locals;
  if (!user || user.role !== "admin") return Astro2.redirect("/");
  const topPosts = await db.select({
    title: Post.title,
    commentCount: count(Comment.id)
  }).from(Post).leftJoin(Comment, eq(Post.id, Comment.postId)).groupBy(Post.id).orderBy(desc(count(Comment.id))).limit(10);
  const topUsers = await db.select({
    username: User.username,
    commentCount: count(Comment.id)
  }).from(User).leftJoin(Comment, eq(User.id, Comment.authorId)).groupBy(User.id).orderBy(desc(count(Comment.id))).limit(10);
  const topViewPosts = await db.select().from(Post).orderBy(desc(Post.views)).limit(5);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-h2yfglne": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, { "data-astro-cid-h2yfglne": true })}  ${maybeRenderHead()}<div class="container py-2" data-astro-cid-h2yfglne> <a href="/admin/dashboard" data-astro-cid-h2yfglne>← Назад в адмиінку</a> <h1 data-astro-cid-h2yfglne>Аналітика блогу</h1> <div class="row" data-astro-cid-h2yfglne> <div class="stats-grid col-4" data-astro-cid-h2yfglne> <div class="stat-card bg-transparent  bg-gradient" data-astro-cid-h2yfglne> <h3 data-astro-cid-h2yfglne>🔥 Найпопулярніші статті</h3> <table data-astro-cid-h2yfglne> <thead data-astro-cid-h2yfglne> <tr class="text-primary fw-light" data-astro-cid-h2yfglne> <th data-astro-cid-h2yfglne></th> <th class="text-primary fw-light" data-astro-cid-h2yfglne>Стаття</th><th class="text-primary fw-light" data-astro-cid-h2yfglne>Переглядів</th></tr> </thead> <tbody data-astro-cid-h2yfglne> ${topViewPosts.map((post, index) => {
    const maxViews = topViewPosts[0]?.views || 1;
    const percentage = Math.round((post.views || 0) / maxViews * 100);
    return renderTemplate`<tr data-astro-cid-h2yfglne> <td data-astro-cid-h2yfglne>#${index + 1}</td> <td data-astro-cid-h2yfglne> ${post.title}</td> <td data-astro-cid-h2yfglne> 👀 ${post.views}</td> <td data-astro-cid-h2yfglne> <div class="progress-bar-fill"${addAttribute(`width: ${percentage}%`, "style")} data-astro-cid-h2yfglne></div></td> </tr>`;
  })} </tbody> </table> </div> </div> <div class="stats-grid col-4" data-astro-cid-h2yfglne> <div class="stat-card bg-transparent  bg-gradient" data-astro-cid-h2yfglne> <h3 data-astro-cid-h2yfglne>🔥 Найбільше обговорюють</h3> <table data-astro-cid-h2yfglne> <thead data-astro-cid-h2yfglne> <tr data-astro-cid-h2yfglne><th class="text-primary fw-light" data-astro-cid-h2yfglne>Пост</th><th class="text-primary fw-light" data-astro-cid-h2yfglne>Коментарів</th></tr> </thead> <tbody data-astro-cid-h2yfglne> ${topPosts.map((p) => renderTemplate`<tr data-astro-cid-h2yfglne> <td data-astro-cid-h2yfglne>${p.title}</td> <td data-astro-cid-h2yfglne><strong data-astro-cid-h2yfglne>${p.commentCount}</strong></td> </tr>`)} </tbody> </table> </div></div> <div class="stats-grid col-4" data-astro-cid-h2yfglne> <div class="stat-card bg-transparenty  bg-gradient" data-astro-cid-h2yfglne> <h3 data-astro-cid-h2yfglne>🏆 Топ коментаторів</h3> <table data-astro-cid-h2yfglne> <thead data-astro-cid-h2yfglne> <tr data-astro-cid-h2yfglne><th class="text-primary fw-light" data-astro-cid-h2yfglne>Користувач </th><th class="text-primary fw-light" data-astro-cid-h2yfglne>Всього коментарів</th></tr> </thead> <tbody data-astro-cid-h2yfglne> ${topUsers.map((u) => renderTemplate`<tr data-astro-cid-h2yfglne> <td data-astro-cid-h2yfglne>${u.username}</td> <td data-astro-cid-h2yfglne><strong data-astro-cid-h2yfglne>${u.commentCount}</strong></td> </tr>`)} </tbody> </table> </div> </div> </div> </div> ` })}`;
}, "C:/Users/jane/blog/src/pages/admin/stats.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/admin/stats.astro";
const $$url = "/admin/stats";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Stats,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
