import tailwindcss from '@tailwindcss/vite'

// Everything Elf needs from the consumer: the module, a Tailwind v4 entry stylesheet and the Vite plugin.
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@xouyi/elfui/nuxt'],
  css: ['~/assets/css/main.css'],
  // `themes` bundles both token files so the switcher can change theme at runtime.
  elfui: { theme: 'novatron', themes: ['elf'] },
  vite: { plugins: [tailwindcss()] },
  app: { head: { title: 'Elf demo', htmlAttrs: { lang: 'en' } } },
})
