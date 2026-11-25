import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const root = join(import.meta.dirname, '..')
const cli = join(root, 'dist/cli.mjs')
const registry = join(root, 'registry/r')
const dirs: string[] = []

function project(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), 'elfui-e2e-'))
  dirs.push(dir)
  for (const [name, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, name)), { recursive: true })
    writeFileSync(join(dir, name), content)
  }
  return dir
}

function elfui(cwd: string, ...args: string[]) {
  const r = spawnSync('node', [cli, ...args, '--cwd', cwd], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1', ELFUI_REGISTRY: '' } })
  return { code: r.status, out: r.stdout + r.stderr }
}

const read = (dir: string, file: string) => readFileSync(join(dir, file), 'utf8')

const viteFiles = (alias: boolean) => ({
  'package.json': JSON.stringify({ name: 'v', type: 'module', dependencies: { vue: '^3.5.0' }, devDependencies: { vite: '^8.0.0', '@vitejs/plugin-vue': '^6.0.0', typescript: '^5.9.0', tailwindcss: '^4.0.0', '@tailwindcss/vite': '^4.0.0', elfui: '*' } }),
  'bun.lock': '',
  'index.html': '<!doctype html>\n<html lang="en">\n  <body><div id="app"></div><script type="module" src="/src/main.ts"></script></body>\n</html>\n',
  'vite.config.ts': `import vue from '@vitejs/plugin-vue'\nimport { defineConfig } from 'vite'\n\nexport default defineConfig({\n  plugins: [vue()],${alias ? '\n  resolve: { alias: { \'@\': \'/src\' } },' : ''}\n})\n`,
  'tsconfig.json': JSON.stringify({ compilerOptions: alias ? { baseUrl: '.', paths: { '@/*': ['./src/*'] } } : {} }),
  'src/main.ts': 'import { createApp } from \'vue\'\nimport App from \'./App.vue\'\nimport \'./style.css\'\n\ncreateApp(App).mount(\'#app\')\n',
  'src/App.vue': '<template><div /></template>\n',
  'src/style.css': 'body { margin: 0; }\n',
})

beforeAll(() => {
  execFileSync('bun', ['scripts/build-cli.ts'], { cwd: root, stdio: 'pipe' })
})
afterAll(() => {
  for (const d of dirs) rmSync(d, { recursive: true, force: true })
})

describe('elfui CLI (built binary)', () => {
  it('prints help and version', () => {
    expect(elfui(root, '--version').out.trim()).toBe(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version)
    const help = elfui(root, '--help').out
    for (const word of ['init', 'add', 'list', 'diff', '--registry', '--overwrite']) expect(help).toContain(word)
    expect(elfui(root, 'nope').code).toBe(1)
  })

  it('lists the local registry', () => {
    const r = elfui(root, 'list', '--registry', registry)
    expect(r.code).toBe(0)
    expect(r.out).toContain('button')
    expect(r.out).toContain('dialog')
  })

  it('initializes a Vite + Vue project idempotently', () => {
    const dir = project(viteFiles(true))
    const first = elfui(dir, 'init', '--yes', '--theme', 'novatron', '--no-install')
    expect(first.code, first.out).toBe(0)
    expect(read(dir, 'vite.config.ts')).toContain('plugins: [vue(), tailwindcss()]')
    expect(read(dir, 'src/style.css')).toBe('@import \'tailwindcss\';\n@import \'elfui/styles.css\';\n@import \'elfui/themes/novatron.css\';\nbody { margin: 0; }\n')
    expect(read(dir, 'index.html')).toContain('<html data-theme="novatron" lang="en">')
    const snapshot = ['vite.config.ts', 'src/style.css', 'index.html', 'src/main.ts'].map(f => read(dir, f))
    const second = elfui(dir, 'init', '--yes', '--theme', 'novatron', '--no-install')
    expect(second.code, second.out).toBe(0)
    expect(['vite.config.ts', 'src/style.css', 'index.html', 'src/main.ts'].map(f => read(dir, f))).toEqual(snapshot)
  })

  it('refuses an unknown vite.config shape without touching it', () => {
    const files = { ...viteFiles(true), 'vite.config.ts': 'export default makeConfig()\n' }
    const dir = project(files)
    const r = elfui(dir, 'init', '--yes', '--no-install')
    expect(r.code).toBe(1)
    expect(r.out).toContain('by hand')
    expect(read(dir, 'vite.config.ts')).toBe('export default makeConfig()\n')
  })

  it('adds components with the alias, never overwrites, and diffs', () => {
    const dir = project(viteFiles(true))
    const add = elfui(dir, 'add', 'button', 'dialog', '--registry', registry, '--no-install')
    expect(add.code, add.out).toBe(0)
    expect(read(dir, 'src/lib/utils.ts')).toContain('export function cn')
    expect(read(dir, 'src/components/ui/button/Button.vue')).toContain('from \'@/lib/utils\'')
    expect(read(dir, 'src/components/ui/dialog/DialogContent.vue')).toMatch(/from '@\/components\/ui\/button'|from '\.\.\/button'|from '@\/lib\/utils'/)

    expect(elfui(dir, 'add', 'button', '--registry', registry, '--no-install').out).toContain('0 files written')
    const file = join(dir, 'src/components/ui/button/Button.vue')
    writeFileSync(file, `${read(dir, 'src/components/ui/button/Button.vue')}<!-- mine -->\n`)
    const kept = elfui(dir, 'add', 'button', '--registry', registry, '--no-install')
    expect(kept.out).toContain('kept your version')
    expect(read(dir, 'src/components/ui/button/Button.vue')).toContain('<!-- mine -->')
    expect(elfui(dir, 'diff', 'button', '--registry', registry).out).toContain('- <!-- mine -->')
    expect(elfui(dir, 'add', 'button', '--registry', registry, '--no-install', '--overwrite').code).toBe(0)
    expect(read(dir, 'src/components/ui/button/Button.vue')).not.toContain('<!-- mine -->')
    expect(elfui(dir, 'diff', 'button', '--registry', registry).out).toContain('Everything matches')
  })

  it('writes relative imports when the project has no alias, and honours --path', () => {
    const dir = project(viteFiles(false))
    expect(elfui(dir, 'add', 'dialog', '--registry', registry, '--no-install', '--path', 'ui').code).toBe(0)
    expect(read(dir, 'src/ui/dialog/DialogContent.vue')).not.toContain('@/')
    expect(read(dir, 'src/lib/utils.ts')).toContain('cn')
  })

  it('uses ~/ and app/ in a Nuxt 4 project and rejects unknown components', () => {
    const dir = project({
      'package.json': JSON.stringify({ name: 'n', dependencies: { nuxt: '^4.0.0', vue: '^3.5.0' } }),
      'nuxt.config.ts': 'export default defineNuxtConfig({\n  compatibilityDate: \'2026-01-01\',\n})\n',
      'app/app.vue': '<template><div /></template>\n',
    })
    const init = elfui(dir, 'init', '--yes', '--no-install')
    expect(init.code, init.out).toBe(0)
    expect(read(dir, 'nuxt.config.ts')).toContain('modules: [\'elfui/nuxt\']')
    expect(read(dir, 'app/assets/css/main.css')).toBe('@import \'tailwindcss\';\n@import \'elfui/styles.css\';\n')
    expect(elfui(dir, 'add', 'button', '--registry', registry, '--no-install').code).toBe(0)
    expect(read(dir, 'app/components/ui/button/Button.vue')).toContain('from \'~/lib/utils\'')
    const bad = elfui(dir, 'add', 'carousel', '--registry', registry, '--no-install')
    expect(bad.code).toBe(1)
    expect(bad.out).toContain('Unknown component')
  })
})
