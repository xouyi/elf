import { queryCollection } from '@nuxt/content/server'

export default eventHandler(async (event) => {
  const pages = await queryCollection(event, 'docs').select('path').all()
  const site = (useRuntimeConfig(event).public.site as string).replace(/\/$/, '')
  const paths = ['/', ...pages.map(p => p.path)]
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `  <url><loc>${site}${p === '/' ? '/' : p}</loc></url>`).join('\n')}\n</urlset>\n`
  setHeader(event, 'content-type', 'application/xml')
  return body
})
