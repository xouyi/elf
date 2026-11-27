import type { ElfTheme } from '../lib/themes'
import type { ElfThemePersist } from '../composables/use-elf-theme'
import { addComponentsDir, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { elfThemeBootScript } from '../composables/use-elf-theme'

export type { ElfTheme, ElfThemePersist }

export interface ModuleOptions {
  /** Default theme, applied through `data-theme` on `<html>` until a visitor chooses another. */
  theme: ElfTheme
  /** Further themes to bundle and let `useElfTheme()` / `<ElfThemeSwitcher>` switch to. Defaults to the selected theme only. */
  themes?: ElfTheme[]
  /**
   * Where the visitor's choice is remembered: `'cookie'` (default; the server reads it, so the first HTML already has the
   * right theme), `'localStorage'` (applied by a small inline script before the first paint) or `false`.
   */
  persist: ElfThemePersist
  /** Component name prefix. */
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@xouyi/elfui',
    configKey: 'elfui',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: {
    theme: 'elf',
    persist: 'cookie',
    prefix: 'Elf',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Source-distributed package: let Vite/Nitro compile the .vue and .ts files.
    nuxt.options.build.transpile.push('@xouyi/elfui')

    addComponentsDir({
      path: resolve('../components'),
      prefix: options.prefix,
      pathPrefix: false,
      extensions: ['vue'],
      // Docs examples live next to each component but are not part of the public API.
      ignore: ['**/examples/**'],
      global: false,
    })

    // Composables are auto-imported like the components.
    addImports([
      { name: 'useElfTheme', from: resolve('../composables/use-elf-theme') },
      { name: 'elfThemeBootScript', from: resolve('../composables/use-elf-theme') },
      { name: 'isElfTheme', from: resolve('../lib/themes') },
      { name: 'useToast', from: resolve('../components/toast/use-toast') },
    ])

    // Theme tokens are plain CSS variables; Tailwind mappings live in styles.css,
    // which the app imports after `@import "tailwindcss"`.
    const themes = new Set<ElfTheme>([options.theme, ...(options.themes ?? [])])
    for (const theme of themes) {
      nuxt.options.css.push(resolve(`../themes/${theme}.css`))
    }

    // The themes useElfTheme() accepts: the bundled ones, in the order given (the default first unless `themes` lists it).
    const names = options.themes?.includes(options.theme) ? [...options.themes] : [...themes]
    const storageKey = 'elfui-theme'
    nuxt.options.runtimeConfig.public.elfui = { themes: names, defaultTheme: options.theme, persist: options.persist, storageKey }
    addPlugin({ src: resolve('./runtime/plugin') })

    // Prerendered pages cannot read the cookie on the server, so a tiny inline script applies the stored choice before the first paint.
    if (options.persist) {
      nuxt.options.app.head.script = [
        ...(nuxt.options.app.head.script ?? []),
        { innerHTML: elfThemeBootScript({ storage: options.persist, storageKey, themes: names }), tagPosition: 'head' },
      ]
    }

    nuxt.options.app.head.htmlAttrs = {
      ...nuxt.options.app.head.htmlAttrs,
      'data-theme': options.theme,
    }
  },
})
