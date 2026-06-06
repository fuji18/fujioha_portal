import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://game.fujioha.com',
  output: 'static',
  trailingSlash: 'ignore',
  server: {
    host: true,
    port: 4323,
  },
});
