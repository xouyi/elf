import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

interface IndexEntry { id: string, type: string, tags?: string[] }

// Built by `bun run build-storybook`; every non-docs story is captured.
const index = JSON.parse(readFileSync(join(import.meta.dirname, '../../storybook-static/index.json'), 'utf8')) as { entries: Record<string, IndexEntry> }
const stories = Object.values(index.entries).filter(e => e.type === 'story' && !e.tags?.includes('skip-visual'))

const themes = ['elf', 'novatron'] as const
const viewports = [
  { name: 'desktop', width: 1280, height: 800, all: true },
  // Narrow viewport is captured only for the default story of each component.
  { name: 'mobile', width: 360, height: 800, all: false },
]

for (const story of stories) {
  for (const theme of themes) {
    for (const vp of viewports) {
      if (!vp.all && !story.id.endsWith('--default')) continue
      test(`${story.id} [${theme}, ${vp.name}]`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`)
        // Storybook sets this class once the story has rendered (portal-based stories leave #storybook-root empty).
        await page.locator('body.sb-show-main').waitFor({ state: 'attached' })
        await expect(page.locator('body.sb-show-errordisplay')).toHaveCount(0)
        await page.evaluate(() => document.fonts.ready)
        await expect(page).toHaveScreenshot(`${story.id}-${theme}-${vp.name}.png`)
      })
    }
  }
}
