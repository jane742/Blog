import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  vite: {
    resolve: {
      // Якщо хтось (Lucia) шукає astro:db, ми підсовуємо йому пусту заглушку
      alias: {
        'astro:db': 'astro/runtime/server/index.js' 
      }
    }
  }
});