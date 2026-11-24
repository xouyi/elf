/**
 * Verifies WCAG contrast for every theme in src/themes/*.css.
 * Text pairs need 4.5:1 (AA); UI component boundaries (input, ring) need 3:1.
 * Usage: bun scripts/contrast.ts [--json]
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

type RGB = [number, number, number]

const themesDir = join(import.meta.dirname, '..', 'src', 'themes')

function parseColor(value: string): RGB {
  const v = value.trim()
  const hex = v.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = Number.parseInt(hex[1]!, 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(c => c / 255) as RGB
  }
  const ok = v.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/)
  if (ok) return oklchToSrgb(Number(ok[1]), Number(ok[2]), Number(ok[3]))
  throw new Error(`Unsupported color: ${value}`)
}

function oklchToSrgb(L: number, C: number, hDeg: number): RGB {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const lin: RGB = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
  const enc = (x: number) => {
    const c = Math.min(1, Math.max(0, x))
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
  }
  return lin.map(enc) as RGB
}

function luminance([r, g, b]: RGB) {
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function ratio(a: RGB, b: RGB) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

const toHex = (c: RGB) => `#${c.map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')}`

const textPairs: Array<[string, string]> = [
  ['foreground', 'background'],
  ['card-foreground', 'card'],
  ['popover-foreground', 'popover'],
  ['primary-foreground', 'primary'],
  ['secondary-foreground', 'secondary'],
  ['muted-foreground', 'muted'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['accent-foreground', 'accent'],
  ['destructive-foreground', 'destructive'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['primary', 'background'], // primary used as text (link variant)
]
const uiPairs: Array<[string, string]> = [
  ['input', 'background'],
  ['ring', 'background'],
]

let failed = 0
const results: Record<string, unknown[]> = {}

for (const file of readdirSync(themesDir).filter(f => f.endsWith('.css')).sort()) {
  const css = readFileSync(join(themesDir, file), 'utf8')
  const tokens: Record<string, RGB> = {}
  for (const m of css.matchAll(/--elf-([a-z-]+):\s*([^;]+);/g)) {
    if (m[1] === 'radius' || m[1] === 'radius-pill') continue
    tokens[m[1]!] = parseColor(m[2]!)
  }
  const rows: unknown[] = []
  console.log(`\nTheme: ${file}`)
  const check = (pairs: Array<[string, string]>, min: number, kind: string) => {
    for (const [fg, bg] of pairs) {
      if (!tokens[fg] || !tokens[bg]) throw new Error(`${file}: missing token ${fg} or ${bg}`)
      const r = ratio(tokens[fg]!, tokens[bg]!)
      const pass = r >= min
      if (!pass) failed++
      rows.push({ fg, bg, ratio: Number(r.toFixed(2)), min, pass })
      console.log(`  ${pass ? 'PASS' : 'FAIL'} ${kind.padEnd(4)} ${fg.padEnd(22)} on ${bg.padEnd(11)} ${r.toFixed(2)}:1 (min ${min})  ${toHex(tokens[fg]!)} / ${toHex(tokens[bg]!)}`)
    }
  }
  check(textPairs, 4.5, 'text')
  check(uiPairs, 3, 'ui')
  results[file] = rows
}

if (process.argv.includes('--json')) console.log(JSON.stringify(results, null, 2))
if (failed) {
  console.error(`\n${failed} pair(s) failed WCAG AA.`)
  process.exit(1)
}
console.log('\nAll pairs pass WCAG AA.')
