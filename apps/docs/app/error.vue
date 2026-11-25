<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useHead({ title: is404.value ? 'Page not found' : 'Something went wrong', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main id="main" class="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 px-4 py-24 sm:px-6">
      <p class="font-mono text-sm text-muted-foreground">
        {{ error.statusCode }}
      </p>
      <h1 class="text-3xl font-semibold tracking-tight">
        {{ is404 ? 'This page does not exist' : 'Something went wrong' }}
      </h1>
      <p class="text-muted-foreground">
        {{ is404 ? 'The page may have moved or never existed. Try the documentation index or search.' : 'Reload the page or go back to the documentation.' }}
      </p>
      <div class="flex gap-2">
        <ElfButton as-child>
          <NuxtLink to="/docs/getting-started/introduction">
            Documentation
          </NuxtLink>
        </ElfButton>
        <ElfButton as-child variant="outline">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </ElfButton>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
