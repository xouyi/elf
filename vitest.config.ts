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
        // The elfui CLI: pure logic plus an end-to-end run of the built binary against temp projects. No browser, no network.
        test: { name: 'cli', environment: 'node', include: ['cli/**/*.test.ts'], testTimeout: 60_000 },
      },
      {
        // Docs site sources: the single source for name/version/URLs and the no-hard-coded-values check.
        test: { name: 'docs', environment: 'node', include: ['tests/docs/**/*.test.ts'] },
      },
      {
        // Real Chromium: every example in both themes (axe) plus keyboard/focus behavior. Needs `bunx playwright install chromium`.
        extends: true,
        plugins: [vue(), tailwindcss()],
        resolve: { alias: [{ find: /^@xouyi\/elfui$/, replacement: entry }] },
        test: {
          name: 'browser',
          include: ['tests/browser/**/*.test.ts'],
          setupFiles: ['tests/browser/setup.ts'],
          // One file at a time. Parallel files run in sibling iframes of ONE page that shares a single real mouse, keyboard
          // focus and compositor: a hover or click in one file moved the pointer under another file's example, and a
          // background iframe is throttled (the "iframe not ready" / dropped connection failures under load).
          fileParallelism: false,
          // Polled conditions (a menu opening, a hover card after its delay) get room on a loaded machine; they still return the moment they hold.
          expect: { poll: { timeout: 8000 } },
          browser: {
            enabled: true,
            connectTimeout: 180_000,
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
