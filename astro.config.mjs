// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofabio.com',
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  security: {
    checkOrigin: false,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});