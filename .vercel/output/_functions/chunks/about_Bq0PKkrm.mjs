import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_D61pzee8.mjs';
import 'clsx';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';
import { $ as $$Menu } from './Menu_D4CLu_NK.mjs';

const $$Welcome = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/jane/blog/src/components/Welcome.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
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
