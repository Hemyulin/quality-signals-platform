import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: { transform: { legacyDecorator: true, decoratorMetadata: true } },
    }),
  ],
  test: {
    environment: 'node',
    globals: true,

    include: ['test/**/*.int.spec.ts'],
    exclude: ['dist/**'],

    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
