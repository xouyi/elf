/**
 * Verifies WCAG contrast for every theme in src/themes/*.css.
 * Text pairs need 4.5:1 (AA); UI component boundaries (input, ring) need 3:1.
 * Usage: bun scripts/contrast.ts [--json]
 */
import { join } from 'node:path'
import { ratio, readThemes, textPairs, toHex, uiPairs } from './lib/color'

let failed = 0
const results: Record<string, unknown[]> = {}

for (const theme of readThemes(join(import.meta.dirname, '..'))) {
  const tokens = theme.colors
  const rows: unknown[] = []
  console.log(`\nTheme: ${theme.name}.css`)
  const check = (pairs: Array<[string, string]>, min: number, kind: string) => {
    for (const [fg, bg] of pairs) {
      if (!tokens[fg] || !tokens[bg]) throw new Error(`${theme.name}: missing token ${fg} or ${bg}`)
      const r = ratio(tokens[fg]!, tokens[bg]!)
      const pass = r >= min
      if (!pass) failed++
      rows.push({ fg, bg, ratio: Number(r.toFixed(2)), min, pass })
      console.log(`  ${pass ? 'PASS' : 'FAIL'} ${kind.padEnd(4)} ${fg.padEnd(22)} on ${bg.padEnd(11)} ${r.toFixed(2)}:1 (min ${min})  ${toHex(tokens[fg]!)} / ${toHex(tokens[bg]!)}`)
    }
  }
  check(textPairs, 4.5, 'text')
  check(uiPairs, 3, 'ui')
  results[`${theme.name}.css`] = rows
}

if (process.argv.includes('--json')) console.log(JSON.stringify(results, null, 2))
if (failed) {
  console.error(`\n${failed} pair(s) failed WCAG AA.`)
  process.exit(1)
}
console.log('\nAll pairs pass WCAG AA.')
