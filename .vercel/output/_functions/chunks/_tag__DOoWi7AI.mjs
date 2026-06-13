import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_D61pzee8.mjs';
import { d as db, P as Post, a as PostTag, T as Tag } from './config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';
import { $ as $$Menu } from './Menu_D4CLu_NK.mjs';

const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$tag;
  const { tag } = Astro2.params;
  if (!tag) return Astro2.redirect("/");
  const filteredPosts = await db.select({
    title: Post.title,
    slug: Post.slug,
    date: Post.publishedAt
  }).from(Post).innerJoin(PostTag, eq(Post.id, PostTag.postId)).innerJoin(Tag, eq(PostTag.tagId, Tag.id)).where(eq(Tag.name, tag));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${maybeRenderHead()}<div class="container py-1 mb-3 "> <h3>Статті з тегом: #${tag}</h3> ${filteredPosts.length === 0 ? renderTemplate`<p>Статей поки що немає.</p>` : renderTemplate`<ul> ${filteredPosts.map((post) => renderTemplate`<li> <a${addAttribute(`/blog/${post.slug}`, "href")}>${post.title}</a> <small>(${new Date(post.date).toLocaleDateString()})</small> </li>`)} </ul>`} </div> ` })}`;
}, "C:/Users/jane/blog/src/pages/tags/[tag].astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
