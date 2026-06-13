import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_D61pzee8.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_DFa18sRI.mjs';
import { l as lucia } from './auth_BNOajhtQ.mjs';
import { generateIdFromEntropySize } from 'lucia';
import { Scrypt } from 'oslo/password';
import { d as db, U as User } from './config_CudtQ6iI.mjs';

const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Signup;
  const scrypt = new Scrypt();
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (typeof username !== "string" || username.length < 3) {
      errorMessage = "Ім'я користувача надто коротке";
    } else if (typeof password !== "string" || password.length < 6) {
      errorMessage = "Пароль повинен бути не менше 6 символів";
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
        errorMessage = "Це ім'я вже зайняте";
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
