import baseConfig from './vite.config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...baseConfig,
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['app/**/*.test.tsx'],
  },
});
