import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  integrations: [db()],
  vite: {
    // Повністю виключаємо astro та його інтеграції з оптимізації Vite CommonJS
    ssr: {
      noExternal: [],
      external: ['astro', '@astrojs/db']
    },
    optimizeDeps: {
      exclude: ['astro', '@astrojs/db']
    }
  }
});