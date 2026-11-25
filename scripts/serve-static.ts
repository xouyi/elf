/**
 * Minimal static file server (Bun): `bun scripts/serve-static.ts <dir> <port> [base]`.
 * `base` mimics a sub-path deployment such as GitHub Pages (`/elfUI/`): requests outside it return 404 and
 * the prefix is stripped before the file lookup. Unknown paths inside the base serve `404.html` when present.
 */
import { join, normalize } from 'node:path'

const dir = normalize(join(import.meta.dirname, '..', process.argv[2] ?? 'apps/docs/.output/public'))
const port = Number(process.argv[3] ?? 4173)
const base = (process.argv[4] ?? '/').replace(/\/?$/, '/')

Bun.serve({
  port,
  hostname: '127.0.0.1',
  async fetch(req) {
    const url = new URL(req.url)
    let path = decodeURIComponent(url.pathname)
    if (path === base.slice(0, -1)) return Response.redirect(`${url.origin}${base}`, 308)
    if (!path.startsWith(base)) return new Response('Not found', { status: 404 })
    path = `/${path.slice(base.length)}`
    if (path.endsWith('/')) path += 'index.html'
    const candidates = [path, `${path}.html`, `${path}/index.html`]
    for (const c of candidates) {
      const full = normalize(join(dir, c))
      if (!full.startsWith(dir)) continue
      const file = Bun.file(full)
      const stat = await file.stat().catch(() => null)
      if (stat?.isFile()) return new Response(file)
    }
    const notFound = Bun.file(join(dir, '404.html'))
    return (await notFound.exists()) ? new Response(notFound, { status: 404 }) : new Response('Not found', { status: 404 })
  },
})
console.log(`Serving ${dir} on http://127.0.0.1:${port}${base}`)
