import { page, userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import SidebarCollapsibleGroups from '../../src/components/sidebar/examples/CollapsibleGroups.vue'
import SidebarControlled from '../../src/components/sidebar/examples/Controlled.vue'
import SidebarDefault from '../../src/components/sidebar/examples/Default.vue'
import SidebarOffcanvas from '../../src/components/sidebar/examples/Offcanvas.vue'
import SidebarVariants from '../../src/components/sidebar/examples/Variants.vue'
import { axeViolations, mountComponent, settle, setTheme, themes } from './support'

// ElfSidebar: desktop (collapse to icons, tooltips, shortcut, tab order) and a 360px phone (off-canvas sheet).
let unmount: (() => void) | undefined
afterEach(async () => {
  unmount?.()
  unmount = undefined
  document.body.removeAttribute('style')
  localStorage.clear()
  await page.viewport(1280, 800)
})

async function show(component: Parameters<typeof mountComponent>[0]) {
  const mounted = await mountComponent(component)
  unmount = mounted.unmount
  return mounted
}

const panel = () => document.querySelector<HTMLElement>('[data-slot="sidebar"]')!
const sheet = () => document.querySelector<HTMLElement>('[data-slot="sidebar-sheet"]')
const trigger = () => document.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!
const tooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]')

describe.each(themes)('Sidebar in the %s theme', (theme) => {
  describe('on a desktop', () => {
    it('collapses to an icon rail and expands again from the trigger', async () => {
      setTheme(theme)
      await show(SidebarDefault)
      expect(Math.round(panel().getBoundingClientRect().width)).toBe(256)
      expect(trigger().getAttribute('aria-expanded')).toBe('true')
      await userEvent.click(trigger())
      await settle(400)
      expect(panel().dataset.state).toBe('collapsed')
      expect(panel().dataset.collapsible).toBe('icon')
      expect(Math.round(panel().getBoundingClientRect().width)).toBe(48)
      expect(trigger().getAttribute('aria-expanded')).toBe('false')
      // The accessible names survive while only icons are visible.
      await expect.element(page.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
      await userEvent.click(trigger())
      await settle(400)
      expect(Math.round(panel().getBoundingClientRect().width)).toBe(256)
    })

    it('Ctrl+B toggles the sidebar', async () => {
      setTheme(theme)
      await show(SidebarDefault)
      await userEvent.keyboard('{Control>}b{/Control}')
      await settle(300)
      expect(panel().dataset.state).toBe('collapsed')
      await userEvent.keyboard('{Control>}b{/Control}')
      await settle(300)
      expect(panel().dataset.state).toBe('expanded')
    })

    it('shows a tooltip for the focused icon only while collapsed', async () => {
      setTheme(theme)
      await show(SidebarDefault)
      const link = () => [...document.querySelectorAll<HTMLElement>('[data-slot="sidebar-menu-button"]')].find(b => b.textContent?.includes('Team'))!
      link().focus()
      await settle(300)
      expect(tooltip(), 'no tooltip while expanded').toBeNull()
      link().blur()
      await userEvent.click(trigger())
      await settle(400)
      link().focus()
      await settle(300)
      expect(tooltip()?.textContent?.trim()).toBe('Team')
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(tooltip()).toBeNull()
    })

    it('keeps the current page marked and updates it on selection', async () => {
      setTheme(theme)
      await show(SidebarDefault)
      const current = () => document.querySelector('[aria-current="page"]')!.textContent?.trim()
      expect(current()).toBe('Dashboard')
      await userEvent.click(page.getByRole('link', { name: 'Team' }).element())
      expect(current()).toBe('Team')
    })

    it('tabs through the links in order and the offcanvas sidebar leaves the tab order when closed', async () => {
      setTheme(theme)
      const { el } = await show(SidebarOffcanvas)
      const panelEl = panel()
      expect(panelEl.dataset.state).toBe('collapsed')
      expect(getComputedStyle(document.querySelector('[data-slot="sidebar-panel"]')!).visibility).toBe('hidden')
      const focusable = el.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]')!
      focusable.focus()
      await userEvent.tab()
      expect(document.activeElement?.closest('[data-slot="sidebar-panel"]'), 'focus did not enter the closed sidebar').toBeNull()
      await userEvent.click(focusable)
      await settle(400)
      expect(getComputedStyle(document.querySelector('[data-slot="sidebar-panel"]')!).visibility).toBe('visible')
      expect(Math.round(panel().getBoundingClientRect().width)).toBe(256)
      const names: string[] = []
      document.querySelector<HTMLElement>('[data-slot="sidebar-panel"] a')!.focus()
      for (let i = 0; i < 3; i++) {
        names.push(document.activeElement!.textContent!.trim())
        await userEvent.tab()
      }
      expect(names).toEqual(['Dashboard', 'Inbox', 'Settings'])
    })

    it('v-model:open is controlled from outside and restored from localStorage', async () => {
      setTheme(theme)
      localStorage.setItem('elfui-sidebar-example', 'false')
      const { el } = await show(SidebarControlled)
      await settle(300)
      expect(el.textContent).toContain('open = false')
      expect(panel().dataset.state).toBe('collapsed')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(300)
      expect(panel().dataset.state).toBe('expanded')
      expect(localStorage.getItem('elfui-sidebar-example')).toBe('true')
    })

    it('floating, inset and right variants lay out without overflowing', async () => {
      setTheme(theme)
      const { el } = await show(SidebarVariants)
      for (const variant of ['sidebar', 'floating', 'inset']) {
        for (const side of ['left', 'right']) {
          await userEvent.click([...el.querySelectorAll<HTMLElement>('button')].find(b => b.textContent?.trim() === variant)!)
          await userEvent.click([...el.querySelectorAll<HTMLElement>('button')].find(b => b.textContent?.trim() === side)!)
          await settle(100)
          const host = document.querySelector<HTMLElement>('[data-slot="sidebar-provider"]')!.getBoundingClientRect()
          const rect = panel().getBoundingClientRect()
          expect(panel().dataset.variant).toBe(variant)
          expect(panel().dataset.side).toBe(side)
          expect(rect.left >= host.left - 1 && rect.right <= host.right + 1, `${variant} ${side} stays inside the provider`).toBe(true)
          if (side === 'right')
            expect(Math.round(host.right - rect.right)).toBeLessThanOrEqual(1)
          else
            expect(Math.round(rect.left - host.left)).toBeLessThanOrEqual(1)
        }
      }
    })

    it('a collapsible sub menu toggles with the keyboard', async () => {
      setTheme(theme)
      await show(SidebarCollapsibleGroups)
      const button = [...document.querySelectorAll<HTMLElement>('[data-slot="sidebar-menu-button"]')].find(b => b.textContent?.includes('All projects'))!
      expect(button.getAttribute('aria-expanded')).toBe('false')
      button.focus()
      await userEvent.keyboard('{Enter}')
      await settle(300)
      expect(button.getAttribute('aria-expanded')).toBe('true')
      expect(document.querySelector('[data-slot="sidebar-menu-sub"]')!.textContent).toContain('Vision')
      expect(await axeViolations(document)).toEqual([])
    })
  })

  describe('on a 360px phone', () => {
    it('renders no sidebar column and opens an off-canvas sheet from the trigger', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      await show(SidebarDefault)
      await settle(100)
      expect(document.querySelector('[data-slot="sidebar"]')).toBeNull()
      expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(document.documentElement.clientWidth)
      expect(trigger().getAttribute('aria-haspopup')).toBe('dialog')
      await userEvent.click(trigger())
      await settle(400)
      const dialog = sheet()!
      expect(dialog.getAttribute('role')).toBe('dialog')
      const rect = dialog.getBoundingClientRect()
      expect(rect.left).toBe(0)
      expect(Math.round(rect.width), 'leaves a strip of the page visible').toBe(288)
      expect(dialog.contains(document.activeElement), 'focus moved into the sheet').toBe(true)
      await expect.element(page.getByRole('dialog', { name: 'Main navigation' })).toBeInTheDocument()
      expect(await axeViolations(document)).toEqual([])
    })

    it('traps focus, closes on Escape and returns focus to the trigger', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      await show(SidebarDefault)
      await settle(100)
      await userEvent.click(trigger())
      await settle(400)
      for (let i = 0; i < 8; i++) {
        await userEvent.tab()
        expect(sheet()!.contains(document.activeElement), `focus stayed inside after Tab #${i + 1}`).toBe(true)
      }
      await userEvent.keyboard('{Escape}')
      await settle(300)
      expect(sheet()).toBeNull()
      expect(document.activeElement).toBe(trigger())
    })

    it('closes from the backdrop and after a link is chosen, and shows full labels (no tooltips)', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      await show(SidebarDefault)
      await settle(100)
      await userEvent.click(trigger())
      await settle(400)
      // Even though the desktop sidebar is an icon rail, the sheet always shows the labels.
      const label = sheet()!.querySelector<HTMLElement>('[data-slot="sidebar-menu-button"] span:last-child')!
      expect(label.getBoundingClientRect().width).toBeGreaterThan(20)
      await userEvent.click(document.querySelector<HTMLElement>('[data-slot="sheet-overlay"]')!, { position: { x: 340, y: 20 } })
      await settle(300)
      expect(sheet()).toBeNull()

      await userEvent.click(trigger())
      await settle(400)
      await userEvent.click(page.getByRole('link', { name: 'Team' }).element())
      await settle(300)
      expect(sheet()).toBeNull()
      expect(document.querySelector('h2')!.textContent).toBe('Team')
    })

    it('menu rows are at least 40px tall for touch', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      await show(SidebarDefault)
      await settle(100)
      await userEvent.click(trigger())
      await settle(400)
      const rows = [...sheet()!.querySelectorAll<HTMLElement>('[data-slot="sidebar-menu-button"]')]
      expect(rows.length).toBeGreaterThan(3)
      for (const row of rows)
        expect(row.getBoundingClientRect().height).toBeGreaterThanOrEqual(40)
      expect(trigger().getBoundingClientRect().width).toBeGreaterThanOrEqual(40)
    })

    it('Ctrl+B opens the sheet and the other examples also fit 360px', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      const { el } = await show(SidebarCollapsibleGroups)
      await settle(100)
      await userEvent.keyboard('{Control>}b{/Control}')
      await settle(400)
      expect(sheet()).not.toBeNull()
      expect(await axeViolations(document)).toEqual([])
      await userEvent.keyboard('{Escape}')
      await settle(300)
      expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(document.documentElement.clientWidth)
      expect(el.querySelector('[data-slot="sidebar-provider"]')).not.toBeNull()
    })

    it('resizing back to a desktop closes the sheet and shows the column', async () => {
      setTheme(theme)
      await page.viewport(360, 740)
      await show(SidebarDefault)
      await settle(100)
      await userEvent.click(trigger())
      await settle(400)
      await page.viewport(1280, 800)
      await settle(400)
      expect(sheet()).toBeNull()
      expect(document.querySelector('[data-slot="sidebar"]')).not.toBeNull()
    })
  })
})
