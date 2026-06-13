import { e as createComponent, r as renderTemplate, k as renderComponent, h as createAstro } from '../chunks/astro/server_rOUT-VGP.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { $ as $$Menu } from '../chunks/Menu_Bh_G5M9m.mjs';
import { $ as $$Layout } from '../chunks/Layout_kW219FBg.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Welcome = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/jane/blog/src/components/Welcome.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${renderComponent($$result2, "Welcome", $$Welcome, {})} ` })}`;
}, "C:/Users/jane/blog/src/pages/about.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
