import { defineConfig } from '@playwright/test'

// Placeholder: the browser and visual test harness is rebuilt on top of the docs site
// (apps/docs/.output/public served under /elfUI/). No Playwright tests exist yet.
const port = 4173

export default defineConfig({
  testDir: 'tests/visual',
  use: { baseURL: `http://127.0.0.1:${port}/elfUI/`, colorScheme: 'dark' },
  webServer: {
    command: `bun scripts/serve-static.ts apps/docs/.output/public ${port} /elfUI/`,
    url: `http://127.0.0.1:${port}/elfUI/`,
    reuseExistingServer: !process.env.CI,
  },
})
