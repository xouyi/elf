import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@elf/ui/nuxt'],
  css: ['~/assets/css/main.css'],
  elf: { theme: 'novatron', themes: ['elf'] },
  vite: { plugins: [tailwindcss()] },
  app: { head: { title: 'Elf playground' } },
})
