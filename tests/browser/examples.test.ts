import { userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { axeViolations, examples, mountComponent, settle, setTheme, themes } from './support'

// Every example, in both themes, must render and be free of axe violations. Overlay examples (Dialog) are
// opened first so that the portalled content is checked too: an example whose root is a trigger is clicked.
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

    expect(await axeViolations()).toEqual([])
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
