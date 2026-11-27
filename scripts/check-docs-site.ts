/**
 * Browser check of the built docs site (`bun run docs:build` first): serves apps/docs/.output/public under /elfUI/ like GitHub
 * Pages, opens every prerendered docs page in headless Chromium and asserts that
 *   - every multi-line code block renders its lines stacked vertically (never as one long line),
 *   - no unreplaced `{{placeholder}}` survives in the visible text.
 * Run by `bun run docs:verify` (part of `bun run check`).
 */
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { chromium } from 'playwright'
import { placeholderNames } from '../apps/docs/lib/site'

const out = join(import.meta.dirname, '..', 'apps/docs/.output/public')
const port = 4399
const base = '/elfUI/'

function pages(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (name === '__examples' || name === '_nuxt' || name === '__nuxt_content') continue
    if (statSync(full).isDirectory()) pages(full, acc)
    else if (name === 'index.html') acc.push(`/${relative(out, dir)}`.replace(/\/\.$/, '/'))
  }
  return acc
}
const routes = pages(out).filter(r => r === '/' || r.startsWith('/docs'))

const server = Bun.spawn(['bun', join(import.meta.dirname, 'serve-static.ts'), 'apps/docs/.output/public', String(port), base], { stdout: 'ignore', stderr: 'ignore' })
const browser = await chromium.launch()
const failures: string[] = []
let blocks = 0
try {
  for (let i = 0; i < 50; i++) {
    if (await fetch(`http://127.0.0.1:${port}${base}`).then(r => r.ok).catch(() => false)) break
    await Bun.sleep(100)
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const leftover = new RegExp(`\\{\\{(${placeholderNames.join('|')})\\}\\}`)
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:${port}${base}${route.replace(/^\//, '')}`, { waitUntil: 'networkidle' })
    // Reveal the code tabs of component previews (they are force-mounted but hidden).
    const codeTabs = page.getByRole('tab', { name: 'Code', exact: true })
    for (let i = 0, n = await codeTabs.count(); i < n; i++) await codeTabs.nth(i).click({ timeout: 2000 }).catch(() => {})
    const result = await page.evaluate(() => {
      const bad: string[] = []
      let count = 0
      document.querySelectorAll('pre').forEach((pre) => {
        const lines = [...pre.querySelectorAll<HTMLElement>('.line')].filter(l => (l.textContent ?? '').trim() !== '')
        if (lines.length < 2 || !pre.getClientRects().length) return
        count++
        const tops = lines.map(l => Math.round(l.getBoundingClientRect().top))
        const lefts = lines.map(l => Math.round(l.getBoundingClientRect().left))
        // Every non-empty line must start below the previous one, at the same left edge.
        if (new Set(lefts).size !== 1 || tops.some((t, i) => i > 0 && t <= tops[i - 1]!)) bad.push((pre.textContent ?? '').slice(0, 60).replace(/\n/g, '\\n'))
      })
      return { bad, count, text: document.querySelector('main')?.textContent ?? '' }
    })
    blocks += result.count
    for (const b of result.bad) failures.push(`${route}: code block renders on one line: ${b}`)
    // The Contributing page documents the placeholders and shows them verbatim.
    if (route !== '/docs/resources/contributing' && leftover.test(result.text)) failures.push(`${route}: unreplaced placeholder in page text`)
  }
}
finally {
  await browser.close()
  server.kill()
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`docs verify: ${routes.length} pages, ${blocks} multi-line code blocks render line by line`)
