import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_rOUT-VGP.mjs';
import 'piccolore';
import { l as lucia } from '../chunks/auth_BNOajhtQ.mjs';
import { generateIdFromEntropySize } from 'lucia';
import { Scrypt } from 'oslo/password';
import { d as db, U as User } from '../chunks/config_CudtQ6iI.mjs';
import { $ as $$Layout } from '../chunks/Layout_kW219FBg.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  const scrypt = new Scrypt();
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (typeof username !== "string" || username.length < 3) {
      errorMessage = "\u0406\u043C'\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u043D\u0430\u0434\u0442\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u0435";
    } else if (typeof password !== "string" || password.length < 6) {
      errorMessage = "\u041F\u0430\u0440\u043E\u043B\u044C \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0431\u0443\u0442\u0438 \u043D\u0435 \u043C\u0435\u043D\u0448\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432";
    } else {
      try {
        const passwordHash = await scrypt.hash(password);
        const userId = generateIdFromEntropySize(10);
        await db.insert(User).values({
          id: userId,
          username,
          password_hash: passwordHash
        });
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        Astro2.cookies.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
        return Astro2.redirect("/");
      } catch (e) {
        errorMessage = "\u0426\u0435 \u0456\u043C'\u044F \u0432\u0436\u0435 \u0437\u0430\u0439\u043D\u044F\u0442\u0435";
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light-subtle py-5"> <div class="row w-100 justify-content-center"> <div class="col-10 col-sm-8 col-md-6 col-lg-4"> <div class="card border-0 shadow-lg rounded-4 overflow-hidden"> <div class="bg-primary p-4 text-center text-white"> <div class="fs-1 mb-2">🔐</div> <h1 class="h4 fw-bold mb-1">Реєстрація</h1> <p class="small text-white-50 mb-0">
Створіть аккаунт, щоб залишати коментарі
</p> </div> <div class="card-body p-4 p-sm-5"> ${errorMessage && renderTemplate`<div class="alert alert-danger d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4" role="alert"> <span class="fs-5">⚠️</span> <div class="small fw-medium">${errorMessage}</div> </div>`} <form method="post" class="needs-validation"> <div class="mb-3.5"> <label for="username" class="form-label fw-semibold text-secondary small">
Ім'я (логін)
</label> <div class="input-group shadow-inner rounded-3 overflow-hidden"> <span class="input-group-text bg-white border-end-0 text-muted">👤</span> <input type="text" name="username" id="username" class="form-control border-start-0 ps-0 py-2.5 custom-input" placeholder="Придумайте нікнейм" required autocomplete="username"> </div> </div> <div class="mb-4"> <label for="password" class="form-label fw-semibold text-secondary small">
Пароль
</label> <div class="input-group shadow-inner rounded-3 overflow-hidden"> <span class="input-group-text bg-white border-end-0 text-muted">🔑</span> <button type="button" id="togglePassword" class="input-group-text bg-white border-end-0 text-muted px-3" title="Показати/приховати пароль" style="cursor: pointer; border-right: 0;">
👁️
</button> <input type="password" name="password" id="password" class="form-control border-start-0 ps-2 py-2.5 custom-input" placeholder="Мінімум 6 символів" required autocomplete="new-password"> </div> </div> <button type="submit" class="btn btn-primary w-100 py-2.5 rounded-3 fw-bold shadow-sm transition-all mb-4">
Створити аккаунт →
</button> </form> <div class="position-relative my-4 text-center"> <hr class="text-muted opacity-25"> <span class="position-absolute top-50 start-50 translate-middle px-3 text-muted small">
або
</span> </div> <div class="text-center"> <a href="/login" class="text-decoration-none small fw-medium text-primary hover-underline">
Вже є аккаунт? Увійти
</a> </div> </div> </div> </div> </div> </div> ${renderScript($$result2, "C:/Users/jane/blog/src/pages/signup.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/jane/blog/src/pages/signup.astro", void 0);

const $$file = "C:/Users/jane/blog/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
