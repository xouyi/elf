import type { ElfThemeConfig } from '../../composables/use-elf-theme'
import { defineNuxtPlugin, useCookie, useHead, useRuntimeConfig } from '#imports'
import { provideElfTheme } from '../../composables/use-elf-theme'

/**
 * Applies the `elfui` module options to the app: every `useElfTheme()` and `<ElfThemeSwitcher>` shares the themes, the
 * default and the persistence, and with `persist: 'cookie'` the server reads the cookie so `<html data-theme>` is right in
 * the first HTML. A cookie value that is not one of the themes is ignored.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.elfui as Required<Pick<ElfThemeConfig, 'themes' | 'defaultTheme' | 'persist' | 'storageKey'>>
  const stored = config.persist === 'cookie' ? useCookie<string | null | undefined>(config.storageKey, { readonly: true }).value : undefined
  const theme = provideElfTheme(nuxtApp.vueApp, { ...config, initial: stored })
  // Head state owns data-theme, so Unhead never reverts what the visitor chose.
  useHead({ htmlAttrs: { 'data-theme': theme } })
})
