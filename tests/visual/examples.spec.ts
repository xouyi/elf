import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { visualThemes, visualViewports } from './settings'

// Every src/components/<dir>/examples/<File>.vue, in the themes and widths of ./settings.ts (default: elf at 1280 and 360).
// The page /__examples/<dir>/<example> (apps/docs) renders one example in isolation and sets <html data-ready>.
const componentsDir = join(import.meta.dirname, '../../src/components')
const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const examples = readdirSync(componentsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name))
  .flatMap((d) => {
    try {
      return readdirSync(join(componentsDir, d.name, 'examples'))
        .filter(f => f.endsWith('.vue'))
        .sort()
        .map(f => ({ dir: d.name, name: kebab(f.replace('.vue', '')) }))
    }
    catch { return [] }
  })

for (const theme of visualThemes) {
  for (const vp of visualViewports) {
    test.describe(`${theme} @ ${vp.label}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } })

      for (const ex of examples) {
        test(`${ex.dir}/${ex.name}`, async ({ page }) => {
          const errors: string[] = []
          page.on('pageerror', e => errors.push(e.message))
          await page.goto(`__examples/${ex.dir}/${ex.name}?theme=${theme}`)
          await page.locator('html[data-ready="true"]').waitFor({ state: 'attached' })
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

          // Overlay examples (Dialog, Sheet, Popover) show their trigger first; open the first one so the portalled content is captured.
          const trigger = page.locator('#example-frame [aria-haspopup="dialog"]').first()
          const overlay = (await trigger.count()) > 0
          if (overlay) {
            await trigger.click()
            await page.locator('[role="dialog"], [role="alertdialog"]').first().waitFor()
          }
          // Navigation menus open their first flyout; it hangs below the example frame, so the whole page is captured.
          const navTrigger = page.locator('#example-frame [data-slot="navigation-menu-trigger"]').first()
          const flyout = (await navTrigger.count()) > 0
          if (flyout) {
            await navTrigger.click()
            await page.locator('[data-slot="navigation-menu-content"]').first().waitFor()
            await page.waitForTimeout(400)
          }
          // Let focus and layout settle after the optional open.
          await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))

          // Layout sanity runs everywhere, even before baselines exist: nothing may overflow the viewport horizontally.
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
          expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0)
          expect(errors).toEqual([])

          const shot = [ex.dir, `${ex.name}-${theme}-${vp.label}.png`]
          if (overlay || flyout) await expect(page).toHaveScreenshot(shot)
          else await expect(page.locator('#example-frame')).toHaveScreenshot(shot)
        })
      }
    })
  }
}
