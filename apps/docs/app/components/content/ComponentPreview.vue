<script setup lang="ts">
import type { SiteTheme } from '~/composables/useSiteTheme'
import type { Component } from 'vue'
import examples from '~/generated/examples.json'

interface ExampleData { name: string, component: string, title: string, file: string, code: string, html: string }

const props = withDefaults(defineProps<{
  /** Example id: `<component-dir>-<kebab-file-name>`, e.g. `button-variants` for src/components/button/examples/Variants.vue. */
  name: string
  /** Vertical alignment of the live preview. */
  align?: 'center' | 'start'
}>(), { align: 'center' })

const site = useSite()
const example = (examples as Record<string, ExampleData>)[props.name]
if (!example) throw new Error(`ComponentPreview: no example "${props.name}". Add src/components/<dir>/examples/<Name>.vue.`)

// The live component is the very file shown in the Code tab: one source for the docs, the tests and the visual baselines.
const loaders = Object.fromEntries(
  Object.entries(import.meta.glob('../../../../../src/components/*/examples/*.vue')).map(([path, loader]) => {
    const [, dir, file] = path.match(/components\/([^/]+)\/examples\/([^/]+)\.vue$/)!
    return [`${dir}-${file!.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, loader]
  }),
)
const Live = defineAsyncComponent(loaders[props.name] as () => Promise<Component>)

const theme = useDisplayTheme()
const local = ref<SiteTheme | null>(null)
const effective = computed(() => local.value ?? theme.value)
const sourceUrl = `${site.repo}/blob/main/${example.file}`
const tab = ref('preview')
const uid = useId()
</script>

<template>
  <figure class="not-prose my-6 overflow-hidden rounded-lg border bg-card" :aria-label="`${example.title} example`">
    <ElfTabs v-model="tab" class="gap-0">
      <div class="flex items-center justify-between gap-2 border-b px-2 py-1.5">
        <ElfTabsList :aria-label="`${example.title} view`" class="h-8">
          <ElfTabsTrigger value="preview" class="px-3">
            Preview
          </ElfTabsTrigger>
          <ElfTabsTrigger value="code" class="px-3">
            Code
          </ElfTabsTrigger>
        </ElfTabsList>
        <div class="flex items-center gap-1">
          <ThemeToggle :model-value="effective" :label="`${example.title} preview theme`" compact @update:model-value="local = $event" />
        </div>
      </div>
      <ElfTabsContent value="preview" class="m-0">
        <div
          :id="`${uid}-preview`"
          :data-theme="effective"
          class="preview-surface flex min-h-48 flex-wrap justify-center gap-4 overflow-x-auto p-6 sm:p-10"
          :class="align === 'center' ? 'items-center' : 'items-start'"
        >
          <Live />
        </div>
      </ElfTabsContent>
      <ElfTabsContent value="code" force-mount class="relative m-0 data-[state=inactive]:hidden">
        <div class="absolute top-2 right-2 z-10 flex items-center gap-1">
          <CopyButton :text="example.code" label="Copy example code" />
        </div>
        <div class="doc-code max-h-[28rem] overflow-auto" v-html="example.html" />
        <p class="border-t px-3 py-2 text-xs text-muted-foreground">
          Source: <a class="underline underline-offset-4 hover:text-foreground" :href="sourceUrl" target="_blank" rel="noopener">{{ example.file }}</a>
        </p>
      </ElfTabsContent>
    </ElfTabs>
  </figure>
</template>
