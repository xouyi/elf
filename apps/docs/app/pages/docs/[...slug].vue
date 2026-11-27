<script setup lang="ts">
import { Pencil } from '@lucide/vue'

const route = useRoute()
const site = useSite()
const path = route.path.replace(/\/$/, '')

const { data: page } = await useAsyncData(`page-${path}`, () => queryCollection('docs').path(path).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`surround-${path}`, () => queryCollectionItemSurroundings('docs', path, { fields: ['title', 'description'] }))
const { groups } = await useDocsNav()

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - ElfUI`,
  ogDescription: page.value.description,
})

// "Edit this page": generated pages point at the repository file they render (CHANGELOG.md, ...); the rest at the Markdown source.
const editUrl = computed(() => {
  const p = page.value as unknown as { editPath?: string, id: string }
  const file = p.editPath ?? `apps/docs/content/${p.id.replace(/^docs\//, '')}`
  return `${site.repo}/edit/main/${file}`
})
const toc = computed(() => (page.value?.body as { toc?: { links?: [] } } | undefined)?.toc?.links ?? [])
const links = computed(() => (page.value as unknown as { links?: { label: string, to: string }[] }).links ?? [])
</script>

<template>
  <div v-if="page" class="mx-auto grid w-full max-w-[90rem] gap-x-10 px-4 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_14rem]">
    <aside class="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 pr-2 lg:block" aria-label="Sidebar">
      <DocsSidebar :groups="groups" />
    </aside>

    <article class="min-w-0 py-8 lg:py-10">
      <nav aria-label="Breadcrumb" class="mb-4 text-xs text-muted-foreground">
        <NuxtLink to="/docs/getting-started/introduction" class="hover:text-foreground">
          Docs
        </NuxtLink>
        <span aria-hidden="true"> / </span>
        <span>{{ groups.find(g => route.path.startsWith(`${g.path}/`))?.title }}</span>
      </nav>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="mt-3 text-lg text-muted-foreground">
        {{ page.description }}
      </p>
      <p v-if="links.length" class="mt-4 flex flex-wrap gap-2">
        <ElfBadge v-for="l in links" :key="l.to" as-child variant="outline">
          <a :href="l.to" target="_blank" rel="noopener">{{ l.label }}</a>
        </ElfBadge>
      </p>
      <ContentRenderer :value="page" class="doc-content mt-8" />

      <div class="mt-12">
        <ElfButton as-child variant="ghost" size="sm" class="text-muted-foreground">
          <a :href="editUrl" target="_blank" rel="noopener"><Pencil /> Edit this page on GitHub</a>
        </ElfButton>
      </div>
      <DocsPager :prev="surround?.[0]" :next="surround?.[1]" />
    </article>

    <aside class="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto py-10 xl:block" aria-label="On this page">
      <DocsToc :key="route.path" :links="toc" />
    </aside>
  </div>
</template>
