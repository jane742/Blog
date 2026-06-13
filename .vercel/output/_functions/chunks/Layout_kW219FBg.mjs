import { e as createComponent, r as renderTemplate, o as renderSlot, p as renderHead, l as renderScript, h as createAstro } from './astro/server_rOUT-VGP.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-bs-theme="auto"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="Astro v5.7.10">', '<link href="../styles/bootstrap.min.css" rel="stylesheet"><link href="../styles/blog.css" rel="stylesheet"><link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css"><script src="https://unpkg.com/easymde/dist/easymde.min.js"><\/script>', '</head> <body class="hero-bg-wrapper"> ', " </body></html>"])), renderScript($$result, "C:/Users/jane/blog/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/jane/blog/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
