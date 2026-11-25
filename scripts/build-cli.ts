/** Bundles cli/index.ts into dist/cli.mjs (runs under node and bun, no runtime dependencies). */
import { chmodSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { version: string }

const result = await Bun.build({
  entrypoints: [join(root, 'cli/index.ts')],
  outdir: join(root, 'dist'),
  naming: 'cli.mjs',
  target: 'node',
  format: 'esm',
  minify: false,
  define: { __ELFUI_VERSION__: JSON.stringify(pkg.version) },
})
if (!result.success) {
  for (const m of result.logs) console.error(m)
  process.exit(1)
}
const out = join(root, 'dist/cli.mjs')
const text = readFileSync(out, 'utf8')
if (!text.startsWith('#!/usr/bin/env node')) {
  console.error('build-cli: dist/cli.mjs lost its shebang')
  process.exit(1)
}
chmodSync(out, 0o755)
console.log(`built dist/cli.mjs (${(text.length / 1024).toFixed(1)} kB)`)
