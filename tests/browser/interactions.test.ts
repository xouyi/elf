import { ElfButton, ElfInput, ElfTabs, ElfTabsContent, ElfTabsList, ElfTabsTrigger } from '@elf/ui'
import { page, userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import VisuallyHiddenDefault from '../../src/components/visually-hidden/examples/Default.vue'
import VisuallyHiddenTable from '../../src/components/visually-hidden/examples/TableCaption.vue'
import LabelDefault from '../../src/components/label/examples/Default.vue'
import LabelDisabled from '../../src/components/label/examples/Disabled.vue'
import LabelWithCheckbox from '../../src/components/label/examples/WithCheckbox.vue'
import ButtonAsChild from '../../src/components/button/examples/AsChild.vue'
import DialogControlled from '../../src/components/dialog/examples/Controlled.vue'
import DialogDefault from '../../src/components/dialog/examples/Default.vue'
import TabsControlled from '../../src/components/tabs/examples/Controlled.vue'
import TabsDefault from '../../src/components/tabs/examples/Default.vue'
import { mountComponent, settle, setTheme, themes } from './support'

let unmount: (() => void) | undefined
afterEach(() => {
  unmount?.()
  unmount = undefined
  document.body.removeAttribute('style')
})

async function show(component: Parameters<typeof mountComponent>[0]) {
  const mounted = await mountComponent(component)
  unmount = mounted.unmount
  return mounted
}

describe.each(themes)('behavior in the %s theme', (theme) => {
  describe('Dialog', () => {
    it('moves focus into the dialog, traps Tab, closes on Escape and returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(DialogDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!
      await userEvent.click(trigger)
      await settle(150)

      const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!
      expect(dialog).not.toBeNull()
      expect(dialog.contains(document.activeElement), 'focus moved into the dialog').toBe(true)

      // Tab ten times: focus must never leave the dialog.
      for (let i = 0; i < 10; i++) {
        await userEvent.tab()
        expect(dialog.contains(document.activeElement), `focus stayed inside after Tab #${i + 1}`).toBe(true)
      }

      await userEvent.keyboard('{Escape}')
      await settle(150)
      expect(document.querySelector('[role="dialog"]')).toBeNull()
      expect(document.activeElement, 'focus returned to the trigger').toBe(trigger)
    })

    it('closes from a Cancel button and from the built-in close control', async () => {
      setTheme(theme)
      const { el } = await show(DialogDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!

      await userEvent.click(trigger)
      await settle(150)
      const cancel = [...document.querySelectorAll<HTMLElement>('[role="dialog"] button')].find(b => b.textContent?.trim() === 'Cancel')!
      await userEvent.click(cancel)
      await settle(150)
      expect(document.querySelector('[role="dialog"]')).toBeNull()

      await userEvent.click(trigger)
      await settle(150)
      await userEvent.click(document.querySelector<HTMLElement>('[role="dialog"] [data-slot="dialog-close"]')!)
      await settle(150)
      expect(document.querySelector('[role="dialog"]')).toBeNull()
    })

    it('v-model:open reflects the open state and hides the page behind from assistive tech', async () => {
      setTheme(theme)
      const { el } = await show(DialogControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(150)
      expect(document.querySelector('[role="dialog"]')).not.toBeNull()
      expect(el.textContent).toContain('open = true')
      expect(el.querySelector('button')!.closest('[aria-hidden="true"]'), 'content behind the modal is aria-hidden').not.toBeNull()
      await userEvent.keyboard('{Escape}')
      await settle(150)
      expect(el.textContent).toContain('open = false')
    })
  })

  describe('Tabs', () => {
    it('moves between tabs with the arrow keys, Home and End', async () => {
      setTheme(theme)
      const { el } = await show(TabsDefault)
      const tabs = () => [...el.querySelectorAll<HTMLElement>('[role="tab"]')]
      const selected = () => tabs().findIndex(t => t.getAttribute('aria-selected') === 'true')
      expect(selected()).toBe(0)

      tabs()[0]!.focus()
      await userEvent.keyboard('{ArrowRight}')
      await settle()
      expect(selected()).toBe(1)
      expect(document.activeElement).toBe(tabs()[1])
      expect(el.querySelector('[role="tabpanel"]:not([hidden])')).not.toBeNull()

      await userEvent.keyboard('{End}')
      await settle()
      expect(selected()).toBe(tabs().length - 1)
      await userEvent.keyboard('{Home}')
      await settle()
      expect(selected()).toBe(0)
    })

    it('with manual activation, arrows move focus and Enter selects', async () => {
      setTheme(theme)
      const { el } = await show(TabsControlled)
      const tabs = () => [...el.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')]
      const selected = () => tabs().findIndex(t => t.getAttribute('aria-selected') === 'true')
      const before = selected()
      tabs()[before]!.focus()
      await userEvent.keyboard('{ArrowRight}')
      await settle()
      expect(selected(), 'selection unchanged until activated').toBe(before)
      expect(document.activeElement).not.toBe(tabs()[before])
      await userEvent.keyboard('{Enter}')
      await settle()
      expect(selected()).not.toBe(before)
    })

    it('exposes tab and panel relationships', async () => {
      setTheme(theme)
      const { el } = await show(TabsDefault)
      for (const tab of el.querySelectorAll<HTMLElement>('[role="tab"][aria-selected="true"]')) {
        const panel = document.getElementById(tab.getAttribute('aria-controls')!)
        expect(panel?.getAttribute('role')).toBe('tabpanel')
        expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id)
      }
    })
  })

  describe('Button', () => {
    it('asChild renders the child element (a link) with button styling and no nested button', async () => {
      setTheme(theme)
      const { el } = await show(ButtonAsChild)
      const link = el.querySelector<HTMLAnchorElement>('a[href]')!
      expect(link).not.toBeNull()
      expect(el.querySelector('button')).toBeNull()
      expect(link.dataset.slot).toBe('button')
      expect(getComputedStyle(link).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      link.focus()
      expect(document.activeElement).toBe(link)
    })

    it('fires click on Enter and Space but not when disabled', async () => {
      setTheme(theme)
      let clicks = 0
      const App = defineComponent(() => () => h('div', [
        h(ElfButton, { onClick: () => clicks++ }, () => 'Go'),
        h(ElfButton, { disabled: true, onClick: () => (clicks += 100) }, () => 'Off'),
      ]))
      const { el } = await show(App)
      const [go, off] = el.querySelectorAll<HTMLButtonElement>('button') as unknown as HTMLButtonElement[]
      go!.focus()
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard(' ')
      expect(clicks).toBe(2)
      await userEvent.click(go!)
      expect(clicks).toBe(3)
      expect(off!.disabled).toBe(true)
      off!.click()
      expect(clicks).toBe(3)
    })

    it('shows a visible focus ring on keyboard focus', async () => {
      setTheme(theme)
      const App = defineComponent(() => () => h('div', [h(ElfButton, () => 'First'), h(ElfButton, () => 'Second')]))
      const { el } = await show(App)
      await userEvent.tab()
      const first = el.querySelector('button')!
      expect(document.activeElement).toBe(first)
      const style = getComputedStyle(first)
      expect(style.boxShadow !== 'none' || style.outlineStyle !== 'none', 'focus indicator is drawn').toBe(true)
    })
  })

  describe('Input', () => {
    it('v-model stays in sync while typing and when the model changes', async () => {
      setTheme(theme)
      const model = ref('')
      const App = defineComponent(() => () => h('div', [
        h(ElfInput, { 'modelValue': model.value, 'onUpdate:modelValue': (v: string | number) => (model.value = String(v)), 'aria-label': 'Name' }),
        h('output', { id: 'echo' }, model.value),
      ]))
      const { el } = await show(App)
      const input = el.querySelector('input')!
      await userEvent.click(input)
      await userEvent.keyboard('Ada')
      expect(input.value).toBe('Ada')
      expect(model.value).toBe('Ada')
      model.value = 'Grace'
      await settle()
      expect(input.value).toBe('Grace')
      expect(el.querySelector('#echo')!.textContent).toBe('Grace')
    })

    it('does not accept input while disabled and is skipped by Tab', async () => {
      setTheme(theme)
      const App = defineComponent(() => () => h('div', [
        h(ElfInput, { disabled: true, 'aria-label': 'Locked' }),
        h(ElfInput, { 'aria-label': 'Open' }),
      ]))
      const { el } = await show(App)
      const [locked, open] = el.querySelectorAll('input') as unknown as HTMLInputElement[]
      await userEvent.tab()
      expect(document.activeElement).toBe(open)
      expect(locked!.disabled).toBe(true)
    })
  })

  describe('VisuallyHidden', () => {
    it('is not visible but names its control and the table', async () => {
      setTheme(theme)
      const { el } = await show(VisuallyHiddenDefault)
      const hidden = el.querySelector<HTMLElement>('[data-slot="visually-hidden"]')!
      const rect = hidden.getBoundingClientRect()
      expect(rect.width).toBeLessThanOrEqual(1)
      expect(rect.height).toBeLessThanOrEqual(1)
      expect(hidden.textContent).toBe('Delete item')
      await expect.element(page.getByRole('button', { name: 'Delete item' })).toBeInTheDocument()
    })

    it('exposes a hidden caption as the table name', async () => {
      setTheme(theme)
      await show(VisuallyHiddenTable)
      await expect.element(page.getByRole('table', { name: 'Team roster with role and status' })).toBeInTheDocument()
    })
  })

  describe('Label', () => {
    it('focuses the control when the label is clicked and exposes the accessible name', async () => {
      setTheme(theme)
      const { el } = await show(LabelDefault)
      const input = el.querySelector('input')!
      await userEvent.click(el.querySelector('label')!)
      expect(document.activeElement).toBe(input)
      await expect.element(page.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
    })

    it('toggles a checkbox from its label', async () => {
      setTheme(theme)
      const { el } = await show(LabelWithCheckbox)
      const box = el.querySelector<HTMLInputElement>('input[type="checkbox"]')!
      expect(box.checked).toBe(false)
      await userEvent.click(el.querySelector('label')!)
      expect(box.checked).toBe(true)
    })

    it('dims the label when its peer control is disabled', async () => {
      setTheme(theme)
      const { el } = await show(LabelDisabled)
      expect(getComputedStyle(el.querySelector('label')!).opacity).toBe('0.5')
    })
  })

  // @@NEW-INTERACTIONS@@

  describe('Tabs fixture sanity', () => {
    it('supports an inline Tabs composition', async () => {
      setTheme(theme)
      const App = defineComponent(() => () => h(ElfTabs, { defaultValue: 'a' }, () => [
        h(ElfTabsList, { ariaLabel: 'Sections' }, () => [h(ElfTabsTrigger, { value: 'a' }, () => 'A'), h(ElfTabsTrigger, { value: 'b' }, () => 'B')]),
        h(ElfTabsContent, { value: 'a' }, () => 'Panel A'),
        h(ElfTabsContent, { value: 'b' }, () => 'Panel B'),
      ]))
      const { el } = await show(App)
      await userEvent.click([...el.querySelectorAll<HTMLElement>('[role="tab"]')][1]!)
      await settle()
      expect(el.textContent).toContain('Panel B')
      expect(el.textContent).not.toContain('Panel A')
    })
  })
})
