import { addToArrayProp, ensureDefaultImport, ensureVitePlugin, findConfigObject, insertProp, objectProps, propObjectOpen } from './edit'

export type PatchResult = { ok: true, src: string, changed: boolean } | { ok: false, reason: string }

const MODULE_RE = /['"]elfui\/nuxt['"]/

/**
 * Patches `export default defineNuxtConfig({ ... })`: adds the module, the `elfui` options and the Tailwind Vite plugin.
 * `css` is the stylesheet entry that already exists in the config, if any; otherwise `defaultCss` is added.
 */
export function patchNuxtConfig(input: string, opts: { theme: string, defaultCss: string }): PatchResult & { css?: string } {
  const unknown = (what: string) => ({ ok: false as const, reason: `${what} has a shape the CLI cannot edit safely` })
  if (findConfigObject(input, 'defineNuxtConfig') === -1) return unknown('nuxt.config (expected `export default defineNuxtConfig({ ... })`)')

  // Imports first: they shift offsets, and the Vite plugin call needs the local binding name.
  const imp = ensureDefaultImport(input, 'tailwindcss', '@tailwindcss/vite')
  let src = imp.src
  let changed = imp.changed
  const plugin = `${imp.local}()`
  const open = () => findConfigObject(src, 'defineNuxtConfig')

  const modulesProp = objectProps(src, open())?.props.find(p => p.key === 'modules')
  if (modulesProp) {
    const r = addToArrayProp(src, open(), 'modules', '\'elfui/nuxt\'', MODULE_RE)
    if (!r) return unknown('`modules`')
    src = r.src
    changed ||= r.changed
  }
  else {
    src = insertProp(src, open(), 'modules: [\'elfui/nuxt\']')
    changed = true
  }

  if (!objectProps(src, open())?.props.some(p => p.key === 'elfui')) {
    src = insertProp(src, open(), `elfui: { theme: '${opts.theme}' }`)
    changed = true
  }

  const viteOpen = propObjectOpen(src, open(), 'vite')
  if (viteOpen === -2) return unknown('`vite`')
  if (viteOpen === -1) {
    src = insertProp(src, open(), `vite: { plugins: [${plugin}] }`)
    changed = true
  }
  else {
    const r = ensureVitePlugin(src, viteOpen, plugin, new RegExp(`\\b${imp.local}\\s*\\(`))
    if (!r) return unknown('`vite.plugins`')
    src = r.src
    changed ||= r.changed
  }

  // Reuse a project stylesheet that is already registered, otherwise register the default one.
  const cssProp = objectProps(src, open())?.props.find(p => p.key === 'css')
  let css: string | undefined
  if (cssProp) {
    const entries = [...src.slice(cssProp.valueStart, cssProp.valueEnd).matchAll(/['"]([^'"]+\.css)['"]/g)].map(m => m[1]!)
    css = entries.find(e => /^(?:[~./]|@\/)/.test(e))
    if (!css) {
      const r = addToArrayProp(src, open(), 'css', `'${opts.defaultCss}'`, null)
      if (!r) return unknown('`css`')
      src = r.src
      changed = true
      css = opts.defaultCss
    }
  }
  else {
    src = insertProp(src, open(), `css: ['${opts.defaultCss}']`)
    changed = true
    css = opts.defaultCss
  }
  return { ok: true, src, changed, css }
}

/** Patches `export default defineConfig({ plugins: [...] })` of a Vite + Vue project. */
export function patchViteConfig(input: string): PatchResult {
  if (findConfigObject(input, 'defineConfig') === -1) {
    return { ok: false, reason: 'vite.config (expected `export default defineConfig({ ... })`) has a shape the CLI cannot edit safely' }
  }
  const imp = ensureDefaultImport(input, 'tailwindcss', '@tailwindcss/vite')
  const r = ensureVitePlugin(imp.src, findConfigObject(imp.src, 'defineConfig'), `${imp.local}()`, new RegExp(`\\b${imp.local}\\s*\\(`))
  if (!r) return { ok: false, reason: '`plugins` in vite.config is not an array literal' }
  return { ok: true, src: r.src, changed: imp.changed || r.changed }
}
