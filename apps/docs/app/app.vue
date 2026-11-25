<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const { theme } = useSiteTheme()

useHead({
  // Head state owns data-theme so Unhead never reverts what the user chose (the boot script sets it before first paint).
  htmlAttrs: { 'data-theme': theme },
  titleTemplate: title => (title && title !== 'ElfUI' ? `${title} - ElfUI` : 'ElfUI'),
  script: [{ innerHTML: themeBootScript, tagPosition: 'head' }],
  link: [{ rel: 'canonical', href: computed(() => `${config.public.site}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`) }],
})
useSeoMeta({
  ogSiteName: 'ElfUI',
  ogType: 'website',
  ogImage: `${config.public.site}/og.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${config.public.site}/og.png`,
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" class="skip-link rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Skip to content</a>
    <AppHeader />
    <main id="main" class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    <SearchDialog />
  </div>
</template>
