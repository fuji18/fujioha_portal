import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hokkaido.fujioha.com',
  output: 'static',
  trailingSlash: 'ignore',
  server: {
    host: true,
    port: 4322,
  },
});
