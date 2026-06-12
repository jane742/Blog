import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  integrations: [db()],
  vite: {
    // Цей блок виправляє баг сумісності екосистеми Astro 5 з сервером Vercel
    ssr: {
      external: ['astro']
    },
    resolve: {
      alias: {
        'astro/app/entrypoint': 'astro/dist/app/entrypoint.js'
      }
    }
  }
});