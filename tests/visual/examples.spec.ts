import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

// Every src/components/<dir>/examples/<File>.vue, in both themes, at desktop (1280) and mobile (360) width.
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

const viewports = [{ label: '1280', width: 1280, height: 800 }, { label: '360', width: 360, height: 740 }]

for (const theme of ['elf', 'novatron'] as const) {
  for (const vp of viewports) {
    test.describe(`${theme} @ ${vp.label}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } })

      for (const ex of examples) {
        test(`${ex.dir}/${ex.name}`, async ({ page }) => {
          const errors: string[] = []
          page.on('pageerror', e => errors.push(e.message))
          await page.goto(`__examples/${ex.dir}/${ex.name}?theme=${theme}`)
          await page.locator('html[data-ready="true"]').waitFor({ state: 'attached' })
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

          // Overlay examples (Dialog) show their trigger first; open it so the portalled content is captured.
          const trigger = page.locator('#example-frame [aria-haspopup="dialog"]')
          const overlay = (await trigger.count()) > 0
          if (overlay) {
            await trigger.click()
            await page.locator('[role="dialog"], [role="alertdialog"]').first().waitFor()
          }
          // Let focus and layout settle after the optional open.
          await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))

          // Layout sanity runs everywhere, even before baselines exist: nothing may overflow the viewport horizontally.
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
          expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0)
          expect(errors).toEqual([])

          const shot = [ex.dir, `${ex.name}-${theme}-${vp.label}.png`]
          if (overlay) await expect(page).toHaveScreenshot(shot)
          else await expect(page.locator('#example-frame')).toHaveScreenshot(shot)
        })
      }
    })
  }
}
