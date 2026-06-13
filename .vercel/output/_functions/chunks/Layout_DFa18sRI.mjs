import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { J as createRenderInstruction, I as renderTemplate, bi as renderSlot, bj as renderHead } from './sequence_5gyAyBy_.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-bs-theme="auto"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="Astro v5.7.10">', '<link href="../styles/bootstrap.min.css" rel="stylesheet"><link href="../styles/blog.css" rel="stylesheet"><link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css"><script src="https://unpkg.com/easymde/dist/easymde.min.js"><\/script>', '</head> <body class="hero-bg-wrapper"> ', " </body></html>"])), renderScript($$result, "C:/Users/jane/blog/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/jane/blog/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
