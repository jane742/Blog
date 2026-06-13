import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, F as Fragment } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_D61pzee8.mjs';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';

const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Menu;
  const { user } = Astro2.locals;
  const isAdmin = user?.role === "admin";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="glass-panel"> <div class="px-10 d-flex flex-nowrap justify-content-between align-items-center w-100"> <div class="col-auto"> <a class="navbar-brand d-flex align-items-center" href="/"> <div class="logo-badge gradient-brand"> <span class="font-monospace fw-bold fs-1">&lt;/&gt;</span> </div> <span class="logo-text">DEV </span> <span class="text-primary fs-1">NOTES</span> </a> </div> <div class="col-auto d-flex align-items-center justify-content-end"> ${user ? renderTemplate`<div> <form method="post" action="../api/logout">
Ви увійшли як: <strong>${user.username}</strong> <button class="btn btn-sm btn-outline-secondary"> ${" "}
Вийти${" "} </button> </form> </div>` : renderTemplate`<div>
Ви не авторизовані
<a class="btn btn-sm btn-outline-secondary" href="/login">
Увійти
</a> </div>`} ${isAdmin && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <span>&nbsp;&nbsp;</span> <a class="btn btn-sm btn-outline-secondary" href="../admin/dashboard">
Адмін-панель
</a> ` })}`} <a class="btn btn-sm btn-outline-secondary" href="#">Увійти</a> </div> </div> </header> ` })}`;
}, "C:/Users/jane/blog/src/components/Menu.astro", void 0);

export { $$Menu as $ };
