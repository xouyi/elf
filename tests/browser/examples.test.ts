import { userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { axeViolations, examples, mountComponent, setTheme, themes } from './support'

// Every example, in every theme, must render and be free of axe violations. Overlay examples are opened first so
// that the portalled content is checked too: dialogs, popovers and menus are clicked, context menus get a contextmenu
// event, tooltips and hover cards are focused.
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
      await expect.poll(() => document.querySelector('[role="dialog"], [role="alertdialog"]'), { message: 'trigger did not open the dialog' }).not.toBeNull()
    }

    // Menus open from a click on their button; context menus from a contextmenu event on their area.
    const menuButton = mounted.el.querySelector<HTMLElement>('[aria-haspopup="menu"]')
    if (menuButton) {
      await userEvent.click(menuButton)
      await expect.poll(() => document.querySelector('[role="menu"]'), { message: 'button did not open the menu' }).not.toBeNull()
    }
    // Navigation menus open their first flyout from a click on its trigger.
    const navTrigger = mounted.el.querySelector<HTMLElement>('[data-slot="navigation-menu-trigger"]')
    if (navTrigger) {
      await userEvent.click(navTrigger)
      await expect.poll(() => document.querySelector('[data-slot="navigation-menu-content"]'), { message: 'trigger did not open the flyout' }).not.toBeNull()
    }
    const contextArea = mounted.el.querySelector<HTMLElement>('[data-slot="context-menu-trigger"]')
    if (contextArea) {
      const box = contextArea.getBoundingClientRect()
      contextArea.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: box.left + 10, clientY: box.top + 10 }))
      await expect.poll(() => document.querySelector('[role="menu"]'), { message: 'contextmenu did not open the menu' }).not.toBeNull()
    }

    // Hover cards and tooltips open on keyboard focus of their first trigger.
    const hint = mounted.el.querySelector<HTMLElement>('[data-slot="tooltip-trigger"], [data-slot="hover-card-trigger"]')
    if (hint) {
      hint.focus()
      // Hover cards open after their 700 ms delay: poll for the content instead of sleeping.
      await expect.poll(() => document.querySelector('[role="tooltip"], [data-slot="hover-card-content"]'), { message: 'focus did not open the floating content' }).not.toBeNull()
    }

    // axeViolations waits for open/close animations to finish before it samples any colour.
    expect(await axeViolations(document, { menuOpen: document.querySelector('[role="menu"]') !== null })).toEqual([])
  })
})

describe('themes', () => {
  it('apply different token values', () => {
    const read = () => getComputedStyle(document.documentElement).getPropertyValue('--elf-primary').trim()
    setTheme('elf')
    const elf = read()
    setTheme('nova')
    const nova = read()
    expect(elf).not.toBe('')
    expect(nova).toBe('#ffcc00')
    expect(elf).not.toBe(nova)
  })
})
