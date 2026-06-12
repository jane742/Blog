import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  integrations: [db()],
  vite: {
    ssr: {
      // Цей рядок каже Vite: "Обробляй пакети astro та db як чисті ES-модулі, 
      // не намагайся конвертувати їх у CommonJS"
      noExternal: ['astro', '@astrojs/db'],
    }
  }
});