import { describe, expect, it } from 'vitest'
import { patchNuxtConfig, patchViteConfig } from './config-patch'
import { ensureCssImports } from './edit'

const opts = { theme: 'novatron', defaultCss: '~/assets/css/main.css' }

function nuxt(input: string) {
  const first = patchNuxtConfig(input, opts)
  if (!first.ok) throw new Error(first.reason)
  const second = patchNuxtConfig(first.src, opts)
  if (!second.ok) throw new Error(second.reason)
  return { first, second }
}

describe('patchNuxtConfig', () => {
  it('patches an empty config and is idempotent', () => {
    const { first, second } = nuxt('export default defineNuxtConfig({})\n')
    expect(first.changed).toBe(true)
    expect(first.src).toContain('import tailwindcss from \'@tailwindcss/vite\'')
    expect(first.src).toContain('modules: [\'@xouyi/elfui/nuxt\']')
    expect(first.src).toContain('elfui: { theme: \'novatron\' }')
    expect(first.src).toContain('vite: { plugins: [tailwindcss()] }')
    expect(first.css).toBe('~/assets/css/main.css')
    expect(second.changed).toBe(false)
    expect(second.src).toBe(first.src)
  })

  it('extends an existing multi-line fixture without touching other options', () => {
    const input = [
      'import { something } from \'./x\'',
      '',
      'export default defineNuxtConfig({',
      '  compatibilityDate: \'2026-01-01\',',
      '  modules: [',
      '    \'@nuxt/content\',',
      '  ],',
      '  css: [\'~/assets/css/app.css\'],',
      '  vite: {',
      '    plugins: [myPlugin()],',
      '    server: { port: 3001 },',
      '  },',
      '  devtools: { enabled: true }, // keep',
      '})',
      '',
    ].join('\n')
    const { first, second } = nuxt(input)
    expect(first.src).toMatch(/modules: \[\n {4}'@nuxt\/content',\n {4}'@xouyi\/elfui\/nuxt',\n {2}\]/)
    expect(first.src).toContain('plugins: [myPlugin(), tailwindcss()]')
    expect(first.src).toContain('compatibilityDate: \'2026-01-01\'')
    expect(first.src).toContain('server: { port: 3001 }')
    expect(first.src).toContain('devtools: { enabled: true }, // keep')
    expect(first.css).toBe('~/assets/css/app.css')
    expect(first.src.match(/@xouyi\/elfui\/nuxt/g)).toHaveLength(1)
    expect(second.src).toBe(first.src)
  })

  it('does not duplicate an existing tailwind plugin imported under another name', () => {
    const input = 'import tw from \'@tailwindcss/vite\'\nexport default defineNuxtConfig({ modules: [\'@xouyi/elfui/nuxt\'], elfui: { theme: \'elf\' }, css: [\'~/a.css\'], vite: { plugins: [tw()] } })\n'
    const r = patchNuxtConfig(input, opts)
    expect(r.ok && r.changed).toBe(false)
  })

  it('refuses shapes it cannot edit', () => {
    expect(patchNuxtConfig('export default {}\n', opts).ok).toBe(false)
    expect(patchNuxtConfig('export default defineNuxtConfig({ modules: modulesList })\n', opts).ok).toBe(false)
    expect(patchNuxtConfig('export default defineNuxtConfig({ vite: viteOptions })\n', opts).ok).toBe(false)
  })
})

describe('patchViteConfig', () => {
  const input = 'import vue from \'@vitejs/plugin-vue\'\nimport { defineConfig } from \'vite\'\n\nexport default defineConfig({\n  plugins: [vue()],\n})\n'

  it('adds the plugin once', () => {
    const first = patchViteConfig(input)
    expect(first.ok && first.src).toContain('import tailwindcss from \'@tailwindcss/vite\'')
    if (!first.ok) throw new Error(first.reason)
    expect(first.src).toMatch(/plugins: \[vue\(\), tailwindcss\(\)\]/)
    const second = patchViteConfig(first.src)
    expect(second.ok && second.changed).toBe(false)
  })

  it('creates plugins when missing and refuses unknown shapes', () => {
    const r = patchViteConfig('import { defineConfig } from \'vite\'\nexport default defineConfig({ base: \'/\' })\n')
    expect(r.ok && r.src).toContain('plugins: [tailwindcss()]')
    expect(patchViteConfig('export default defineConfig(() => ({}))\n').ok).toBe(false)
    expect(patchViteConfig('export default defineConfig({ plugins: list })\n').ok).toBe(false)
  })
})

describe('ensureCssImports', () => {
  const wanted = [
    { re: /@import\s+['"]tailwindcss['"]/, line: '@import \'tailwindcss\';' },
    { re: /@import\s+['"]@xouyi\/elfui\/styles\.css['"]/, line: '@import \'@xouyi/elfui/styles.css\';' },
  ]

  it('adds both imports in order, once', () => {
    const first = ensureCssImports(':root { color: red; }', wanted)
    expect(first.css.split('\n').slice(0, 2)).toEqual(['@import \'tailwindcss\';', '@import \'@xouyi/elfui/styles.css\';'])
    expect(ensureCssImports(first.css, wanted).changed).toBe(false)
  })

  it('places the missing import after the existing Tailwind import', () => {
    const r = ensureCssImports('@import "tailwindcss";\nbody { margin: 0; }', wanted)
    expect(r.css).toBe('@import "tailwindcss";\n@import \'@xouyi/elfui/styles.css\';\nbody { margin: 0; }')
  })
})
