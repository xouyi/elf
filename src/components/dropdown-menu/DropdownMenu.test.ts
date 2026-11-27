import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  menuItemVariants,
} from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function menu(children: () => unknown[], rootProps: Record<string, unknown> = { open: true }) {
  return mount({
    render: () => h(DropdownMenu, rootProps, () => [
      h(DropdownMenuTrigger, null, () => 'Menu'),
      h(DropdownMenuContent, null, children),
    ]),
  }, { attachTo: document.body })
}
const q = (sel: string) => document.body.querySelector<HTMLElement>(sel)

describe('DropdownMenu', () => {
  it('has a menu button trigger and renders a menu with data-slot parts in a portal', async () => {
    wrapper = menu(() => [
      h(DropdownMenuLabel, null, () => 'Account'),
      h(DropdownMenuItem, null, () => ['Profile', h(DropdownMenuShortcut, null, () => 'Ctrl P')]),
      h(DropdownMenuSeparator),
    ])
    await nextTick()
    const trigger = wrapper.get('[data-slot="dropdown-menu-trigger"]')
    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(q('[role="menu"]')!.getAttribute('data-slot')).toBe('dropdown-menu-content')
    expect(q('[data-slot="dropdown-menu-label"]')!.textContent).toBe('Account')
    expect(q('[role="menuitem"]')!.getAttribute('data-variant')).toBe('default')
    expect(q('[data-slot="dropdown-menu-shortcut"]')!.textContent).toBe('Ctrl P')
    expect(q('[data-slot="dropdown-menu-separator"]')).not.toBeNull()
  })

  it('marks destructive and inset items and merges classes', async () => {
    wrapper = menu(() => [
      h(DropdownMenuItem, { variant: 'destructive', class: 'font-bold' }, () => 'Delete'),
      h(DropdownMenuItem, { inset: true }, () => 'Indented'),
    ])
    await nextTick()
    const [del, inset] = [...document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')]
    expect(del!.getAttribute('data-variant')).toBe('destructive')
    expect(del!.className).toContain('text-destructive-text')
    expect(del!.classList.contains('font-bold')).toBe(true)
    expect(inset!.hasAttribute('data-inset')).toBe(true)
    expect(menuItemVariants({ variant: 'destructive' })).toContain('destructive')
  })

  it('renders checkbox and radio items with the right roles and checked state', async () => {
    wrapper = menu(() => [
      h(DropdownMenuCheckboxItem, { modelValue: true }, () => 'Status'),
      h(DropdownMenuRadioGroup, { modelValue: 'b' }, () => [
        h(DropdownMenuRadioItem, { value: 'a' }, () => 'A'),
        h(DropdownMenuRadioItem, { value: 'b' }, () => 'B'),
      ]),
    ])
    await nextTick()
    const box = q('[role="menuitemcheckbox"]')!
    expect(box.getAttribute('aria-checked')).toBe('true')
    const radios = [...document.body.querySelectorAll('[role="menuitemradio"]')]
    expect(radios.map(r => r.getAttribute('aria-checked'))).toEqual(['false', 'true'])
  })

  it('emits select when an item is activated and closes the menu', async () => {
    const selected: string[] = []
    const updates: boolean[] = []
    wrapper = menu(() => [h(DropdownMenuItem, { onSelect: () => selected.push('x') }, () => 'Go')], { 'open': true, 'onUpdate:open': (v: boolean) => updates.push(v) })
    await nextTick()
    q('[role="menuitem"]')!.click()
    await nextTick()
    expect(selected).toEqual(['x'])
    expect(updates).toEqual([false])
  })
})
