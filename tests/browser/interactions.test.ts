import { ElfButton, ElfInput, ElfTabs, ElfTabsContent, ElfTabsList, ElfTabsTrigger } from '@xouyi/elfui'
import { page, userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import VisuallyHiddenDefault from '../../src/components/visually-hidden/examples/Default.vue'
import VisuallyHiddenTable from '../../src/components/visually-hidden/examples/TableCaption.vue'
import LabelDefault from '../../src/components/label/examples/Default.vue'
import LabelDisabled from '../../src/components/label/examples/Disabled.vue'
import LabelWithCheckbox from '../../src/components/label/examples/WithCheckbox.vue'
import SeparatorDefault from '../../src/components/separator/examples/Default.vue'
import SeparatorSemantic from '../../src/components/separator/examples/Semantic.vue'
import SeparatorVertical from '../../src/components/separator/examples/Vertical.vue'
import KbdGroupExample from '../../src/components/kbd/examples/Group.vue'
import KbdWithIcons from '../../src/components/kbd/examples/WithIcons.vue'
import SpinnerInButton from '../../src/components/spinner/examples/InButton.vue'
import SpinnerSizes from '../../src/components/spinner/examples/Sizes.vue'
import SkeletonLoadingState from '../../src/components/skeleton/examples/LoadingState.vue'
import TextareaAutoResize from '../../src/components/textarea/examples/AutoResize.vue'
import TextareaCharacterCount from '../../src/components/textarea/examples/CharacterCount.vue'
import TextareaInvalid from '../../src/components/textarea/examples/Invalid.vue'
import FieldHorizontal from '../../src/components/field/examples/Horizontal.vue'
import FieldValidation from '../../src/components/field/examples/Validation.vue'
import CheckboxDefault from '../../src/components/checkbox/examples/Default.vue'
import CheckboxDisabled from '../../src/components/checkbox/examples/Disabled.vue'
import CheckboxIndeterminate from '../../src/components/checkbox/examples/Indeterminate.vue'
import CheckboxWithField from '../../src/components/checkbox/examples/WithField.vue'
import RadioGroupDefault from '../../src/components/radio-group/examples/Default.vue'
import RadioGroupDisabled from '../../src/components/radio-group/examples/Disabled.vue'
import RadioGroupHorizontal from '../../src/components/radio-group/examples/Horizontal.vue'
import RadioGroupWithField from '../../src/components/radio-group/examples/WithField.vue'
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

  describe('Separator', () => {
    it('draws a 1px line in the border color in both orientations', async () => {
      setTheme(theme)
      const horizontal = (await show(SeparatorDefault)).el.querySelector<HTMLElement>('[data-slot="separator"]')!
      const h = horizontal.getBoundingClientRect()
      expect(h.height).toBe(1)
      expect(h.width).toBeGreaterThan(100)
      expect(getComputedStyle(horizontal).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      unmount?.()
      const vertical = (await show(SeparatorVertical)).el.querySelector<HTMLElement>('[data-slot="separator"]')!
      const v = vertical.getBoundingClientRect()
      expect(v.width).toBe(1)
      expect(v.height).toBeGreaterThan(10)
    })

    it('is ignored by assistive technology unless it is marked as meaningful', async () => {
      setTheme(theme)
      await show(SeparatorSemantic)
      await expect.element(page.getByRole('separator')).toBeInTheDocument()
      unmount?.()
      await show(SeparatorDefault)
      expect(document.querySelector('[role="separator"]')).toBeNull()
    })
  })

  describe('Kbd', () => {
    it('is not focusable or selectable and keeps the keys of a group inline', async () => {
      setTheme(theme)
      const { el } = await show(KbdGroupExample)
      const group = el.querySelector<HTMLElement>('[data-slot="kbd-group"]')!
      const keys = [...group.querySelectorAll<HTMLElement>('[data-slot="kbd"]')]
      expect(keys.map(k => k.textContent)).toEqual(['Ctrl', 'K'])
      expect(getComputedStyle(group).display).toBe('inline-flex')
      expect(getComputedStyle(keys[0]!).pointerEvents).toBe('none')
      await userEvent.tab()
      expect(group.contains(document.activeElement)).toBe(false)
    })

    it('names icon-only keys through hidden text', async () => {
      setTheme(theme)
      await show(KbdWithIcons)
      await expect.element(page.getByText('Arrow up')).toBeInTheDocument()
      await expect.element(page.getByText('Enter')).toBeInTheDocument()
    })
  })

  describe('Spinner', () => {
    it('exposes each label as hidden text in a status region and renders the sizes', async () => {
      setTheme(theme)
      const { el } = await show(SpinnerSizes)
      expect([...el.querySelectorAll('[role="status"]')].map(s => s.textContent)).toEqual(['Loading, small', 'Loading, default', 'Loading, large', 'Loading, extra large'])
      await expect.element(page.getByText('Loading, small')).toBeInTheDocument()
      const widths = [...el.querySelectorAll<HTMLElement>('[data-slot="spinner"]')].map(s => s.getBoundingClientRect().width)
      expect(widths).toEqual([12, 16, 24, 32])
    })

    it('shows the spinner and disables the button while busy, then restores it', async () => {
      setTheme(theme)
      const { el } = await show(SpinnerInButton)
      const button = el.querySelector<HTMLButtonElement>('button')!
      expect(button.querySelector('[role="status"]')).toBeNull()
      await userEvent.click(button)
      await settle()
      expect(button.disabled).toBe(true)
      expect(button.getAttribute('aria-busy')).toBe('true')
      expect(button.querySelector('[role="status"]')?.textContent).toBe('Saving changes')
      await settle(1700)
      expect(button.disabled).toBe(false)
      expect(button.querySelector('[role="status"]')).toBeNull()
    })
  })

  describe('Skeleton', () => {
    it('is hidden from assistive technology and drops its animation under reduced motion', async () => {
      setTheme(theme)
      const { el } = await show(SkeletonLoadingState)
      const skeleton = el.querySelector<HTMLElement>('[data-slot="skeleton"]')!
      expect(skeleton.getAttribute('aria-hidden')).toBe('true')
      expect(getComputedStyle(skeleton).animationName).toBe('pulse')
      expect(getComputedStyle(skeleton).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(el.querySelector('[role="status"]')?.textContent?.trim()).toBe('Loading profile')
    })

    it('swaps to the real content and clears aria-busy', async () => {
      setTheme(theme)
      const { el } = await show(SkeletonLoadingState)
      const region = el.querySelector<HTMLElement>('[aria-busy]')!
      expect(region.getAttribute('aria-busy')).toBe('true')
      await userEvent.click(el.querySelector('button')!)
      await settle()
      expect(region.getAttribute('aria-busy')).toBe('false')
      expect(el.querySelector('[data-slot="skeleton"]')).toBeNull()
      expect(region.textContent).toContain('Ayşe Demir')
    })
  })

  describe('Textarea', () => {
    it('auto-resize grows with new lines up to max-h, then scrolls, and shrinks again', async () => {
      setTheme(theme)
      const { el } = await show(TextareaAutoResize)
      const area = el.querySelector('textarea')!
      const initial = area.getBoundingClientRect().height
      expect(area.scrollHeight, 'initial content fits without scrolling').toBeLessThanOrEqual(area.clientHeight)

      await userEvent.click(area)
      await userEvent.keyboard('{Control>}{End}{/Control}{Enter}Line three{Enter}Line four')
      await settle()
      const grown = area.getBoundingClientRect().height
      expect(grown).toBeGreaterThan(initial)

      for (let i = 0; i < 20; i++)
        await userEvent.keyboard('{Enter}more')
      await settle()
      const capped = area.getBoundingClientRect().height
      expect(capped, 'capped at max-h-48 (192px)').toBeLessThanOrEqual(192)
      expect(area.scrollHeight).toBeGreaterThan(area.clientHeight)

      await userEvent.clear(area)
      await settle()
      expect(area.getBoundingClientRect().height).toBeLessThan(grown)
    })

    it('keeps v-model in sync, treats Enter as a new line and enforces maxlength', async () => {
      setTheme(theme)
      const { el } = await show(TextareaCharacterCount)
      const area = el.querySelector('textarea')!
      await userEvent.click(area)
      await userEvent.keyboard('Hi{Enter}there')
      expect(area.value).toBe('Hi\nthere')
      expect(el.textContent).toContain('132 characters left')
      await userEvent.keyboard('x'.repeat(200))
      expect(area.value.length).toBe(140)
      expect(el.textContent).toContain('0 characters left')
    })

    it('exposes the invalid state to assistive technology with the error described', async () => {
      setTheme(theme)
      const { el } = await show(TextareaInvalid)
      const area = el.querySelector('textarea')!
      expect(area.getAttribute('aria-invalid')).toBe('true')
      expect(document.getElementById(area.getAttribute('aria-describedby')!)?.textContent).toContain('at least 20')
      await expect.element(page.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument()
    })
  })

  describe('Field', () => {
    it('names the controls through their labels and links the description', async () => {
      setTheme(theme)
      const { el } = await show(FieldValidation)
      await expect.element(page.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
      await expect.element(page.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
      const message = el.querySelector('textarea')!
      expect(document.getElementById(message.getAttribute('aria-describedby')!)?.textContent).toContain('At least 10 characters')
      expect(message.getAttribute('aria-required')).toBe('true')
      expect(message.getAttribute('aria-invalid')).toBeNull()
    })

    it('clicking the label focuses the control', async () => {
      setTheme(theme)
      const { el } = await show(FieldValidation)
      await userEvent.click(el.querySelectorAll('label')[1]!)
      expect(document.activeElement).toBe(el.querySelector('textarea'))
    })

    it('shows errors after submit, flags the controls invalid, announces them and clears them when fixed', async () => {
      setTheme(theme)
      const { el } = await show(FieldValidation)
      const [email, message] = [el.querySelector('input')!, el.querySelector('textarea')!]
      expect(el.querySelector('[role="alert"]')).toBeNull()

      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      const alerts = [...el.querySelectorAll<HTMLElement>('[role="alert"]')]
      expect(alerts.map(a => a.textContent?.trim())).toEqual(['Enter a valid email address.', 'Write at least 10 characters.'])
      expect(email.getAttribute('aria-invalid')).toBe('true')
      expect(email.getAttribute('aria-describedby')).toBe(alerts[0]!.id)
      expect(message.getAttribute('aria-invalid')).toBe('true')
      expect(message.getAttribute('aria-describedby')!.split(' ')).toContain(alerts[1]!.id)
      expect(message.getAttribute('aria-describedby')!.split(' ')).toHaveLength(2)

      await userEvent.click(email)
      await userEvent.keyboard('ada@example.com')
      await settle()
      expect(email.getAttribute('aria-invalid')).toBeNull()
      expect(email.getAttribute('aria-describedby')).toBeNull()
      expect(el.querySelectorAll('[role="alert"]')).toHaveLength(1)

      await userEvent.click(message)
      await userEvent.keyboard('Hello team, see you at the event.')
      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(el.querySelector('[role="alert"]')).toBeNull()
      expect(el.textContent).toContain('Message sent.')
    })

    it('dims the label and disables the control of a disabled field', async () => {
      setTheme(theme)
      const { el } = await show(FieldHorizontal)
      const fields = el.querySelectorAll<HTMLElement>('[data-slot="field"]')
      const disabled = fields[1]!
      expect(disabled.querySelector('input')!.disabled).toBe(true)
      expect(getComputedStyle(disabled.querySelector('label')!).opacity).toBe('0.5')
      expect(getComputedStyle(fields[0]!.querySelector('label')!).opacity).toBe('1')
    })
  })

  describe('Checkbox', () => {
    it('toggles with Space (not Enter) and exposes aria-checked', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxDefault)
      const box = el.querySelector<HTMLElement>('[role="checkbox"]')!
      expect(box.getAttribute('aria-checked')).toBe('false')
      await userEvent.tab()
      expect(document.activeElement).toBe(box)
      await userEvent.keyboard(' ')
      expect(box.getAttribute('aria-checked')).toBe('true')
      expect(box.querySelector('svg'), 'check icon is drawn').not.toBeNull()
      await userEvent.keyboard('{Enter}')
      expect(box.getAttribute('aria-checked'), 'Enter does not toggle a checkbox').toBe('true')
      await userEvent.keyboard(' ')
      expect(box.getAttribute('aria-checked')).toBe('false')
    })

    it('toggles when its label is clicked and is named by it', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxDefault)
      const box = el.querySelector<HTMLElement>('[role="checkbox"]')!
      await userEvent.click(el.querySelector('label')!)
      expect(box.getAttribute('aria-checked')).toBe('true')
      await expect.element(page.getByRole('checkbox', { name: 'Accept the team code of conduct' })).toBeInTheDocument()
    })

    it('shows a visible focus ring on keyboard focus', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxDefault)
      await userEvent.tab()
      const box = el.querySelector<HTMLElement>('[role="checkbox"]')!
      expect(document.activeElement).toBe(box)
      expect(getComputedStyle(box).boxShadow, 'focus ring').not.toBe('none')
    })

    it('cycles a parent through indeterminate and checks every child when clicked', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxIndeterminate)
      const [parent, ...children] = [...el.querySelectorAll<HTMLElement>('[role="checkbox"]')]
      expect(parent!.getAttribute('aria-checked')).toBe('mixed')
      expect(children.map(c => c.getAttribute('aria-checked'))).toEqual(['true', 'false', 'true'])
      await userEvent.click(children[1]!)
      expect(parent!.getAttribute('aria-checked')).toBe('true')
      await userEvent.click(parent!)
      expect(children.map(c => c.getAttribute('aria-checked'))).toEqual(['false', 'false', 'false'])
      expect(parent!.getAttribute('aria-checked')).toBe('false')
      await userEvent.click(parent!)
      expect(children.every(c => c.getAttribute('aria-checked') === 'true')).toBe(true)
    })

    it('ignores input and Tab focus while disabled', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxDisabled)
      const boxes = [...el.querySelectorAll<HTMLButtonElement>('[role="checkbox"]')]
      expect(boxes.every(b => b.disabled)).toBe(true)
      await userEvent.tab()
      expect(boxes).not.toContain(document.activeElement)
      expect(boxes.map(b => b.getAttribute('aria-checked'))).toEqual(['false', 'true'])
      expect(getComputedStyle(el.querySelector('label')!).opacity).toBe('0.5')
    })

    it('in a Field: required, described, invalid after a failed submit, valid once checked', async () => {
      setTheme(theme)
      const { el } = await show(CheckboxWithField)
      const box = el.querySelector<HTMLElement>('[role="checkbox"]')!
      expect(box.getAttribute('aria-required')).toBe('true')
      expect(document.getElementById(box.getAttribute('aria-describedby')!)?.textContent).toContain('Required for every member')
      expect(box.getAttribute('aria-invalid')).toBeNull()
      await expect.element(page.getByRole('checkbox', { name: /travel and photo release/ })).toBeInTheDocument()

      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(box.getAttribute('aria-invalid')).toBe('true')
      expect(el.querySelector('[role="alert"]')?.textContent).toContain('You must agree')

      await userEvent.click(el.querySelector('label')!)
      await settle()
      expect(box.getAttribute('aria-invalid')).toBeNull()
      expect(el.querySelector('[role="alert"]')).toBeNull()
      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(el.textContent).toContain('Registration saved.')
    })
  })

  describe('RadioGroup', () => {
    const radios = (el: Element) => [...el.querySelectorAll<HTMLElement>('[role="radio"]')]
    const checked = (el: Element) => radios(el).findIndex(r => r.getAttribute('aria-checked') === 'true')
    // Reka checks a radio from a 0ms timeout that requires the arrow key to still be down, so hold the key briefly like a person does.
    const arrow = async (key: string) => {
      await userEvent.keyboard(`{${key}>}`)
      await settle(30)
      await userEvent.keyboard(`{/${key}}`)
      await settle()
    }

    it('has one tab stop (the checked radio) and arrow keys move focus and selection, wrapping at the ends', async () => {
      setTheme(theme)
      const { el } = await show(RadioGroupDefault)
      expect(el.querySelector('[role="radiogroup"]')?.getAttribute('aria-label')).toBe('Subteam')
      expect(checked(el)).toBe(2)
      await userEvent.tab()
      expect(document.activeElement).toBe(radios(el)[2])
      await arrow('ArrowDown')
      expect(checked(el), 'wraps to the first radio').toBe(0)
      expect(document.activeElement).toBe(radios(el)[0])
      await arrow('ArrowDown')
      expect(checked(el)).toBe(1)
      await arrow('ArrowUp')
      await arrow('ArrowUp')
      expect(checked(el), 'ArrowUp wraps to the last radio').toBe(2)
      await arrow('ArrowRight')
      expect(checked(el)).toBe(0)
      await userEvent.tab()
      expect(el.contains(document.activeElement), 'Tab leaves the group in one step').toBe(false)
    })

    it('selects with a click on the label and exposes the accessible name', async () => {
      setTheme(theme)
      const { el } = await show(RadioGroupDefault)
      await userEvent.click(el.querySelector('label[for="radio-mechanical"]')!)
      expect(checked(el)).toBe(0)
      await expect.element(page.getByRole('radio', { name: 'Mechanical' })).toBeChecked()
      await expect.element(page.getByRole('radiogroup', { name: 'Subteam' })).toBeInTheDocument()
    })

    it('draws the checked dot only for the selected item and a focus ring on keyboard focus', async () => {
      setTheme(theme)
      const { el } = await show(RadioGroupHorizontal)
      expect(el.querySelector('[role="radiogroup"]')?.getAttribute('aria-orientation')).toBe('horizontal')
      await userEvent.tab()
      const active = document.activeElement as HTMLElement
      expect(active.getAttribute('role')).toBe('radio')
      expect(getComputedStyle(active).boxShadow, 'focus ring').not.toBe('none')
      expect(el.querySelectorAll('[data-slot="radio-group-indicator"]')).toHaveLength(1)
    })

    it('skips disabled items with the arrow keys', async () => {
      setTheme(theme)
      const { el } = await show(RadioGroupDisabled)
      const first = el.querySelector<HTMLElement>('[role="radiogroup"]')!
      const items = radios(first)
      expect(items[1]!.hasAttribute('disabled')).toBe(true)
      await userEvent.tab()
      expect(document.activeElement).toBe(items[0])
      await arrow('ArrowDown')
      expect(items[0]!.getAttribute('aria-checked'), 'the disabled neighbour cannot be selected').toBe('true')
      const locked = radios(el.querySelectorAll('[role="radiogroup"]')[1]!)
      expect(locked.every(r => r.hasAttribute('disabled'))).toBe(true)
    })

    it('in a Field: named by the field label, required, then invalid until a choice is made', async () => {
      setTheme(theme)
      const { el } = await show(RadioGroupWithField)
      const group = el.querySelector<HTMLElement>('[role="radiogroup"]')!
      expect(group.getAttribute('aria-required')).toBe('true')
      expect(group.getAttribute('aria-invalid')).toBeNull()
      expect(document.getElementById(group.getAttribute('aria-labelledby')!)?.textContent).toContain('Priority')
      await expect.element(page.getByRole('radiogroup', { name: /Priority/ })).toBeInTheDocument()

      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(group.getAttribute('aria-invalid')).toBe('true')
      expect(el.querySelector('[role="alert"]')?.textContent).toContain('Choose a priority')
      expect(group.getAttribute('aria-describedby')!.split(' ')).toHaveLength(2)

      await userEvent.click(el.querySelector('label[for="field-priority-high"]')!)
      await settle()
      expect(group.getAttribute('aria-invalid')).toBeNull()
      expect(el.querySelector('[role="alert"]')).toBeNull()
      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(el.textContent).toContain('Request sent with high priority.')
    })
  })

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
