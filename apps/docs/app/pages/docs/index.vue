<script setup lang="ts">
// /docs has no content of its own; send visitors to the first page. A meta refresh keeps this working on static hosting.
const config = useRuntimeConfig()
const target = '/docs/getting-started/introduction'
useHead({ meta: [{ 'http-equiv': 'refresh', 'content': `0;url=${config.app.baseURL}${target.slice(1)}` }, { name: 'robots', content: 'noindex' }] })
if (import.meta.client) await navigateTo(target, { replace: true })
</script>

<template>
  <div class="mx-auto max-w-xl px-4 py-24">
    <p>Redirecting to <NuxtLink :to="target" class="text-primary underline">the documentation</NuxtLink>...</p>
  </div>
</template>
