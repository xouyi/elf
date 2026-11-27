export type SiteTheme = 'elf' | 'nova'
export const siteThemes: { value: SiteTheme, label: string, swatch: string }[] = [
  { value: 'elf', label: 'Elf', swatch: '#a78bfa' },
  { value: 'nova', label: 'Nova', swatch: '#ffcc00' },
]
const STORAGE_KEY = 'elfui-theme'

/** Site-wide theme (data-theme on <html>), persisted in localStorage and restored before first paint by an inline head script. */
export function useSiteTheme() {
  const theme = useState<SiteTheme>('site-theme', () => 'elf')

  function setTheme(next: SiteTheme) {
    theme.value = next
    if (import.meta.client) {
      try { localStorage.setItem(STORAGE_KEY, next) }
      catch { /* storage may be blocked; the theme still applies for this visit */ }
    }
  }

  return { theme, setTheme }
}

/** Inline script (runs before paint) that applies the stored theme so there is no flash of the other theme. */
export const themeBootScript = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='elf'||t==='nova')document.documentElement.dataset.theme=t}catch(e){}`

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
