// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel({
    // Явно вказуємо режим роботи, це змушує адаптер використовувати правильні entrypoints
    isr: false, 
  }),
  integrations: [db()],
});