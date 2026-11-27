import type { ElfTheme } from '../lib/themes'
import { addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'

export type { ElfTheme }

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
    name: '@xouyi/elfui',
    configKey: 'elfui',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: {
    theme: 'elf',
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

    nuxt.options.app.head.htmlAttrs = {
      ...nuxt.options.app.head.htmlAttrs,
      'data-theme': options.theme,
    }
  },
})
