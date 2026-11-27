<script setup lang="ts">
const site = useSite()
const route = useRoute()

useHead({
  titleTemplate: title => (title && title !== 'ElfUI' ? `${title} - ElfUI` : 'ElfUI'),
  link: [{ rel: 'canonical', href: computed(() => `${site.site}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`) }],
})
useSeoMeta({
  ogSiteName: 'ElfUI',
  ogType: 'website',
  ogImage: `${site.site}/og.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${site.site}/og.png`,
})

// The isolated example harness (/__examples/**) renders without site chrome so screenshots contain only the example.
const bare = computed(() => route.path.includes('/__examples/'))
</script>

<template>
  <NuxtPage v-if="bare" />
  <div v-else class="flex min-h-dvh flex-col">
    <a href="#main" class="skip-link rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Skip to content</a>
    <AppHeader />
    <main id="main" class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    <SearchDialog />
  </div>
  <!-- The one toaster of the app: the toast examples and the docs pages call useToast() from anywhere. -->
  <ElfToaster />
</template>
