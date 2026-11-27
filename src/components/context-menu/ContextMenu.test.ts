import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '.'
import { DropdownMenuItem } from '../dropdown-menu'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function menu(children: () => unknown[], rootProps: Record<string, unknown> = {}) {
  return mount({
    render: () => h(ContextMenu, rootProps, () => [
      h(ContextMenuTrigger, null, () => 'Area'),
      h(ContextMenuContent, null, children),
    ]),
  }, { attachTo: document.body })
}
const q = (sel: string) => document.body.querySelector<HTMLElement>(sel)

async function openByContextMenu(w: ReturnType<typeof mount>) {
  await w.get('[data-slot="context-menu-trigger"]').trigger('contextmenu', { clientX: 20, clientY: 20 })
  await new Promise(r => setTimeout(r, 30))
  await nextTick()
}

describe('ContextMenu', () => {
  it('is closed until a contextmenu event, then renders a menu in a portal', async () => {
    wrapper = menu(() => [
      h(ContextMenuLabel, null, () => 'Item'),
      h(ContextMenuItem, null, () => ['Open', h(ContextMenuShortcut, null, () => 'Enter')]),
      h(ContextMenuSeparator),
    ])
    expect(q('[role="menu"]')).toBeNull()
    await openByContextMenu(wrapper)
    expect(q('[role="menu"]')!.getAttribute('data-slot')).toBe('context-menu-content')
    expect(q('[data-slot="context-menu-label"]')!.textContent).toBe('Item')
    expect(q('[data-slot="context-menu-shortcut"]')!.textContent).toBe('Enter')
    expect(q('[data-slot="context-menu-separator"]')).not.toBeNull()
  })

  it('shares the item styles with DropdownMenu and supports destructive items', async () => {
    wrapper = menu(() => [h(ContextMenuItem, { variant: 'destructive' }, () => 'Delete')])
    await openByContextMenu(wrapper)
    const item = q('[role="menuitem"]')!
    expect(item.getAttribute('data-variant')).toBe('destructive')
    expect(item.className).toContain('text-destructive-text')
    expect(item.className).toContain('min-h-10')
    expect(DropdownMenuItem).toBeDefined()
  })

  it('renders checkbox and radio items with their checked state', async () => {
    wrapper = menu(() => [
      h(ContextMenuCheckboxItem, { modelValue: true }, () => 'Grid'),
      h(ContextMenuRadioGroup, { modelValue: 'a' }, () => [
        h(ContextMenuRadioItem, { value: 'a' }, () => 'A'),
        h(ContextMenuRadioItem, { value: 'b' }, () => 'B'),
      ]),
    ])
    await openByContextMenu(wrapper)
    expect(q('[role="menuitemcheckbox"]')!.getAttribute('aria-checked')).toBe('true')
    expect([...document.body.querySelectorAll('[role="menuitemradio"]')].map(r => r.getAttribute('aria-checked'))).toEqual(['true', 'false'])
  })

  it('emits select and closes when an item is activated', async () => {
    const selected: string[] = []
    const updates: boolean[] = []
    wrapper = menu(() => [h(ContextMenuItem, { onSelect: () => selected.push('x') }, () => 'Go')], { 'onUpdate:open': (v: boolean) => updates.push(v) })
    await openByContextMenu(wrapper)
    q('[role="menuitem"]')!.click()
    await new Promise(r => setTimeout(r, 50))
    expect(selected).toEqual(['x'])
    expect(updates).toEqual([true, false])
  })

  it('does not open when the trigger is disabled', async () => {
    wrapper = mount({
      render: () => h(ContextMenu, null, () => [
        h(ContextMenuTrigger, { disabled: true }, () => 'Area'),
        h(ContextMenuContent, null, () => h(ContextMenuItem, null, () => 'Go')),
      ]),
    }, { attachTo: document.body })
    await openByContextMenu(wrapper)
    expect(q('[role="menu"]')).toBeNull()
  })
})
