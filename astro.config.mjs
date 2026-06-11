// @ts-check

import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // или vercel, netlify и т.д.
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', // Middleware работает только в SSR режиме
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [db()],
});