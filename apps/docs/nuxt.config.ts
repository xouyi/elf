import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { version: string }

const site = 'https://xouyi.github.io/elfUI'
const repo = 'https://github.com/xouyi/elfUI'
// GitHub Pages serves the site under /elfUI/. `nuxt dev` uses '/'; override with DOCS_BASE_URL.
const baseURL = process.env.DOCS_BASE_URL ?? (process.env.NODE_ENV === 'development' ? '/' : '/elfUI/')

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@elf/ui/nuxt', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  // The docs dogfood ElfUI: both themes are bundled so the switcher and the per-example previews can use either.
  elf: { theme: 'elf', themes: ['novatron'] },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Examples import from '@elf/ui' (what a consumer writes); resolve it to the live sources.
      alias: [{ find: /^@elf\/ui$/, replacement: join(root, 'src/index.ts') }],
    },
    server: { fs: { allow: [root] } },
  },
  alias: { '@elf/ui-examples': join(root, 'src/components') },
  content: {
    // `bun:sqlite` is built into Bun, so no native SQLite module has to be installed.
    experimental: { sqliteConnector: 'bun' },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: { theme: 'github-dark-default', langs: ['vue', 'ts', 'css', 'bash', 'json', 'html', 'md', 'yaml', 'diff'] },
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
        { name: 'color-scheme', content: 'dark' },
      ],
    },
  },
  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/docs', '/sitemap.xml', '/search.json', '/404.html'], failOnError: true },
  },
  experimental: { payloadExtraction: true },
  telemetry: false,
})
