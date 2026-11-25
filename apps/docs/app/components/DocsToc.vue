<script setup lang="ts">
interface TocLink { id: string, depth: number, text: string, children?: TocLink[] }
const props = defineProps<{ links: TocLink[] }>()

const flat = (links: TocLink[]): TocLink[] => links.flatMap(l => [l, ...flat(l.children ?? [])])
const items = ref<TocLink[]>(flat(props.links))
const activeId = ref('')
let observer: IntersectionObserver | undefined

function observe() {
  observer?.disconnect()
  const headings = items.value.map(i => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
  if (!headings.length) return
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible[0]) activeId.value = visible[0].target.id
  }, { rootMargin: '-72px 0px -70% 0px' })
  for (const h of headings) observer.observe(h)
}

onMounted(() => {
  // Components such as the API reference render their own headings; rebuild the list from the DOM.
  const dom = [...document.querySelectorAll<HTMLElement>('.doc-content h2[id], .doc-content h3[id]')]
  if (dom.length) items.value = dom.map(h => ({ id: h.id, depth: Number(h.tagName[1]), text: h.textContent?.replace(/\s*#$/, '').trim() ?? '' }))
  observe()
})
watch(() => props.links, (l) => {
  items.value = flat(l)
  nextTick(observe)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav v-if="items.length" aria-label="On this page" class="text-sm">
    <p class="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      On this page
    </p>
    <ul class="grid gap-1.5 border-l">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="-ml-px block border-l py-0.5 transition-colors hover:text-foreground"
          :class="[item.depth > 2 ? 'pl-6' : 'pl-3', activeId === item.id ? 'border-primary font-medium text-foreground' : 'border-transparent text-muted-foreground']"
          :aria-current="activeId === item.id ? 'location' : undefined"
        >{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>
