import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel'; // ВИПРАВЛЕНО 🟢

export default defineConfig({
  output: 'server', // або 'hybrid', залежно від твого проєкту
  adapter: vercel({
    // Це змусить старіший адаптер створювати правильну структуру для сучасного Vercel
    edgeMiddleware: false, 
  }),
});