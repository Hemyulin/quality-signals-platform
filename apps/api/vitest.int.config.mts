import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,

    include: ['test/**/*.int.spec.ts'],
    exclude: ['dist/**'],

    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
