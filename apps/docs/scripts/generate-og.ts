/**
 * Renders public/og.png (1200x630) with Playwright Chromium. Not part of the build: run it manually
 * (`bun apps/docs/scripts/generate-og.ts`) when the tagline or brand changes, and commit the PNG.
 */
import { join } from 'node:path'
import { chromium } from 'playwright'

const html = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#0f0d14;color:#f4f2f8;font-family:system-ui,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;position:relative;overflow:hidden">
<div style="position:absolute;right:-120px;top:-140px;width:520px;height:520px;background:radial-gradient(circle,#a78bfa55,transparent 70%)"></div>
<div style="display:flex;align-items:center;gap:20px">
  <svg width="84" height="84" viewBox="0 0 24 24" fill="none"><path d="M12 2 21 7v10l-9 5-9-5V7z" fill="#a78bfa"/><path d="M9 8h6M9 12h5M9 16h6" stroke="#0f0d14" stroke-width="1.8" stroke-linecap="square"/></svg>
  <span style="font-size:76px;font-weight:700;letter-spacing:-2px">ElfUI</span>
</div>
<p style="font-size:46px;line-height:1.2;margin:44px 0 0;max-width:900px;font-weight:600">A themeable design system for Vue 3 and Nuxt 4.</p>
<p style="font-size:28px;margin:28px 0 0;color:#b9b3c9">Reka UI primitives, Tailwind CSS v4, three themes, shadcn-vue registry and llms.txt.</p>
<div style="position:absolute;left:90px;bottom:56px;display:flex;gap:14px;font-size:22px;color:#b9b3c9"><span style="display:inline-block;width:18px;height:18px;background:#a78bfa;border-radius:50%"></span>elf<span style="display:inline-block;width:18px;height:18px;background:#ffcc00;margin-left:18px"></span>nova</div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: join(import.meta.dirname, '..', 'public', 'og.png') })
await browser.close()
console.log('wrote apps/docs/public/og.png')
