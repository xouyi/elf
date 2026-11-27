export type SiteTheme = 'elf' | 'nova' | 'elfwood'
export const siteThemes: { value: SiteTheme, label: string, swatch: string }[] = [
  { value: 'elf', label: 'Elf', swatch: '#a78bfa' },
  { value: 'nova', label: 'Nova', swatch: '#ffcc00' },
  { value: 'elfwood', label: 'Elfwood', swatch: '#15803d' },
]

/** Site-wide theme (data-theme on <html>). The `elfui` module options in nuxt.config.ts supply the themes, the default and the persistence. */
export function useSiteTheme() {
  const { theme, setTheme } = useElfTheme<SiteTheme>()
  return { theme, setTheme }
}

/**
 * The site theme as a component should render it. Until the component has mounted it reports the server value ('elf'),
 * because the stored preference is only known in the browser and components (especially lazily hydrated ones) must
 * produce the same markup as the prerendered HTML.
 */
export function useDisplayTheme() {
  const { theme } = useSiteTheme()
  const mounted = ref(false)
  onMounted(() => (mounted.value = true))
  return computed<SiteTheme>(() => (mounted.value ? theme.value : 'elf'))
}
