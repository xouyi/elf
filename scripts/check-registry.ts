/**
 * Fails when the committed registry.json / registry/r differ from a fresh build.
 * Run as `bun run registry:check`; on drift the regenerated files are left in place so they can be committed.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')

function snapshot(): Map<string, string> {
  const files = new Map<string, string>()
  files.set('registry.json', readFileSync(join(root, 'registry.json'), 'utf8'))
  const dir = join(root, 'registry', 'r')
  if (existsSync(dir)) {
    for (const f of readdirSync(dir).sort()) files.set(`registry/r/${f}`, readFileSync(join(dir, f), 'utf8'))
  }
  return files
}

const before = snapshot()
const build = Bun.spawnSync(['bun', 'run', 'registry:build'], { cwd: root, stdout: 'inherit', stderr: 'inherit' })
if (build.exitCode !== 0) process.exit(build.exitCode ?? 1)
const after = snapshot()

const drift = [...new Set([...before.keys(), ...after.keys()])].filter(k => before.get(k) !== after.get(k))
if (drift.length > 0) {
  console.error(`Registry is out of date. Regenerated files differ from the committed ones:\n  ${drift.join('\n  ')}\nCommit the regenerated files.`)
  process.exit(1)
}
console.log('Registry is up to date.')
