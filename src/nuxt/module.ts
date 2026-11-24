import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export type ElfTheme = 'elf' | 'novatron'

export interface ModuleOptions {
  /** Theme applied through `data-theme` on `<html>`. */
  theme: ElfTheme
  /** Theme token files to bundle. Defaults to the selected theme only. */
  themes?: ElfTheme[]
  /** Component name prefix. */
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@elf/ui',
    configKey: 'elf',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: {
    theme: 'elf',
    prefix: 'Elf',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Source-distributed package: let Vite/Nitro compile the .vue and .ts files.
    nuxt.options.build.transpile.push('@elf/ui')

    addComponentsDir({
      path: resolve('../components'),
      prefix: options.prefix,
      pathPrefix: false,
      extensions: ['vue'],
      global: false,
    })

    // Theme tokens are plain CSS variables; Tailwind mappings live in styles.css,
    // which the app imports after `@import "tailwindcss"`.
    const themes = new Set<ElfTheme>([options.theme, ...(options.themes ?? [])])
    for (const theme of themes) {
      nuxt.options.css.push(resolve(`../themes/${theme}.css`))
    }

    nuxt.options.app.head.htmlAttrs = {
      ...nuxt.options.app.head.htmlAttrs,
      'data-theme': options.theme,
    }
  },
})
