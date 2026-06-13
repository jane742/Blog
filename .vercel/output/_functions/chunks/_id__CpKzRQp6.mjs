import { c as createComponent } from './astro-component_D0R2L729.mjs';
import 'piccolore';
import { I as renderTemplate, _ as addAttribute, u as maybeRenderHead } from './sequence_5gyAyBy_.mjs';
import { r as renderComponent } from './entrypoint_CJ1E1AZm.mjs';
import { d as db, P as Post, a as PostTag, T as Tag } from './config_CudtQ6iI.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Layout } from './Layout_DFa18sRI.mjs';
import { v2 } from 'cloudinary';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  v2.config({
    cloud_name: "domivr406",
    api_key: "514654163743273",
    api_secret: "sdXdEfZjqqnTetuiR4wI2ttUVX0"
  });
  const { id } = Astro2.params;
  const { user } = Astro2.locals;
  if (!user || user.role !== "admin") return Astro2.redirect("/");
  const post = await db.select().from(Post).where(eq(Post.id, id ?? "")).get();
  const currentPostTags = await db.select({ tagId: PostTag.tagId }).from(PostTag).where(eq(PostTag.postId, id));
  const currentTagIds = currentPostTags.map((t) => t.tagId);
  if (!post) return Astro2.redirect("/admin/dashboard");
  const allTags = await db.select().from(Tag);
  if (Astro2.request.method === "POST") {
    if (!id) return new Response("ID не найден", { status: 400 });
    const formData = await Astro2.request.formData();
    const title = formData.get("title")?.toString();
    const body = formData.get("body")?.toString();
    const imageFile = formData.get("image");
    const imageUrlFromCloud = formData.get("imageUrlFromCloud");
    let finalImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
          v2.uploader.upload_stream(
            {
              folder: "astro_blog",
              transformation: [{ width: 1e3, crop: "limit" }]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (error) {
        console.error("Ошибка Cloudinary:", error);
      }
    } else if (imageUrlFromCloud && imageUrlFromCloud.trim().length > 0) {
      finalImageUrl = imageUrlFromCloud.trim();
    } else if (post?.image) {
      finalImageUrl = post.image;
    }
    if (title && body) {
      try {
        await db.update(Post).set({ title, body, image: finalImageUrl }).where(eq(Post.id, id ?? ""));
        const selectedTagIds = formData.getAll("tags").map((id2) => id2.toString().trim()).filter((id2) => id2 !== "on" && id2.length > 0);
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
        console.log("=== ДЕБАГ ТЕГОВ ===");
        console.log("Тип ID поста:", typeof id, "| Значение ID:", id);
        console.log("Массив selectedTagIds:", selectedTagIds);
        console.log("====================");
        await db.delete(PostTag).where(eq(PostTag.postId, id));
        try {
          for (const tagId of selectedTagIds) {
            console.log(`Попытка записать связь: postId=${id}, tagId=${tagId} (тип: ${typeof tagId})`);
            await db.insert(PostTag).values({
              postId: id,
              tagId
            });
          }
          console.log("🎉 Все теги успешно записаны в базу!");
        } catch (dbError) {
          console.error("❌ Ошибка внутри цикла записи в PostTag:", dbError);
        }
        return Astro2.redirect("/admin/dashboard");
      } catch (e) {
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="container my-1"> <nav aria-label="breadcrumb" class="mb-4"> <ol class="breadcrumb"> <li class="breadcrumb-item"><a href="/admin/dashboard" class="text-decoration-none">Панель управління</a></li> <li class="breadcrumb-item active" aria-current="page"> ', ' </li> </ol> </nav> <form method="POST" class="needs-validation" enctype="multipart/form-data"> <div class="row g-4"> <div class="col-lg-8"> <div class="card shadow-sm border-0 p-1 mb-4"> <div class="mb-4"> <label for="post-title" class="form-label text-muted small text-uppercase fw-semibold">Заголовок</label> <input type="text" name="title" id="post-title" class="form-control form-control-lg border-0 border-bottom rounded-0 px-0" style="font-size: 2rem; field-sizing: content; min-width: 100%;" placeholder="Введіть заголовок..."', ' required> </div> <div class="mb-3"> <label for="markdown-editor" class="form-label text-muted small text-uppercase fw-semibold">Текст в форматі Markdown</label> <textarea id="markdown-editor" name="body" class="form-control">', '</textarea> </div> </div> </div> <div class="col-lg-4"> <div class="card shadow-sm border-0 p-4 mb-1 bg-light"> <div class="d-grid gap-2 mr-2"> <button type="submit" class="btn btn-primary btn-lg shadow-sm"> ', ' </button> <a href="/admin" class="btn btn-outline-secondary">Відміна</a> </div> </div> <div class="card shadow-sm border-0 p-4 mb-4"> <h5 class="card-title h6 text-uppercase fw-bold text-muted mb-3">Зображення посту</h5> ', ` <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-light rounded mb-3" id="imageMethodTab" role="tablist"> <li class="nav-item" role="presentation"> <button class="nav-link active rounded shadow-sm-custom" id="btn-local" role="tab" type="button">
📁 З комп'ютера
</button> </li> <li class="nav-item" role="presentation"> <button class="nav-link rounded" id="btn-cloud" data-bs-toggle="tab" data-bs-target="#cloud-pane" type="button" role="tab">
☁️ З хмари (посилання)
</button> </li> </ul> <div class="tab-content"> <div class="tab-pane fade show active" id="pane-local"> <div class="mb-2"> <label for="image-upload" class="form-label small text-secondary">Виберіть файл на ПК:</label> <input type="file" name="image" id="image-upload" class="form-control form-control-sm" accept="image/*"> </div> </div> <div class="tab-pane fade d-none" id="pane-cloud"> <div class="mb-2"> <label for="image-url" class="form-label small text-secondary">Вставте URL зображення:</label> <input type="url" name="imageUrlFromCloud" id="image-url" class="form-control form-control-sm" placeholder="https://res.cloudinary.com/..."`, '> </div> </div> </div> </div> <div class="card shadow-sm border-0 p-0 mb-1"> <h5 class="card-title h6 text-uppercase fw-bold text-muted mb-3">Теги</h5> <label class="form-label small text-secondary mb-2">Виберіть з існуючих:</label> <div class="mb-4 tag-checkbox-list p-3 border rounded bg-dark" style="max-height: 160px; overflow-y: auto;"> ', ` </div> <div class="mb-2"> <label for="newTags" class="form-label small text-secondary">Додати нові (через кому):</label> <input type="text" name="newTags" id="newTags" class="form-control form-control-sm" placeholder="наприклад: astro, life, css"> </div> </div> </div> </div> </form> </div> <script>
  document.addEventListener('DOMContentLoaded', () => {
    const btnLocal = document.getElementById('btn-local');
    const btnCloud = document.getElementById('btn-cloud');
    const paneLocal = document.getElementById('pane-local');
    const paneCloud = document.getElementById('pane-cloud');

    if (btnLocal && btnCloud) {
      // Клик по кнопке "С компьютера"
      btnLocal.addEventListener('click', () => {
        btnLocal.classList.add('active');
        btnCloud.classList.remove('active');
        
        // Показываем локальную панель (включаем видимость и прозрачность)
        paneLocal.classList.add('show', 'active');
        paneLocal.classList.remove('d-none');
        
        // Полностью прячем облачную панель
        paneCloud.classList.remove('show', 'active');
        paneCloud.classList.add('d-none');
      });

      // Клик по кнопке "Из облака"
      btnCloud.addEventListener('click', () => {
        btnCloud.classList.add('active');
        btnLocal.classList.remove('active');
        
        // Показываем облачную панель
        paneCloud.classList.add('show', 'active');
        paneCloud.classList.remove('d-none');
        
        // Полностью прячем локальную панель
        paneLocal.classList.remove('show', 'active');
        paneLocal.classList.add('d-none');
      });
    }
  });
</script> <script>
  // Ждем, пока загрузится страница, и инициализируем EasyMDE
  document.addEventListener('DOMContentLoaded', () => {
    const easyMDE = new EasyMDE({
      element: document.getElementById('markdown-editor'),
      spellChecker: false, // Отключаем встроенную английскую проверку орфографии
      autosave: {
        enabled: true,
        uniqueId: "astro-blog-editor", // Защита: если страница случайно обновится, текст не пропадет
        delay: 1000,
      },
      placeholder: "Начните писать вашу потрясающую статью здесь...",
      renderingConfig: {
        singleLineBreaks: false, // Чтобы перенос строки работал как в стандартном Markdown
      },
      // Настраиваем панель инструментов (можно убрать лишнее)
      toolbar: [
        "bold", "italic", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|", 
        "link", "image", "|", 
        "preview", "side-by-side", "fullscreen", "|", 
        "guide"
      ],
    });
  });
</script> `])), maybeRenderHead(), post ? "📝 Редагувати пост" : "✨ Створити новий пост", addAttribute(post?.title || "", "value"), post?.body || "", post ? "💾 Зберегти зміни" : "🚀 Опублікувати пост", post?.image && renderTemplate`<div class="mb-3 text-center border rounded p-2 bg-light"> <img${addAttribute(post.image, "src")} alt="Превью" class="img-thumbnail" style="max-height: 120px;"> <div class="form-text mt-1 text-muted small">Поточне зображення</div> </div>`, addAttribute(post?.image && !post.image.startsWith("blob:") ? post.image : "", "value"), allTags.map((tag) => renderTemplate`<div class="form-check mb-2"> <input class="form-check-input" type="checkbox" name="tags"${addAttribute(tag.id, "value")}${addAttribute(`tag-${tag.id}`, "id")}${addAttribute(currentTagIds?.includes(tag.id), "checked")}> <label class="form-check-label px-1 py-0.5 rounded bg-white border border-secondary-subtle small text-dark"${addAttribute(`tag-${tag.id}`, "for")}>
#${tag.name} </label> </div>`)) })}`;
}, "C:/Users/jane/blog/src/pages/admin/edit/[id].astro", void 0);
const $$file = "C:/Users/jane/blog/src/pages/admin/edit/[id].astro";
const $$url = "/admin/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
