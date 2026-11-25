/**
 * Assembles the GitHub Pages artifact in ./_site:
 *   /            the docs site (apps/docs, `nuxt generate` with base /elfUI/)
 *   /r/*.json    shadcn-vue registry
 *   /llms.txt, /llms-full.txt
 * The site is deployed under https://xouyi.github.io/elfUI/, so Pages serves _site at that base path.
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const site = join(root, '_site')
rmSync(site, { recursive: true, force: true })

const build = Bun.spawnSync(['bun', 'run', 'docs:build'], {
  cwd: root,
  env: { ...process.env, DOCS_BASE_URL: '/elfUI/' },
  stdout: 'inherit',
  stderr: 'inherit',
})
if (build.exitCode !== 0) process.exit(build.exitCode ?? 1)

const generated = join(root, 'apps', 'docs', '.output', 'public')
if (!existsSync(generated)) throw new Error('apps/docs/.output/public missing; the docs build produced no output')

mkdirSync(site, { recursive: true })
cpSync(generated, site, { recursive: true })
cpSync(join(root, 'registry', 'r'), join(site, 'r'), { recursive: true })
for (const f of ['llms.txt', 'llms-full.txt']) {
  if (!existsSync(join(root, f))) throw new Error(`${f} missing; run bun run llms`)
  cpSync(join(root, f), join(site, f))
}
// Pages must not run Jekyll over the generated output (it would drop the _nuxt and __nuxt_content folders).
writeFileSync(join(site, '.nojekyll'), '')
console.log('pages artifact ready in _site')
