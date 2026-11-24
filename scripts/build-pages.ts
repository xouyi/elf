/**
 * Assembles the GitHub Pages artifact in ./_site:
 *   /            Storybook (built with STORYBOOK_BASE=/elf/)
 *   /r/*.json    shadcn-vue registry
 *   /llms.txt, /llms-full.txt
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const site = join(root, '_site')
rmSync(site, { recursive: true, force: true })

const build = Bun.spawnSync(['bun', 'run', 'build-storybook'], {
  cwd: root,
  env: { ...process.env, STORYBOOK_BASE: '/elf/' },
  stdout: 'inherit',
  stderr: 'inherit',
})
if (build.exitCode !== 0) process.exit(build.exitCode ?? 1)

mkdirSync(site, { recursive: true })
cpSync(join(root, 'storybook-static'), site, { recursive: true })
cpSync(join(root, 'registry', 'r'), join(site, 'r'), { recursive: true })
for (const f of ['llms.txt', 'llms-full.txt']) {
  if (!existsSync(join(root, f))) throw new Error(`${f} missing; run bun run llms`)
  cpSync(join(root, f), join(site, f))
}
// Pages must not run Jekyll over the Storybook output.
writeFileSync(join(site, '.nojekyll'), '')
console.log('pages artifact ready in _site')
