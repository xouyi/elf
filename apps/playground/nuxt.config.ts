import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@xouyi/elfui/nuxt'],
  css: ['~/assets/css/main.css'],
  elfui: { theme: 'nova', themes: ['elf'] },
  vite: { plugins: [tailwindcss()] },
  app: { head: { title: 'ElfUI playground' } },
})
