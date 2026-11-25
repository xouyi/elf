import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const entry = fileURLToPath(new URL('./src/index.ts', import.meta.url))

export default defineConfig({
  test: {
    projects: [
      {
        // Pure logic, variants and emitted events in happy-dom: fast, no browser.
        extends: true,
        plugins: [vue()],
        test: { name: 'unit', environment: 'happy-dom', include: ['src/**/*.test.ts'] },
      },
      {
        // Real Chromium: every example in both themes (axe) plus keyboard/focus behavior. Needs `bunx playwright install chromium`.
        extends: true,
        plugins: [vue(), tailwindcss()],
        resolve: { alias: [{ find: /^@elf\/ui$/, replacement: entry }] },
        test: {
          name: 'browser',
          include: ['tests/browser/**/*.test.ts'],
          setupFiles: ['tests/browser/setup.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            viewport: { width: 1280, height: 800 },
          },
        },
      },
    ],
  },
})
