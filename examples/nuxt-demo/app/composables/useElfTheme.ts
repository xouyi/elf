export type DemoTheme = 'elf' | 'novatron'

/** Theme persisted in a cookie so server rendering already uses the right `data-theme`. */
export function useElfTheme() {
  const theme = useCookie<DemoTheme>('elf-demo-theme', { default: () => 'novatron', sameSite: 'lax' })
  useHead({ htmlAttrs: { 'data-theme': theme } })
  return theme
}
