/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            // alternate theme
            theme: 'ayu-dark'
          },
          highlighter: {
            // add more languages
            langs: ['ts', 'js', 'yaml', 'bash', 'md', 'ansi', 'c', 'cpp', 'css', 'docker', 'go', 'html', 'java', 'json', 'jsx', 'kotlin', 'markdown', 'php', 'python', 'rust', 'scss', 'sql', 'tsx', 'jsx', 'typescript', 'vue', 'yaml', 'xml', 'lua'],
          },
        },
      },
      prerender: {
        routes: ['/blog'],
      },
      ssr: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
