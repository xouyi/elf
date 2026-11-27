import type { Component } from 'vue'
import axe from 'axe-core'
import { expect } from 'vitest'
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

/** Finite animations and transitions that are still moving: what axe contrast checks and layout reads must not race. */
function runningAnimations() {
  return document.getAnimations().filter(a => (a.playState === 'running' || a.pending) && a.effect?.getTiming().iterations !== Infinity)
}

/**
 * Resolves once every finite CSS animation and transition has finished and stayed finished for two frames. Open/close
 * animations are waited for as a real condition, so a slow or loaded machine can never leave a half-faded panel (a
 * translucent background fails axe contrast) or a still-sliding toast behind. Endless animations (spinners) are ignored.
 */
export async function animationsSettled() {
  await expect.poll(() => runningAnimations().length, { timeout: 10_000, message: 'animations did not finish' }).toBe(0)
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  await expect.poll(() => runningAnimations().length, { timeout: 10_000, message: 'animations restarted' }).toBe(0)
}

/**
 * Lets Vue flush and the focus/timer callbacks scheduled by Reka UI run (`ms` is a lower bound for timer driven
 * behaviour), then waits for running animations to finish. Prefer `expect.poll` on the condition you care about.
 */
export async function settle(ms = 50) {
  await new Promise(resolve => setTimeout(resolve, ms))
  await animationsSettled()
}

/** Runs axe over the whole document (portalled overlays included) and returns a readable list of violations. */
export async function axeViolations(context: Element | Document = document, options: { menuOpen?: boolean } = {}) {
  await animationsSettled() // axe samples colours: a fading panel is translucent and would fail contrast
  const result = await axe.run(context as axe.ElementContext, {
    resultTypes: ['violations'],
    // Examples are fragments, not pages: page-level structure rules do not apply to them.
    rules: {
      'region': { enabled: false },
      'landmark-one-main': { enabled: false },
      'page-has-heading-one': { enabled: false },
      // A modal menu hides the page behind it (aria-hidden) while Reka keeps Tab inside the menu, so the trigger cannot be
      // reached; axe only recognises role="dialog" modals and flags the hidden trigger. Skipped solely while a menu is open.
      'aria-hidden-focus': { enabled: !options.menuOpen },
    },
  })
  return result.violations.map(v => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map(n => `  ${n.target.join(' ')}\n  ${n.failureSummary?.replace(/\n/g, '\n  ')}`).join('\n')}`)
}
