import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: {
    port: 5173,
    open: '/examples/index.html',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'G6Lite',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'umd'}.js`
    }
  },
  plugins: [dts()]
});
