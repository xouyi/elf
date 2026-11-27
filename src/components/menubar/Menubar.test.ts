import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function bar(children: () => unknown[], rootProps: Record<string, unknown> = { modelValue: 'file' }) {
  return mount({
    render: () => h(Menubar, rootProps, () => [
      h(MenubarMenu, { value: 'file' }, () => [
        h(MenubarTrigger, null, () => 'File'),
        h(MenubarContent, null, children),
      ]),
      h(MenubarMenu, { value: 'edit' }, () => h(MenubarTrigger, null, () => 'Edit')),
    ]),
  }, { attachTo: document.body })
}
const q = (sel: string) => document.body.querySelector<HTMLElement>(sel)

describe('Menubar', () => {
  it('renders a menubar of menu triggers and a menu with data-slot parts in a portal', async () => {
    wrapper = bar(() => [
      h(MenubarLabel, null, () => 'Document'),
      h(MenubarItem, null, () => ['Save', h(MenubarShortcut, null, () => 'Ctrl S')]),
      h(MenubarSeparator),
    ])
    await new Promise(r => setTimeout(r, 30))
    const root = wrapper.get('[data-slot="menubar"]')
    expect(root.attributes('role')).toBe('menubar')
    const [file, edit] = wrapper.findAll('[data-slot="menubar-trigger"]')
    expect(file!.attributes('role')).toBe('menuitem')
    expect(file!.attributes('aria-haspopup')).toBe('menu')
    expect(file!.attributes('aria-expanded')).toBe('true')
    expect(edit!.attributes('aria-expanded')).toBe('false')
    expect(q('[role="menu"]')!.getAttribute('data-slot')).toBe('menubar-content')
    expect(q('[data-slot="menubar-label"]')!.textContent).toBe('Document')
    expect(q('[data-slot="menubar-item"]')!.getAttribute('data-variant')).toBe('default')
    expect(q('[data-slot="menubar-shortcut"]')!.textContent).toBe('Ctrl S')
    expect(q('[data-slot="menubar-separator"]')).not.toBeNull()
  })

  it('shares the item styles with the dropdown menu and marks destructive and inset items', async () => {
    wrapper = bar(() => [
      h(MenubarItem, { variant: 'destructive', class: 'font-bold' }, () => 'Delete'),
      h(MenubarItem, { inset: true }, () => 'Indented'),
    ])
    await new Promise(r => setTimeout(r, 30))
    const [del, inset] = [...document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')].filter(e => e.dataset.slot === 'menubar-item')
    expect(del!.dataset.variant).toBe('destructive')
    expect(del!.className).toContain('text-destructive-text')
    expect(del!.className).toContain('font-bold')
    expect(del!.className).toContain('min-h-10')
    expect(inset!.hasAttribute('data-inset')).toBe(true)
  })

  it('renders checkbox and radio items with their roles and checked state', async () => {
    wrapper = bar(() => [
      h(MenubarCheckboxItem, { modelValue: true }, () => 'Preview'),
      h(MenubarRadioGroup, { modelValue: 'a' }, () => [
        h(MenubarRadioItem, { value: 'a' }, () => 'A'),
        h(MenubarRadioItem, { value: 'b' }, () => 'B'),
      ]),
    ])
    await new Promise(r => setTimeout(r, 30))
    expect(q('[role="menuitemcheckbox"]')!.getAttribute('aria-checked')).toBe('true')
    const radios = [...document.body.querySelectorAll('[role="menuitemradio"]')]
    expect(radios.map(r => r.getAttribute('aria-checked'))).toEqual(['true', 'false'])
  })

  it('merges classes on the bar and trigger', async () => {
    wrapper = mount({ render: () => h(Menubar, { class: 'custom' }, () => h(MenubarMenu, null, () => h(MenubarTrigger, { class: 'px-6' }, () => 'File'))) }, { attachTo: document.body })
    await nextTick()
    expect(wrapper.get('[data-slot="menubar"]').classes()).toContain('custom')
    expect(wrapper.get('[data-slot="menubar-trigger"]').classes()).toContain('px-6')
  })
})
