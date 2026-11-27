import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, sidebarMenuButtonVariants, useSidebar } from '.'

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  }))
}

const Harness = defineComponent({
  props: {
    collapsible: { type: String, default: 'icon' },
    defaultOpen: { type: Boolean, default: true },
    shortcut: { type: [String, Boolean], default: 'b' },
    storageKey: { type: String, default: undefined },
    open: { type: Boolean, default: undefined },
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    return () => h(SidebarProvider, {
      'defaultOpen': props.defaultOpen,
      'open': props.open,
      'shortcut': props.shortcut as string | false,
      'storageKey': props.storageKey,
      'onUpdate:open': (v: boolean) => emit('update:open', v),
    }, () => [
      h(Sidebar, { collapsible: props.collapsible as 'icon', label: 'Main' }, () => h(SidebarContent, null, () => h(SidebarGroup, null, () => [
        h(SidebarGroupLabel, null, () => 'Platform'),
        h(SidebarMenu, null, () => [
          h(SidebarMenuItem, null, () => h(SidebarMenuButton, { as: 'a', href: '/a', isActive: true, tooltip: 'Alpha' }, () => h('span', 'Alpha'))),
          h(SidebarMenuItem, null, () => h(SidebarMenuButton, { tooltip: 'Beta' }, () => h('span', 'Beta'))),
        ]),
      ]))),
      h(SidebarInset, null, () => [h(SidebarTrigger), h('input', { id: 'field' })]),
    ])
  },
})

let wrapper: ReturnType<typeof mount> | undefined
beforeEach(() => stubMatchMedia(false))
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
  localStorage.clear()
  vi.unstubAllGlobals()
})

const panel = () => document.querySelector<HTMLElement>('[data-slot="sidebar"]')!
async function mountHarness(props: Record<string, unknown> = {}) {
  wrapper = mount(Harness, { props, attachTo: document.body })
  await nextTick()
  return wrapper
}

