import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, g as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_rOUT-VGP.mjs';
import 'piccolore';
import { d as db, T as Tag, P as Post, a as PostTag } from '../../chunks/config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Layout } from '../../chunks/Layout_kW219FBg.mjs';
import { v2 } from 'cloudinary';
import slugify from 'slugify';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Create;
  v2.config({
    cloud_name: "domivr406",
    api_key: "514654163743273",
    api_secret: "sdXdEfZjqqnTetuiR4wI2ttUVX0"
  });
  const { id } = Astro2.params;
  const { user } = Astro2.locals;
  if (!user || user.role !== "admin") return Astro2.redirect("/");
  const currentTagIds = [];
  const allTags = await db.select().from(Tag);
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const title = formData.get("title")?.toString();
    const body = formData.get("body")?.toString();
    const imageFile = formData.get("image");
    const imageUrlFromCloud = formData.get("imageUrlFromCloud");
    let finalImageUrl = "";
    if (title && body) {
      const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        locale: "ru"
      });
      const uniqueSuffix = Math.random().toString(36).substring(2, 6);
      const finalSlug = `${baseSlug}-${uniqueSuffix}`;
      if (imageFile && imageFile.size > 0) {
        try {
          const arrayBuffer = await imageFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const uploadResult = await new Promise((resolve, reject) => {
            v2.uploader.upload_stream({ folder: "blog-uploads" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }).end(buffer);
          });
          finalImageUrl = uploadResult.secure_url;
        } catch (error) {
          console.error("Ошибка Cloudinary:", error);
        }
      } else if (imageUrlFromCloud && imageUrlFromCloud.trim().length > 0) {
        finalImageUrl = imageUrlFromCloud.trim();
      }
      try {
        const newPostId = crypto.randomUUID();
        await db.insert(Post).values({
          id: newPostId,
          title,
          body,
          slug: finalSlug,
          image: finalImageUrl || null,
          authorId: user.id,
          publishedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        const selectedTagIds = formData.getAll("tags").map((tagId) => tagId.toString().trim()).filter((tagId) => tagId !== "on" && tagId.length > 0);
        const newTagsString = formData.get("newTags");
        if (newTagsString) {
          const newTagNames = newTagsString.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0);
          for (const tagName of newTagNames) {
            const generatedTagId = `tag_${tagName}`;
            let existingTag = await db.select().from(Tag).where(eq(Tag.id, generatedTagId)).get();
            if (!existingTag) {
              await db.insert(Tag).values({
                id: generatedTagId,
                name: tagName
              });
            }
            if (!selectedTagIds.includes(generatedTagId)) {
              selectedTagIds.push(generatedTagId);
            }
          }
        }
        for (const tagId of selectedTagIds) {
          await db.insert(PostTag).values({
            postId: newPostId,
            // ИСПРАВЛЕНО: используем актуальный ID созданного поста
            tagId
          });
        }
        return Astro2.redirect("/admin/dashboard");
      } catch (e) {
        console.error(e);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="container my-1"> <nav aria-label="breadcrumb" class="mb-4"> <ol class="breadcrumb"> <li class="breadcrumb-item"> <a href="/admin/dashboard" class="text-decoration-none">Панель управління</a> </li> <li class="breadcrumb-item active" aria-current="page"> ', ' </li> </ol> </nav> <form method="POST" class="needs-validation" enctype="multipart/form-data"> <div class="row g-4"> <div class="col-lg-8"> <div class="card shadow-sm border-0 p-1 mb-4"> <div class="mb-4"> <label for="post-title" class="form-label text-muted small text-uppercase fw-semibold">Заголовок</label> <input type="text" name="title" id="post-title" class="form-control form-control-lg border-0 border-bottom rounded-0 px-0" style=" field-sizing: content; min-width: 100%;" placeholder="Введіть заголовок..."', ' required> </div> <div class="mb-3"> <label for="markdown-editor" class="form-label text-muted small text-uppercase fw-semibold">Текст в форматі Markdown</label> <textarea id="markdown-editor" name="body" class="form-control"></textarea> </div> </div> </div> <div class="col-lg-4"> <div class="card shadow-sm border-0 p-4 mb-1 bg-light"> <div class="d-grid gap-2 mr-2"> <button type="submit" class="btn btn-primary btn-lg shadow-sm"> ', ` </button> <a href="/admin" class="btn btn-outline-secondary">Відміна</a> </div> </div> <div class="card shadow-sm border-0 p-4 mb-4"> <h5 class="card-title h6 text-uppercase fw-bold text-muted mb-3">
Зображення посту
</h5> <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-light rounded mb-3" id="imageMethodTab" role="tablist"> <li class="nav-item" role="presentation"> <button class="nav-link active rounded shadow-sm-custom" id="btn-local" role="tab" type="button">
📁 З комп'ютера
</button> </li> <li class="nav-item" role="presentation"> <button class="nav-link rounded" id="btn-cloud" data-bs-toggle="tab" data-bs-target="#cloud-pane" role="tab" type="button">
☁️ З хмари (посилання)
</button> </li> </ul> <div class="tab-content"> <div class="tab-pane fade show active" id="pane-local"> <div class="mb-2"> <label for="image-upload" class="form-label small text-secondary">Виберіть файл на ПК:</label> <input type="file" name="image" id="image-upload" class="form-control form-control-sm" accept="image/*"> </div> </div> <div class="tab-pane fade d-none" id="pane-cloud"> <div class="mb-2"> <label for="image-url" class="form-label small text-secondary">Вставте URL зображення:</label> <input type="url" name="imageUrlFromCloud" id="image-url" class="form-control form-control-sm" placeholder="https://res.cloudinary.com/..."> </div> </div> </div> </div> <div class="card shadow-sm border-0 p-0 mb-1"> <h5 class="card-title h6 text-uppercase fw-bold text-muted mb-3">
Теги
</h5> <label class="form-label small text-secondary mb-2">Виберіть з існуючих:</label> <div class="mb-4 tag-checkbox-list p-3 border rounded bg-dark" style="max-height: 160px; overflow-y: auto;"> `, ' </div> <div class="mb-2"> <label for="newTags" class="form-label small text-secondary">Додати нові (через кому):</label> <input type="text" name="newTags" id="newTags" class="form-control form-control-sm" placeholder="наприклад: astro, life, css"> </div> </div> </div> </div> </form> </div> <script>\n    document.addEventListener("DOMContentLoaded", () => {\n      const btnLocal = document.getElementById("btn-local");\n      const btnCloud = document.getElementById("btn-cloud");\n      const paneLocal = document.getElementById("pane-local");\n      const paneCloud = document.getElementById("pane-cloud");\n\n      if (btnLocal && btnCloud) {\n        // Клик по кнопке "С компьютера"\n        btnLocal.addEventListener("click", () => {\n          btnLocal.classList.add("active");\n          btnCloud.classList.remove("active");\n\n          // Показываем локальную панель (включаем видимость и прозрачность)\n          paneLocal.classList.add("show", "active");\n          paneLocal.classList.remove("d-none");\n\n          // Полностью прячем облачную панель\n          paneCloud.classList.remove("show", "active");\n          paneCloud.classList.add("d-none");\n        });\n\n        // Клик по кнопке "Из облака"\n        btnCloud.addEventListener("click", () => {\n          btnCloud.classList.add("active");\n          btnLocal.classList.remove("active");\n\n          // Показываем облачную панель\n          paneCloud.classList.add("show", "active");\n          paneCloud.classList.remove("d-none");\n\n          // Полностью прячем локальную панель\n          paneLocal.classList.remove("show", "active");\n          paneLocal.classList.add("d-none");\n        });\n      }\n    });\n  </script> <script>\n    // Ждем, пока загрузится страница, и инициализируем EasyMDE\n    document.addEventListener("DOMContentLoaded", () => {\n      const easyMDE = new EasyMDE({\n        element: document.getElementById("markdown-editor"),\n        spellChecker: false, // Отключаем встроенную английскую проверку орфографии\n        autosave: {\n          enabled: true,\n          uniqueId: "astro-blog-editor", // Защита: если страница случайно обновится, текст не пропадет\n          delay: 1000,\n        },\n        placeholder: "Почніть писати свою статтю тут...",\n        renderingConfig: {\n          singleLineBreaks: false, // Чтобы перенос строки работал как в стандартном Markdown\n        },\n        // Настраиваем панель инструментов (можно убрать лишнее)\n        toolbar: [\n          "bold",\n          "italic",\n          "heading",\n          "|",\n          "quote",\n          "unordered-list",\n          "ordered-list",\n          "|",\n          "link",\n          "image",\n          "|",\n          "preview",\n          "side-by-side",\n          "fullscreen",\n          "|",\n          "guide",\n        ],\n      });\n    });\n  </script> '])), maybeRenderHead(), "✨ Створити новий пост", addAttribute("", "value"), "🚀 Опублікувати пост", allTags.map((tag) => renderTemplate`<div class="form-check mb-2"> <input class="form-check-input" type="checkbox" name="tags"${addAttribute(tag.id, "value")}${addAttribute(`tag-${tag.id}`, "id")}${addAttribute(currentTagIds?.includes(tag.id), "checked")}> <label class="form-check-label px-1 py-0.5 rounded bg-white border border-secondary-subtle small text-dark"${addAttribute(`tag-${tag.id}`, "for")}>
#${tag.name} </label> </div>`)) })}`;
}, "C:/Users/jane/blog/src/pages/admin/create.astro", void 0);
const $$file = "C:/Users/jane/blog/src/pages/admin/create.astro";
const $$url = "/admin/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Create,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
