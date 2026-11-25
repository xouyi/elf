import { queryCollectionSearchSections } from '@nuxt/content/server'

// Prerendered to /search.json; the command dialog loads it on first use and searches it with MiniSearch.
export default eventHandler(async (event) => {
  return queryCollectionSearchSections(event, 'docs')
})
