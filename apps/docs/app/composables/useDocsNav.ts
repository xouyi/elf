export interface NavLink { title: string, path: string }
export interface NavGroup { title: string, path: string, items: NavLink[] }

const groupTitles: Record<string, string> = {
  'getting-started': 'Getting started',
  'components': 'Components',
  'resources': 'Resources',
}

/** Sidebar structure: one group per directory below /docs, items in file-prefix order (1.xxx, 2.xxx). */
export async function useDocsNav() {
  const { data } = await useAsyncData('docs-nav', () => queryCollection('docs').select('path', 'title', 'stem').order('stem', 'ASC').all())
  const groups = computed<NavGroup[]>(() => {
    const map = new Map<string, NavGroup>()
    for (const page of data.value ?? []) {
      const segment = page.path.split('/')[2]
      if (!segment) continue
      if (!map.has(segment)) map.set(segment, { title: groupTitles[segment] ?? segment, path: `/docs/${segment}`, items: [] })
      map.get(segment)!.items.push({ title: page.title, path: page.path })
    }
    return [...map.values()]
  })
  return { groups }
}
