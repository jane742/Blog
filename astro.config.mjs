// @ts-check

import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', // Middleware работает только в SSR режиме
adapter: vercel(),
  integrations: [db()],

});