import type { Component } from 'vue'
import axe from 'axe-core'
import { createApp } from 'vue'

export type ThemeName = 'elf' | 'nova' | 'elfwood'
export const themes: ThemeName[] = ['elf', 'nova', 'elfwood']

export interface Example { id: string, dir: string, file: string, load: () => Promise<Component> }

/** Every `src/components/<dir>/examples/<File>.vue`, keyed like the docs site: `<dir>-<kebab-file>` (e.g. `button-with-icon`). */
export const examples: Example[] = Object.entries(
  import.meta.glob<{ default: Component }>('../../src/components/*/examples/*.vue'),
).map(([path, loader]) => {
  const [, dir, file] = path.match(/components\/([^/]+)\/examples\/([^/]+)\.vue$/)!
  return { id: `${dir}-${file!.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, dir: dir!, file: file!, load: async () => (await loader()).default }
}).sort((a, b) => a.id.localeCompare(b.id))

export function setTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme
}

/** Mounts a component into a fresh container on document.body and returns it with an unmount helper. */
export async function mountComponent(component: Component) {
  const el = document.createElement('div')
  el.id = 'example-root'
  document.body.append(el)
  const app = createApp(component)
  app.mount(el)
  await settle()
  return {
    el,
    unmount() {
      app.unmount()
      el.remove()
    },
  }
}

/** Waits for Vue to flush and for focus/transition callbacks scheduled by Reka UI to run. */
export async function settle(ms = 50) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

/** Runs axe over the whole document (portalled overlays included) and returns a readable list of violations. */
export async function axeViolations(context: Element | Document = document) {
  const result = await axe.run(context as axe.ElementContext, {
    resultTypes: ['violations'],
    // Examples are fragments, not pages: page-level structure rules do not apply to them.
    rules: { 'region': { enabled: false }, 'landmark-one-main': { enabled: false }, 'page-has-heading-one': { enabled: false } },
  })
  return result.violations.map(v => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map(n => `  ${n.target.join(' ')}\n  ${n.failureSummary?.replace(/\n/g, '\n  ')}`).join('\n')}`)
}
