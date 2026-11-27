<script setup lang="ts">
const props = defineProps<{ code: string, lang?: string }>()
// Highlighted once at build time through Shiki on the server; plain text on the client fallback.
const { data: html } = await useAsyncData(`snippet-${props.lang}-${props.code}`, async () => {
  if (!import.meta.server) return ''
  const { codeToHtml } = await import('shiki')
  return codeToHtml(props.code, { lang: props.lang ?? 'text', themes: { dark: 'github-dark-default', elfwood: 'github-light-default' }, defaultColor: 'dark' })
})
</script>

<template>
  <div class="code-block group relative my-3 overflow-hidden rounded-lg border not-prose">
    <div class="absolute top-1.5 right-1.5 z-10">
      <CopyButton :text="code" />
    </div>
    <div v-if="html" class="doc-code" v-html="html" />
    <pre v-else class="p-4 font-mono text-sm"><code>{{ code }}</code></pre>
  </div>
</template>
