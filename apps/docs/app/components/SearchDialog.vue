<script setup lang="ts">
import MiniSearch from 'minisearch'
import { CornerDownLeft, FileText, Hash } from '@lucide/vue'

interface Section { id: string, title: string, titles: string[], content: string, level: number }
interface Hit { id: string, page: string, title: string, trail: string, snippet: string, isPage: boolean }

const { open, shortcut } = useSearchState()
const router = useRouter()
const config = useRuntimeConfig()
const query = ref('')
const active = ref(0)
const loading = ref(false)
const failed = ref(false)
let index: MiniSearch<Section> | null = null
const byId = new Map<string, Section>()

async function ensureIndex() {
  if (index || loading.value) return
  loading.value = true
  try {
    const sections = await $fetch<Section[]>('search.json', { baseURL: config.app.baseURL })
    index = new MiniSearch<Section>({
      fields: ['title', 'titles', 'content'],
      storeFields: ['title'],
      searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 4, titles: 2 }, combineWith: 'AND' },
      extractField: (doc, field) => (field === 'titles' ? doc.titles.join(' ') : (doc as unknown as Record<string, string>)[field] ?? ''),
    })
    index.addAll(sections)
    for (const s of sections) byId.set(s.id, s)
  }
  catch {
    failed.value = true
  }
  finally {
    loading.value = false
  }
}

function snippet(text: string, q: string) {
  const clean = text.replace(/\s+/g, ' ').trim()
  const term = q.trim().split(/\s+/)[0]?.toLowerCase() ?? ''
  const at = term ? clean.toLowerCase().indexOf(term) : -1
  const start = Math.max(0, at - 40)
  return (start > 0 ? '...' : '') + clean.slice(start, start + 120) + (clean.length > start + 120 ? '...' : '')
}

const results = computed<Hit[]>(() => {
  const q = query.value.trim()
  if (!index || !q) return []
  return index.search(q).slice(0, 20).map((r) => {
    const s = byId.get(r.id)!
    const [page = ''] = s.id.split('#')
    return {
      id: s.id,
      page,
      title: s.title,
      trail: s.titles.join(' > '),
      snippet: snippet(s.content, q),
      isPage: !s.id.includes('#'),
    }
  })
})

watch(query, () => (active.value = 0))
watch(open, async (v) => {
  if (v) {
    query.value = ''
    await ensureIndex()
  }
})

function go(hit: Hit) {
  open.value = false
  // Section ids are `/path#slug`; the router handles the hash.
  router.push(hit.id)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = Math.min(active.value + 1, results.value.length - 1)
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = Math.max(active.value - 1, 0)
  }
  else if (e.key === 'Enter' && results.value[active.value]) {
    e.preventDefault()
    go(results.value[active.value]!)
  }
}

watch(active, async () => {
  await nextTick()
  document.getElementById(`search-hit-${active.value}`)?.scrollIntoView({ block: 'nearest' })
})

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = !open.value
  }
}
onMounted(() => {
  shortcut.value = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'
  window.addEventListener('keydown', onGlobalKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <ElfDialog v-model:open="open">
    <ElfDialogContent :show-close-button="false" class="top-[12%] translate-y-0 gap-0 p-0 sm:max-w-xl sm:p-0" aria-describedby="search-description">
      <ElfDialogHeader class="sr-only">
        <ElfDialogTitle>Search documentation</ElfDialogTitle>
        <ElfDialogDescription id="search-description">
          Type to search. Use the arrow keys to move through results and Enter to open one.
        </ElfDialogDescription>
      </ElfDialogHeader>
      <div class="border-b p-3">
        <ElfInput
          v-model="query"
          role="combobox"
          aria-label="Search documentation"
          aria-controls="search-results"
          aria-autocomplete="list"
          :aria-expanded="results.length > 0"
          :aria-activedescendant="results.length ? `search-hit-${active}` : undefined"
          placeholder="Search components, guides, tokens..."
          autocomplete="off"
          spellcheck="false"
          class="border-0 shadow-none focus-visible:ring-0"
          @keydown="onKeydown"
        />
      </div>
      <ul id="search-results" role="listbox" aria-label="Results" class="max-h-[min(60dvh,26rem)] overflow-y-auto p-2">
        <li v-for="(hit, i) in results" :id="`search-hit-${i}`" :key="hit.id" role="option" :aria-selected="i === active">
          <button
            type="button"
            tabindex="-1"
            class="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm"
            :class="i === active ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/60'"
            @mousemove="active = i"
            @click="go(hit)"
          >
            <component :is="hit.isPage ? FileText : Hash" class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span class="min-w-0 flex-1">
              <span class="block truncate font-medium">{{ hit.title }}</span>
              <span v-if="hit.trail && !hit.isPage" class="block truncate text-xs text-muted-foreground">{{ hit.trail }}</span>
              <span class="block truncate text-xs text-muted-foreground">{{ hit.snippet }}</span>
            </span>
            <CornerDownLeft v-if="i === active" class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          </button>
        </li>
        <li v-if="query.trim() && !results.length && !loading" class="px-3 py-8 text-center text-sm text-muted-foreground" role="presentation">
          <template v-if="failed">
            Search is unavailable right now.
          </template>
          <template v-else>
            No results for "{{ query }}".
          </template>
        </li>
        <li v-else-if="!query.trim()" class="px-3 py-8 text-center text-sm text-muted-foreground" role="presentation">
          {{ loading ? 'Loading the index...' : 'Start typing to search.' }}
        </li>
      </ul>
      <div class="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
        <span>Up and down to move, Enter to open</span>
        <span>{{ shortcut }} to toggle</span>
      </div>
    </ElfDialogContent>
  </ElfDialog>
</template>
