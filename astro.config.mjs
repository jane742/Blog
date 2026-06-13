import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    // Явно вказуємо режим Serverless, щоб Astro знав, що треба генерувати саме Node.js entry.mjs
    mode: 'serverless', 
  }),
});