describe('Sidebar (desktop)', () => {
  it('renders a labelled navigation landmark and marks the current page', async () => {
    await mountHarness()
    const nav = document.querySelector('nav')!
    expect(nav.getAttribute('aria-label')).toBe('Main')
    expect(nav.getAttribute('data-slot')).toBe('sidebar-panel')
    expect(document.querySelector('[data-slot="sidebar-menu"]')!.tagName).toBe('UL')
    expect(document.querySelector('[data-slot="sidebar-menu-item"]')!.tagName).toBe('LI')
    expect(document.querySelector('a[data-slot="sidebar-menu-button"]')!.getAttribute('aria-current')).toBe('page')
    expect(document.querySelector('a[data-slot="sidebar-menu-button"]')!.getAttribute('data-active')).toBe('true')
    expect(document.querySelectorAll('button[data-slot="sidebar-menu-button"]')[0]!.getAttribute('type')).toBe('button')
  })

  it('starts expanded and the trigger collapses and expands it', async () => {
    const w = await mountHarness()
    const trigger = document.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!
    expect(panel().dataset.state).toBe('expanded')
    expect(panel().dataset.collapsible).toBe('')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.textContent).toContain('Toggle sidebar')
    trigger.click()
    await nextTick()
    expect(panel().dataset.state).toBe('collapsed')
    expect(panel().dataset.collapsible).toBe('icon')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(w.emitted('update:open')!.at(-1)).toEqual([false])
    trigger.click()
    await nextTick()
    expect(panel().dataset.state).toBe('expanded')
  })

  it('honours defaultOpen=false and controlled open', async () => {
    const w = await mountHarness({ defaultOpen: false })
    expect(panel().dataset.state).toBe('collapsed')
    await w.setProps({ open: true })
    expect(panel().dataset.state).toBe('expanded')
  })

  it('collapsible="none" is never collapsed', async () => {
    await mountHarness({ collapsible: 'none', defaultOpen: false })
    expect(panel().dataset.collapsible).toBe('')
  })

  it('Ctrl+B and Cmd+B toggle it, except while typing or with the shortcut off', async () => {
    await mountHarness()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, cancelable: true }))
    await nextTick()
    expect(panel().dataset.state).toBe('collapsed')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'B', metaKey: true, cancelable: true }))
    await nextTick()
    expect(panel().dataset.state).toBe('expanded')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    await nextTick()
    expect(panel().dataset.state).toBe('expanded')
    document.querySelector<HTMLElement>('#field')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true }))
    await nextTick()
    expect(panel().dataset.state).toBe('expanded')
  })

  it('shortcut=false disables the shortcut and a custom key works', async () => {
    const w = await mountHarness({ shortcut: false })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, cancelable: true }))
    await nextTick()
    expect(panel().dataset.state).toBe('expanded')
    await w.setProps({ shortcut: 'e' })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', ctrlKey: true, cancelable: true }))
    await nextTick()
    expect(panel().dataset.state).toBe('collapsed')
  })

  it('remembers the state in localStorage when storageKey is set', async () => {
    localStorage.setItem('nav', 'false')
    await mountHarness({ storageKey: 'nav' })
    await nextTick()
    expect(panel().dataset.state).toBe('collapsed')
    document.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!.click()
    await nextTick()
    expect(localStorage.getItem('nav')).toBe('true')
  })

  it('does not persist without a storageKey', async () => {
    await mountHarness()
    document.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!.click()
    await nextTick()
    expect(localStorage.length).toBe(0)
  })

  it('sets the width tokens on the provider', async () => {
    await mountHarness()
    const style = document.querySelector<HTMLElement>('[data-slot="sidebar-provider"]')!.getAttribute('style')!
    expect(style).toContain('--sidebar-width: 16rem')
    expect(style).toContain('--sidebar-width-icon: 3rem')
  })

  it('menu button variants expose size and variant classes', () => {
    expect(sidebarMenuButtonVariants({ size: 'lg' })).toContain('h-12')
    expect(sidebarMenuButtonVariants({ variant: 'outline' })).toContain('border')
  })
})

describe('Sidebar (phone)', () => {
  beforeEach(() => stubMatchMedia(true))

  it('renders a sheet that opens from the trigger and closes after a link is chosen', async () => {
    await mountHarness()
    await nextTick()
    expect(document.querySelector('[data-slot="sidebar"]')).toBeNull()
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    const trigger = document.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    trigger.click()
    await nextTick()
    await nextTick()
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!
    expect(dialog.getAttribute('data-slot')).toBe('sidebar-sheet')
    expect(dialog.textContent).toContain('Alpha')
    expect(document.querySelector('[role="dialog"] nav')!.getAttribute('aria-label')).toBe('Main')
    expect(document.querySelector('#reka-dialog-title, [data-slot="sheet-title"]')!.textContent).toContain('Main')
    // Links close the sheet; buttons keep it open.
    document.querySelectorAll<HTMLElement>('button[data-slot="sidebar-menu-button"]')[0]!.click()
    await nextTick()
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    const link = document.querySelector<HTMLAnchorElement>('a[data-slot="sidebar-menu-button"]')!
    link.addEventListener('click', e => e.preventDefault())
    link.click()
    await nextTick()
    await nextTick()
    expect(document.querySelector('[role="dialog"][data-state="open"]')).toBeNull()
  })

  it('collapsible="none" stays a static column even on a phone', async () => {
    await mountHarness({ collapsible: 'none' })
    await nextTick()
    expect(document.querySelector('[data-slot="sidebar"]')).not.toBeNull()
  })
})

describe('useSidebar', () => {
  it('throws outside a provider', () => {
    const Bad = defineComponent(() => {
      useSidebar()
      return () => null
    })
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => mount(Bad)).toThrow('inside <ElfSidebarProvider>')
  })
})
