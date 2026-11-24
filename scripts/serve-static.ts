/** Minimal static file server (Bun) used by the visual tests: `bun scripts/serve-static.ts <dir> <port>`. */
import { join, normalize } from 'node:path'

const dir = join(import.meta.dirname, '..', process.argv[2] ?? 'storybook-static')
const port = Number(process.argv[3] ?? 6007)

Bun.serve({
  port,
  hostname: '127.0.0.1',
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname)
    if (path.endsWith('/')) path += 'index.html'
    const file = Bun.file(normalize(join(dir, path)))
    if (!normalize(join(dir, path)).startsWith(dir) || !(await file.exists())) return new Response('Not found', { status: 404 })
    return new Response(file)
  },
})
console.log(`Serving ${dir} on http://127.0.0.1:${port}`)
