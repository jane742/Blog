import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  output: 'server', 
  adapter: vercel(),
  integrations: [db()],
});