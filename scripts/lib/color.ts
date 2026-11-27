/**
 * Color math and the token pair lists shared by `scripts/contrast.ts` (the CI gate) and the docs build
 * (`apps/docs/scripts/prepare.ts`, which publishes the same ratios on the Theming page).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export type RGB = [number, number, number]

export function parseColor(value: string): RGB {
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

export function oklchToSrgb(L: number, C: number, hDeg: number): RGB {
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

export function luminance([r, g, b]: RGB) {
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export function ratio(a: RGB, b: RGB) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

export const toHex = (c: RGB) => `#${c.map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')}`

/** Text pairs need 4.5:1 (WCAG AA). */
export const textPairs: Array<[string, string]> = [
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
  ['destructive-text', 'background'], // error text on the page, cards and popovers
  ['destructive-text', 'card'],
  ['destructive-text', 'popover'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['success-text', 'background'], // success text and icons on the page, cards and popovers
  ['success-text', 'card'],
  ['success-text', 'popover'],
  ['warning-text', 'background'], // warning text and icons on the page, cards and popovers
  ['warning-text', 'card'],
  ['warning-text', 'popover'],
  ['primary', 'background'], // primary used as text (link variant)
]

/** UI component boundaries need 3:1. */
export const uiPairs: Array<[string, string]> = [
  ['input', 'background'],
  ['ring', 'background'],
]

/** Tokens whose value is not a color: geometry and the glow strength (a percentage used by `color-mix`). */
export const NON_COLOR_TOKENS = new Set(['radius', 'radius-pill', 'glow'])

export interface ThemeTokens {
  /** Theme name (file name without extension). */
  name: string
  /** Raw CSS value of every token, in file order, including radius tokens. */
  raw: Record<string, string>
  /** Parsed colors for color tokens only. */
  colors: Record<string, RGB>
}

/** Reads every `src/themes/*.css` file, sorted by name. */
export function readThemes(root: string): ThemeTokens[] {
  const dir = join(root, 'src', 'themes')
  return readdirSync(dir).filter(f => f.endsWith('.css')).sort().map((file) => {
    const css = readFileSync(join(dir, file), 'utf8')
    const raw: Record<string, string> = {}
    const colors: Record<string, RGB> = {}
    for (const m of css.matchAll(/--elf-([a-z-]+):\s*([^;]+);/g)) {
      raw[m[1]!] = m[2]!.trim()
      if (!NON_COLOR_TOKENS.has(m[1]!)) colors[m[1]!] = parseColor(m[2]!)
    }
    return { name: file.replace('.css', ''), raw, colors }
  })
}
