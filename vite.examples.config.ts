import { defineConfig } from 'vite';

export default defineConfig({
  root: './examples',
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
