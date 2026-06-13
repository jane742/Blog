import { e as createComponent, r as renderTemplate } from '../chunks/astro/server_rOUT-VGP.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/jane/blog/src/pages/blog.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Blog,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
