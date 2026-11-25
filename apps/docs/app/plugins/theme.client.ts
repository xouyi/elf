// Sync the reactive theme state with what the inline boot script applied. Done after mount so hydration matches the server HTML.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const current = document.documentElement.dataset.theme
    if (current === 'elf' || current === 'novatron') useState<SiteTheme>('site-theme').value = current
  })
})
