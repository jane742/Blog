import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_T2t5GGLI.mjs';
import { manifest } from './manifest_bH-1lRn1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/create.astro.mjs');
const _page3 = () => import('./pages/admin/dashboard.astro.mjs');
const _page4 = () => import('./pages/admin/edit/_id_.astro.mjs');
const _page5 = () => import('./pages/admin/stats.astro.mjs');
const _page6 = () => import('./pages/api/comments/create.astro.mjs');
const _page7 = () => import('./pages/api/logout.astro.mjs');
const _page8 = () => import('./pages/api/posts/delete.astro.mjs');
const _page9 = () => import('./pages/blog/_slug_.astro.mjs');
const _page10 = () => import('./pages/blog.astro.mjs');
const _page11 = () => import('./pages/login.astro.mjs');
const _page12 = () => import('./pages/signup.astro.mjs');
const _page13 = () => import('./pages/tags/_tag_.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/create.astro", _page2],
    ["src/pages/admin/dashboard.astro", _page3],
    ["src/pages/admin/edit/[id].astro", _page4],
    ["src/pages/admin/stats.astro", _page5],
    ["src/pages/api/comments/create.ts", _page6],
    ["src/pages/api/logout.ts", _page7],
    ["src/pages/api/posts/delete.ts", _page8],
    ["src/pages/blog/[slug].astro", _page9],
    ["src/pages/blog.astro", _page10],
    ["src/pages/login.astro", _page11],
    ["src/pages/signup.astro", _page12],
    ["src/pages/tags/[tag].astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "92c4cc95-2fe9-495f-a45e-000343ba2342",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
