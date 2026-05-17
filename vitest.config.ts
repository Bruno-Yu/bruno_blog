import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**', 'src/theme/**'],
      exclude: ['src/**/*.test.tsx'],
    },
  },
  resolve: {
    alias: {
      '@docusaurus/Link': '/Users/brunoyu/Desktop/bruno_blog/src/__mocks__/@docusaurus/Link.tsx',
      '@theme-original/TOC': '/Users/brunoyu/Desktop/bruno_blog/src/__mocks__/@theme-original/TOC.tsx',
      '@docusaurus/types': '/Users/brunoyu/Desktop/bruno_blog/src/__mocks__/@docusaurus/types.ts',
    },
  },
});
