import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  integrations: [db()],
vite: {
    resolve: {
      alias: {
        'astro/app/entrypoint': 'astro/dist/core/app/index.js' // Новий шлях в Astro 5
      }
    }
  }
});