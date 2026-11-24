import { defineConfig } from '@playwright/test'

const port = 6007

export default defineConfig({
  testDir: 'tests/visual',
  // One baseline per story, theme and viewport; no platform suffix because baselines are only
  // generated and compared inside the pinned Playwright Docker image (see CONTRIBUTING.md).
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  expect: { toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.001 } },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    colorScheme: 'dark',
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
    launchOptions: { args: ['--font-render-hinting=none', '--disable-lcd-text'] },
  },
  webServer: {
    command: `bun scripts/serve-static.ts storybook-static ${port}`,
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: !process.env.CI,
  },
})
