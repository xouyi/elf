import { defineConfig } from '@playwright/test'

// Visual regression: every example is opened in isolation on the built docs site (/__examples/<dir>/<example>)
// and compared with the committed baselines. Baselines are generated ONLY inside the official Playwright Docker
// image (see .github/workflows/visual-baselines.yml); the snapshot path therefore has no platform suffix.
// Override the port with VISUAL_PORT when another server already uses 4173.
const port = Number(process.env.VISUAL_PORT ?? 4173)

export default defineConfig({
  testDir: 'tests/visual',
  snapshotPathTemplate: 'tests/visual/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  expect: { toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0 } },
  use: { baseURL: `http://127.0.0.1:${port}/elfUI/`, colorScheme: 'dark', reducedMotion: 'reduce', locale: 'en-US', timezoneId: 'UTC' },
  webServer: {
    command: `bun scripts/serve-static.ts apps/docs/.output/public ${port} /elfUI/`,
    url: `http://127.0.0.1:${port}/elfUI/`,
    reuseExistingServer: !process.env.CI,
  },
})
