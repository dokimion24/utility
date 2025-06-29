import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'public',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        file: path.resolve(__dirname, 'apps/file/app/index.tsx'),
        chat: path.resolve(__dirname, 'apps/chat/app/index.tsx'),
      },
      output: {
        entryFileNames: '[name]/index.js',
        assetFileNames: '[name]/assets/[name][extname]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps'),
    },
  },
});
