import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { u as maybeRenderHead, I as renderTemplate } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_CXH78Uga.mjs';
import { $ as $$Menu } from './Menu_bpey7TDX.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { user } = Astro2.locals;
  user?.role === "admin";
  return renderTemplate`${renderComponent($$result, "Menu", $$Menu, {})} ${maybeRenderHead()}<div class="hero-bg-wrapper min-vh-100 w-100 position-relative text-white overflow-hidden"> <div class="tech-bg-image"></div> <div class="glow-overlay"></div> <div class="container position-relative z-1 py-5"> <div class="row min-vh-75 align-items-center"> <div class="col-lg-7 text-center text-lg-start pt-5"> <span class="badge bg-primary bg-gradient mb-3 px-3 py-2 rounded-pill font-monospace tracking-wider">
&lt;hello_world&gt;
</span> <h1 class="display-3 fw-extrabold mb-3 lh-sm tracking-tight text-white">
Нотатки <span class="text-transparent bg-clip-text bg-gradient-cyan">Фронтендера</span> </h1> <p class="lead text-white-50 mb-4 fs-4 fw-light">
Актуальні статті про Astro, сучасний CSS, TypeScript та архітектуру
          швидких веб-додатків.
</p> <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"> <a href="/blog" class="btn btn-primary px-4 py-3 rounded-3 fw-bold shadow">
Читати блог →
</a> <a href="/blog" class="btn btn-outline-light px-4 py-3 rounded-3 fw-medium opacity-75 hover-opacity-100">
Про проект
</a> </div> </div> </div> </div> </div>`;
}, "C:/Users/jane/blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
