<script setup lang="ts">
import type { Component } from 'vue'

// Isolated render of one example for the visual regression tests (tests/visual). Not linked from the site, not in the
// sitemap or the search index, and marked noindex. `?theme=elf|nova|elfwood` selects the theme. The page sets
// `data-ready="true"` on <html> once the example is mounted, fonts are loaded and the theme is applied.
definePageMeta({ layout: false })

const route = useRoute()
const dir = String(route.params.dir)
const example = String(route.params.example)

const loaders = Object.fromEntries(
  Object.entries(import.meta.glob('../../../../../../src/components/*/examples/*.vue')).map(([path, loader]) => {
    const [, d, file] = path.match(/components\/([^/]+)\/examples\/([^/]+)\.vue$/)!
    return [`${d}/${file!.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, loader]
  }),
)
const loader = loaders[`${dir}/${example}`]
if (!loader) throw createError({ statusCode: 404, statusMessage: 'Unknown example', fatal: true })
const Live = defineAsyncComponent(loader as () => Promise<Component>)

useHead({
  title: `${dir}/${example}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  // Applies ?theme= before first paint, after the site's own boot script (which restores the stored preference).
  script: [{ innerHTML: 'try{var t=new URLSearchParams(location.search).get("theme");if(t==="elf"||t==="nova"||t==="elfwood")document.documentElement.dataset.theme=t}catch(e){}', tagPosition: 'head' }],
})

const ready = ref(false)
onMounted(async () => {
  await nextTick()
  await document.fonts.ready
  // Two frames: lets Reka UI finish its mount-time layout work and the async example paint.
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  ready.value = true
  document.documentElement.dataset.ready = 'true'
})
</script>

<template>
  <main class="example-harness min-h-dvh bg-background p-6 text-foreground">
    <div id="example-frame" class="inline-flex max-w-full flex-wrap items-center gap-4 align-top">
      <ClientOnly>
        <Live />
      </ClientOnly>
    </div>
    <span v-if="ready" hidden data-testid="ready" />
  </main>
</template>

<style>
/* Deterministic rendering for screenshots: no motion, no caret, no smooth scrolling. */
html[data-ready], html[data-ready] * { scroll-behavior: auto !important; }
.example-harness *, .example-harness *::before, .example-harness *::after,
[data-slot="dialog-overlay"], [data-slot="dialog-content"] {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}
</style>
