import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { version: string }

// One isolated route per example (src/components/<dir>/examples/<File>.vue) for the visual regression tests.
const exampleRoutes = readdirSync(join(root, 'src/components'), { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(join(root, 'src/components', d.name, 'examples')))
  .flatMap(d => readdirSync(join(root, 'src/components', d.name, 'examples'))
    .filter(f => f.endsWith('.vue'))
    .map(f => `/__examples/${d.name}/${f.replace('.vue', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`))

const site = 'https://xouyi.github.io/elfUI'
const repo = 'https://github.com/xouyi/elfUI'
// GitHub Pages serves the site under /elfUI/. `nuxt dev` uses '/'; override with DOCS_BASE_URL.
const baseURL = process.env.DOCS_BASE_URL ?? (process.env.NODE_ENV === 'development' ? '/' : '/elfUI/')

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@xouyi/elfui/nuxt', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  // The docs dogfood ElfUI: every theme are bundled so the switcher and the per-example previews can use either.
  elfui: { theme: 'elf', themes: ['nova', 'elfwood'] },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Examples import from '@xouyi/elfui' (what a consumer writes); resolve it to the live sources.
      alias: [{ find: /^@xouyi\/elfui$/, replacement: join(root, 'src/index.ts') }],
    },
    server: { fs: { allow: [root] } },
  },
  alias: { 'elfui-examples': join(root, 'src/components') },
  content: {
    // `bun:sqlite` is built into Bun, so no native SQLite module has to be installed.
    experimental: { sqliteConnector: 'bun' },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: { theme: { default: 'github-dark-default', elfwood: 'github-light-default' }, langs: ['vue', 'ts', 'css', 'bash', 'json', 'html', 'md', 'yaml', 'diff'] },
      },
    },
  },
  runtimeConfig: { public: { version: pkg.version, site, repo } },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }],
      meta: [
        { name: 'theme-color', content: '#0f0d14' },
        { name: 'color-scheme', content: 'light dark' },
      ],
    },
  },
  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/docs', '/sitemap.xml', '/search.json', '/404.html', ...exampleRoutes], failOnError: true },
  },
  experimental: { payloadExtraction: true },
  telemetry: false,
})
