export type DemoTheme = 'elf' | 'nova' | 'elfwood'

/**
 * Theme persisted in a cookie so server rendering already uses the right `data-theme`.
 * (ElfUI also ships `useElfTheme()`; this demo keeps a three-line cookie version to show the mechanism.)
 */
export function useDemoTheme() {
  const theme = useCookie<DemoTheme>('elf-demo-theme', { default: () => 'nova', sameSite: 'lax' })
  useHead({ htmlAttrs: { 'data-theme': theme } })
  return theme
}
