import { userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { axeViolations, examples, mountComponent, settle, setTheme, themes } from './support'

// Every example, in both themes, must render and be free of axe violations. Overlay examples (Dialog) are
// opened first so that the portalled content is checked too: dialogs, popovers and menus are clicked, context menus
// get a contextmenu event, tooltips and hover cards are focused.
let unmount: (() => void) | undefined
afterEach(() => {
  unmount?.()
  unmount = undefined
  document.body.removeAttribute('style')
})

describe.each(themes)('examples in the %s theme', (theme) => {
  it.each(examples.map(e => [e.id, e] as const))('%s renders without axe violations', async (_id, example) => {
    setTheme(theme)
    const mounted = await mountComponent(await example.load())
    unmount = mounted.unmount
    expect(mounted.el.children.length, 'the example rendered nothing').toBeGreaterThan(0)

    const trigger = mounted.el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')
    if (trigger) {
      await userEvent.click(trigger)
      await settle(150)
      expect(document.querySelector('[role="dialog"]'), 'trigger did not open the dialog').not.toBeNull()
    }

    // Menus open from a click on their button; context menus from a contextmenu event on their area.
    const menuButton = mounted.el.querySelector<HTMLElement>('[aria-haspopup="menu"]')
    if (menuButton) {
      await userEvent.click(menuButton)
      await settle(400) // let the open animation finish: axe would otherwise measure contrast on a translucent panel
      expect(document.querySelector('[role="menu"]'), 'button did not open the menu').not.toBeNull()
    }
    const contextArea = mounted.el.querySelector<HTMLElement>('[data-slot="context-menu-trigger"]')
    if (contextArea) {
      const box = contextArea.getBoundingClientRect()
      contextArea.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: box.left + 10, clientY: box.top + 10 }))
      await settle(400)
      expect(document.querySelector('[role="menu"]'), 'contextmenu did not open the menu').not.toBeNull()
    }

    // Hover cards and tooltips open on keyboard focus of their first trigger.
    const hint = mounted.el.querySelector<HTMLElement>('[data-slot="tooltip-trigger"], [data-slot="hover-card-trigger"]')
    if (hint) {
      hint.focus()
      await settle(hint.dataset.slot === 'hover-card-trigger' ? 1000 : 300) // hover cards open after their 700 ms delay
      expect(document.querySelector('[role="tooltip"], [data-slot="hover-card-content"]'), 'focus did not open the floating content').not.toBeNull()
    }

    expect(await axeViolations(document, { menuOpen: document.querySelector('[role="menu"]') !== null })).toEqual([])
  })
})

describe('themes', () => {
  it('apply different token values', () => {
    const read = () => getComputedStyle(document.documentElement).getPropertyValue('--elf-primary').trim()
    setTheme('elf')
    const elf = read()
    setTheme('novatron')
    const novatron = read()
    expect(elf).not.toBe('')
    expect(novatron).toBe('#ffcc00')
    expect(elf).not.toBe(novatron)
  })
})
