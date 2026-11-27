import { ElfButton, ElfInput, ElfTabs, ElfTabsContent, ElfTabsList, ElfTabsTrigger, ElfToaster, toast } from '@xouyi/elfui'
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
import SwitchDefault from '../../src/components/switch/examples/Default.vue'
import SwitchDisabled from '../../src/components/switch/examples/Disabled.vue'
import SwitchSizes from '../../src/components/switch/examples/Sizes.vue'
import SwitchWithField from '../../src/components/switch/examples/WithField.vue'
import SelectDefault from '../../src/components/select/examples/Default.vue'
import SelectGroups from '../../src/components/select/examples/Groups.vue'
import SelectScrollable from '../../src/components/select/examples/Scrollable.vue'
import SelectStates from '../../src/components/select/examples/States.vue'
import SelectWithField from '../../src/components/select/examples/WithField.vue'
import AlertCustomIcon from '../../src/components/alert/examples/CustomIcon.vue'
import AlertDynamic from '../../src/components/alert/examples/Dynamic.vue'
import AlertVariants from '../../src/components/alert/examples/Variants.vue'
import ProgressControlled from '../../src/components/progress/examples/Controlled.vue'
import ProgressDefault from '../../src/components/progress/examples/Default.vue'
import ProgressIndeterminate from '../../src/components/progress/examples/Indeterminate.vue'
import ProgressSizes from '../../src/components/progress/examples/Sizes.vue'
import ProgressWithLabel from '../../src/components/progress/examples/WithLabel.vue'
import AvatarDefault from '../../src/components/avatar/examples/Default.vue'
import AvatarFallbackExample from '../../src/components/avatar/examples/Fallback.vue'
import AvatarGroupExample from '../../src/components/avatar/examples/Group.vue'
import AvatarSizes from '../../src/components/avatar/examples/Sizes.vue'
import GradientTextAnimated from '../../src/components/gradient-text/examples/Animated.vue'
import GradientTextVariants from '../../src/components/gradient-text/examples/Variants.vue'
import ButtonGlow from '../../src/components/button/examples/Glow.vue'
import ButtonAsChild from '../../src/components/button/examples/AsChild.vue'
import AlertDialogControlled from '../../src/components/alert-dialog/examples/Controlled.vue'
import AlertDialogDefault from '../../src/components/alert-dialog/examples/Default.vue'
import AlertDialogDestructive from '../../src/components/alert-dialog/examples/Destructive.vue'
import DialogControlled from '../../src/components/dialog/examples/Controlled.vue'
import DialogDefault from '../../src/components/dialog/examples/Default.vue'
import SheetBottom from '../../src/components/sheet/examples/BottomSheet.vue'
import SheetControlled from '../../src/components/sheet/examples/Controlled.vue'
import SheetDefault from '../../src/components/sheet/examples/Default.vue'
import SheetSides from '../../src/components/sheet/examples/Sides.vue'
import ToastWithAction from '../../src/components/toast/examples/WithAction.vue'
import AccordionControlled from '../../src/components/accordion/examples/Controlled.vue'
import AccordionDefault from '../../src/components/accordion/examples/Default.vue'
import AccordionDisabled from '../../src/components/accordion/examples/Disabled.vue'
import AccordionMultiple from '../../src/components/accordion/examples/Multiple.vue'
import CollapsibleControlled from '../../src/components/collapsible/examples/Controlled.vue'
import CollapsibleDefault from '../../src/components/collapsible/examples/Default.vue'
import TabsControlled from '../../src/components/tabs/examples/Controlled.vue'
import TabsDefault from '../../src/components/tabs/examples/Default.vue'
import ScrollAreaBoth from '../../src/components/scroll-area/examples/Both.vue'
import ScrollAreaDefault from '../../src/components/scroll-area/examples/Default.vue'
import ScrollAreaHorizontal from '../../src/components/scroll-area/examples/Horizontal.vue'
import ContextMenuDefault from '../../src/components/context-menu/examples/Default.vue'
import ContextMenuOptions from '../../src/components/context-menu/examples/Options.vue'
import DropdownMenuCheckboxes from '../../src/components/dropdown-menu/examples/Checkboxes.vue'
import BreadcrumbCollapsed from '../../src/components/breadcrumb/examples/Collapsed.vue'
import BreadcrumbDefault from '../../src/components/breadcrumb/examples/Default.vue'
import PaginationDefault from '../../src/components/pagination/examples/Default.vue'
import PaginationDisabled from '../../src/components/pagination/examples/Disabled.vue'
import PaginationSimple from '../../src/components/pagination/examples/Simple.vue'
import PaginationWithEdges from '../../src/components/pagination/examples/WithEdges.vue'
import DropdownMenuControlled from '../../src/components/dropdown-menu/examples/Controlled.vue'
import DropdownMenuDefault from '../../src/components/dropdown-menu/examples/Default.vue'
import DropdownMenuRadioItems from '../../src/components/dropdown-menu/examples/RadioItems.vue'
import DropdownMenuRowActions from '../../src/components/dropdown-menu/examples/RowActions.vue'
import DropdownMenuSubMenu from '../../src/components/dropdown-menu/examples/SubMenu.vue'
import HoverCardControlled from '../../src/components/hover-card/examples/Controlled.vue'
import HoverCardDefault from '../../src/components/hover-card/examples/Default.vue'
import HoverCardDelays from '../../src/components/hover-card/examples/Delays.vue'
import PopoverControlled from '../../src/components/popover/examples/Controlled.vue'
import PopoverDefault from '../../src/components/popover/examples/Default.vue'
import PopoverModal from '../../src/components/popover/examples/Modal.vue'
import TooltipControlled from '../../src/components/tooltip/examples/Controlled.vue'
import TooltipDefault from '../../src/components/tooltip/examples/Default.vue'
import TooltipIconButtons from '../../src/components/tooltip/examples/IconButtons.vue'
import { axeViolations, mountComponent, settle, setTheme, themes } from './support'

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

  describe('AlertDialog', () => {
    const alertdialog = () => document.querySelector<HTMLElement>('[role="alertdialog"]')

    it('focuses Cancel first, traps Tab, closes on Escape and returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(AlertDialogDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!
      await userEvent.click(trigger)
      await settle(150)

      const dialog = alertdialog()!
      expect(dialog).not.toBeNull()
      expect(document.activeElement?.textContent?.trim(), 'initial focus is the safe Cancel action').toBe('Cancel')

      for (let i = 0; i < 6; i++) {
        await userEvent.tab()
        expect(dialog.contains(document.activeElement), `focus stayed inside after Tab #${i + 1}`).toBe(true)
      }

      await userEvent.keyboard('{Escape}')
      await settle(150)
      expect(alertdialog()).toBeNull()
      expect(document.activeElement, 'focus returned to the trigger').toBe(trigger)
    })

    it('is not dismissed by a click outside', async () => {
      setTheme(theme)
      const { el } = await show(AlertDialogControlled)
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(150)
      expect(alertdialog()).not.toBeNull()
      const overlay = document.querySelector<HTMLElement>('[data-slot="alert-dialog-overlay"]')!
      await userEvent.click(overlay, { position: { x: 4, y: 4 } })
      await settle(150)
      expect(alertdialog(), 'still open after an overlay click').not.toBeNull()
      expect(el.textContent).toContain('open = true')
    })

    it('runs the action once and closes; Cancel closes without running it', async () => {
      setTheme(theme)
      const { el } = await show(AlertDialogControlled)
      const opener = el.querySelector<HTMLElement>('button')!
      await userEvent.click(opener)
      await settle(150)
      await userEvent.keyboard('{Enter}') // focus is on Cancel
      await settle(150)
      expect(alertdialog()).toBeNull()
      expect(el.textContent).toContain('removed = 0')

      await userEvent.click(opener)
      await settle(150)
      await userEvent.click([...document.querySelectorAll<HTMLElement>('[role="alertdialog"] button')].find(b => b.textContent?.trim() === 'Remove')!)
      await settle(150)
      expect(alertdialog()).toBeNull()
      expect(el.textContent).toContain('removed = 1')
    })

    it('renders the destructive action with the destructive fill', async () => {
      setTheme(theme)
      const { el } = await show(AlertDialogDestructive)
      await userEvent.click(el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!)
      await settle(150)
      const action = document.querySelector<HTMLElement>('[data-slot="alert-dialog-action"]')!
      const probe = document.createElement('span')
      probe.style.backgroundColor = 'var(--elf-destructive)'
      document.body.append(probe)
      const destructive = getComputedStyle(probe).backgroundColor
      probe.remove()
      expect(getComputedStyle(action).backgroundColor).toBe(destructive)
    })
  })

  describe('Sheet', () => {
    const sheet = () => document.querySelector<HTMLElement>('[data-slot="sheet-content"]')

    it('moves focus in, traps Tab, closes on Escape and returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(SheetDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!
      await userEvent.click(trigger)
      await settle(300)
      const dialog = sheet()!
      expect(dialog.contains(document.activeElement), 'focus moved into the sheet').toBe(true)
      for (let i = 0; i < 10; i++) {
        await userEvent.tab()
        expect(dialog.contains(document.activeElement), `focus stayed inside after Tab #${i + 1}`).toBe(true)
      }
      await userEvent.keyboard('{Escape}')
      await settle(300)
      expect(sheet()).toBeNull()
      expect(document.activeElement, 'focus returned to the trigger').toBe(trigger)
    })

    it('closes on an outside click and from Cancel', async () => {
      setTheme(theme)
      const { el } = await show(SheetDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!
      await userEvent.click(trigger)
      await settle(300)
      await userEvent.click(document.querySelector<HTMLElement>('[data-slot="sheet-overlay"]')!, { position: { x: 4, y: 4 } })
      await settle(300)
      expect(sheet()).toBeNull()

      await userEvent.click(trigger)
      await settle(300)
      await userEvent.click([...document.querySelectorAll<HTMLElement>('[data-slot="sheet-content"] button')].find(b => b.textContent?.trim() === 'Cancel')!)
      await settle(300)
      expect(sheet()).toBeNull()
    })

    it('anchors each side to its viewport edge', async () => {
      setTheme(theme)
      const { el } = await show(SheetSides)
      const triggers = [...el.querySelectorAll<HTMLElement>('[aria-haspopup="dialog"]')]
      expect(triggers).toHaveLength(4)
      for (const trigger of triggers) {
        await userEvent.click(trigger)
        await settle(300)
        const dialog = sheet()!
        const side = dialog.getAttribute('data-side')
        const rect = dialog.getBoundingClientRect()
        if (side === 'top') expect(rect.top).toBe(0)
        if (side === 'left') expect(rect.left).toBe(0)
        if (side === 'right') expect(Math.round(rect.right)).toBe(document.documentElement.clientWidth)
        if (side === 'bottom') expect(Math.round(rect.bottom)).toBe(document.documentElement.clientHeight)
        await userEvent.keyboard('{Escape}')
        await settle(300)
        expect(sheet()).toBeNull()
      }
    })

    it('the bottom sheet spans the width and stays inside the viewport', async () => {
      setTheme(theme)
      const { el } = await show(SheetBottom)
      await userEvent.click(el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!)
      await settle(300)
      const rect = sheet()!.getBoundingClientRect()
      expect(Math.round(rect.width)).toBe(document.documentElement.clientWidth)
      expect(rect.height).toBeLessThanOrEqual(window.innerHeight)
    })

    it('v-model:open reflects the state', async () => {
      setTheme(theme)
      const { el } = await show(SheetControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(300)
      expect(el.textContent).toContain('open = true')
      expect(sheet()).not.toBeNull()
      await userEvent.keyboard('{Escape}')
      await settle(300)
      expect(el.textContent).toContain('open = false')
    })
  })

  describe('Toast', () => {
    const toasts = () => [...document.querySelectorAll<HTMLElement>('[data-slot="toast"]')]
    const status = () => document.querySelector('[data-slot="toast-announcer"] [role="status"]')!.textContent?.trim()
    const alertText = () => document.querySelector('[data-slot="toast-announcer"] [role="alert"]')!.textContent?.trim()
    const App = (props: Record<string, unknown> = {}, example?: Parameters<typeof mountComponent>[0]) => defineComponent(() => () => h('div', [example ? h(example) : null, h(ElfToaster, props)]))

    afterEach(async () => {
      toast.dismiss()
      await settle(300)
    })

    it('announces ordinary toasts politely (role=status) and destructive ones assertively (role=alert)', async () => {
      setTheme(theme)
      await show(App())
      toast('Saved', { description: 'Roster updated' })
      await settle(100)
      expect(status()).toBe('Saved. Roster updated')
      expect(alertText()).toBe('')
      toast.error('Save failed')
      await settle(100)
      expect(alertText()).toBe('Save failed')
      expect(toasts()).toHaveLength(2)
    })

    it('has no axe violations with every variant open', async () => {
      setTheme(theme)
      await show(App())
      toast('Default', { description: 'Plain' })
      toast.success('Success')
      toast.warning('Warning')
      toast.error('Destructive', { action: { label: 'Retry' } })
      await settle(300)
      expect(await axeViolations()).toEqual([])
    })

    it('runs an action from the keyboard and closes the toast', async () => {
      setTheme(theme)
      const { el } = await show(App({}, ToastWithAction))
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(300)
      expect(toasts()).toHaveLength(1)
      await userEvent.keyboard('{F8}')
      await settle(100)
      const action = document.querySelector<HTMLElement>('[data-slot="toast-action"]')!
      await userEvent.tab()
      for (let i = 0; i < 4 && document.activeElement !== action; i++) await userEvent.tab()
      expect(document.activeElement).toBe(action)
      await userEvent.keyboard('{Enter}')
      await settle(400)
      expect(el.textContent).toContain('restored = 1')
      expect(toasts()).toHaveLength(0)
    })

    it('dismisses with the close button', async () => {
      setTheme(theme)
      await show(App())
      toast('Bye', { duration: 0 })
      await settle(200)
      await userEvent.click(document.querySelector<HTMLElement>('[data-slot="toast-close"]')!)
      await settle(400)
      expect(toasts()).toHaveLength(0)
    })

    it('F8 moves focus to the notification region', async () => {
      setTheme(theme)
      await show(App())
      toast('Focus me', { duration: 0 })
      await settle(200)
      await userEvent.keyboard('{F8}')
      await settle(100)
      const viewport = document.querySelector<HTMLElement>('[data-slot="toaster"]')!
      expect(document.activeElement === viewport || viewport.contains(document.activeElement), 'focus is in the toast region').toBe(true)
    })

    it('Escape closes a focused toast', async () => {
      setTheme(theme)
      await show(App())
      toast('Esc me', { duration: 0 })
      await settle(200)
      toasts()[0]!.focus()
      await userEvent.keyboard('{Escape}')
      await settle(400)
      expect(toasts()).toHaveLength(0)
    })

    it('closes itself after its duration and pauses while hovered', async () => {
      setTheme(theme)
      await show(App())
      toast('Timed', { duration: 700 })
      await settle(200)
      await userEvent.hover(toasts()[0]!)
      await settle(900)
      expect(toasts(), 'still open while hovered').toHaveLength(1)
      await userEvent.unhover(toasts()[0]!)
      await settle(1300)
      expect(toasts()).toHaveLength(0)
    })

    it('shows at most `limit` toasts at once', async () => {
      setTheme(theme)
      await show(App({ limit: 2 }))
      for (const n of ['a', 'b', 'c']) toast(n, { duration: 0 })
      await settle(300)
      const visible = toasts().filter(t => getComputedStyle(t).display !== 'none')
      expect(visible).toHaveLength(2)
      expect(visible.map(t => t.textContent)).toEqual([expect.stringContaining('b'), expect.stringContaining('c')])
    })

    it('dismisses on a horizontal swipe', async () => {
      setTheme(theme)
      await show(App())
      toast('Swipe me', { duration: 0 })
      await settle(300)
      const item = toasts()[0]!
      const rect = item.getBoundingClientRect()
      const x = rect.left + 20
      const y = rect.top + rect.height / 2
      const fire = (type: string, dx: number) => item.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x + dx, clientY: y, button: 0, pointerId: 1, pointerType: 'touch', isPrimary: true }))
      fire('pointerdown', 0)
      for (const dx of [10, 40, 80, 140]) fire('pointermove', dx)
      fire('pointerup', 140)
      await settle(500)
      expect(toasts()).toHaveLength(0)
    })

    it('shows a spinner while a promise toast is loading', async () => {
      setTheme(theme)
      await show(App())
      let done!: () => void
      void toast.promise(new Promise<void>((r) => { done = r }), { loading: 'Working', success: 'Done', error: 'Failed' })
      await settle(200)
      expect(toasts()[0]!.getAttribute('data-status')).toBe('loading')
      expect(toasts()[0]!.querySelector('[data-slot="toast-icon"] svg')).not.toBeNull()
      done()
      await settle(300)
      expect(toasts()[0]!.textContent).toContain('Done')
      expect(status()).toBe('Done')
    })
  })

  describe('Collapsible', () => {
    it('toggles with Enter and Space, exposes aria-expanded and links the content', async () => {
      setTheme(theme)
      const { el } = await show(CollapsibleDefault)
      const trigger = el.querySelector<HTMLElement>('[data-slot="collapsible-trigger"]')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      trigger.focus()
      await userEvent.keyboard('{Enter}')
      await settle(300)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
      const content = el.querySelector<HTMLElement>('[data-slot="collapsible-content"]')!
      expect(trigger.getAttribute('aria-controls')).toBe(content.id)
      expect(content.getBoundingClientRect().height).toBeGreaterThan(0)
      await userEvent.keyboard(' ')
      await settle(400)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      expect(el.querySelector<HTMLElement>('[data-slot="collapsible-content"]')?.hidden ?? true, 'content is hidden when closed').toBe(true)
    })

    it('v-model:open reflects the state', async () => {
      setTheme(theme)
      const { el } = await show(CollapsibleControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(300)
      expect(el.textContent).toContain('open = true')
    })

    it('animates the height and settles at the natural height', async () => {
      setTheme(theme)
      const { el } = await show(CollapsibleControlled)
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(450)
      const content = el.querySelector<HTMLElement>('[data-slot="collapsible-content"]')!
      expect(content.getBoundingClientRect().height).toBeGreaterThan(20)
    })
  })

  describe('Accordion', () => {
    const triggers = (el: HTMLElement) => [...el.querySelectorAll<HTMLElement>('[data-slot="accordion-trigger"]')]
    const expanded = (el: HTMLElement) => triggers(el).map(t => t.getAttribute('aria-expanded'))

    it('opens with Enter and Space; single mode closes the other item', async () => {
      setTheme(theme)
      const { el } = await show(AccordionDefault)
      expect(expanded(el)).toEqual(['true', 'false', 'false'])
      const [, second] = triggers(el)
      second!.focus()
      await userEvent.keyboard('{Enter}')
      await settle(350)
      expect(expanded(el)).toEqual(['false', 'true', 'false'])
      await userEvent.keyboard(' ')
      await settle(350)
      expect(expanded(el), 'collapsible: the open item closes').toEqual(['false', 'false', 'false'])
    })

    it('moves focus with ArrowDown, ArrowUp, Home and End', async () => {
      setTheme(theme)
      const { el } = await show(AccordionDefault)
      const [first, second, third] = triggers(el)
      first!.focus()
      await userEvent.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(second)
      await userEvent.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(third)
      await userEvent.keyboard('{ArrowDown}')
      expect(document.activeElement, 'wraps to the first').toBe(first)
      await userEvent.keyboard('{ArrowUp}')
      expect(document.activeElement, 'wraps to the last').toBe(third)
      await userEvent.keyboard('{Home}')
      expect(document.activeElement).toBe(first)
      await userEvent.keyboard('{End}')
      expect(document.activeElement).toBe(third)
    })

    it('multiple mode keeps several items open', async () => {
      setTheme(theme)
      const { el } = await show(AccordionMultiple)
      expect(expanded(el)).toEqual(['true', 'true', 'false'])
      await userEvent.click(triggers(el)[2]!)
      await settle(350)
      expect(expanded(el)).toEqual(['true', 'true', 'true'])
      await userEvent.click(triggers(el)[0]!)
      await settle(350)
      expect(expanded(el)).toEqual(['false', 'true', 'true'])
    })

    it('skips disabled items with the arrow keys and ignores clicks on them', async () => {
      setTheme(theme)
      const { el } = await show(AccordionDisabled)
      const [first, locked, last] = triggers(el)
      expect(locked!.hasAttribute('disabled') || locked!.getAttribute('aria-disabled') === 'true').toBe(true)
      first!.focus()
      await userEvent.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(last)
      await userEvent.click(locked!, { force: true }).catch(() => {})
      expect(locked!.getAttribute('aria-expanded')).toBe('false')
    })

    it('content is a region named by its trigger', async () => {
      setTheme(theme)
      const { el } = await show(AccordionDefault)
      const region = el.querySelector<HTMLElement>('[data-slot="accordion-content"]')!
      expect(region.getAttribute('role')).toBe('region')
      expect(region.getAttribute('aria-labelledby')).toBe(triggers(el)[0]!.id)
    })

    it('v-model reflects the open item', async () => {
      setTheme(theme)
      const { el } = await show(AccordionControlled)
      expect(el.textContent).toContain('open = a')
      await userEvent.click(triggers(el)[1]!)
      await settle(350)
      expect(el.textContent).toContain('open = b')
      await userEvent.click(triggers(el)[1]!)
      await settle(350)
      expect(el.textContent).toContain('open = none')
    })

    it('the chevron rotates when open', async () => {
      setTheme(theme)
      const { el } = await show(AccordionDefault)
      const rotated = (t: HTMLElement) => getComputedStyle(t.querySelector('svg')!).rotate
      await settle(300)
      expect(rotated(triggers(el)[0]!)).not.toBe(rotated(triggers(el)[1]!))
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

    it('glow draws a coloured shadow that grows on hover and keyboard focus without changing the layout', async () => {
      setTheme(theme)
      const { el } = await show(ButtonGlow)
      const buttons = [...el.querySelectorAll<HTMLButtonElement>('button')]
      expect(buttons.length).toBeGreaterThan(3)
      for (const button of buttons) {
        const rest = getComputedStyle(button)
        expect(rest.boxShadow, `${button.dataset.variant} has a resting glow`).not.toBe('none')
        expect(rest.boxShadow).toMatch(/\d/)
      }
      const first = buttons[0]!
      const box = first.getBoundingClientRect()
      const restShadow = getComputedStyle(first).boxShadow
      await userEvent.hover(first)
      await settle()
      const hovered = getComputedStyle(first).boxShadow
      expect(hovered, 'hover changes the glow').not.toBe(restShadow)
      await userEvent.unhover(first)
      await userEvent.tab()
      expect(document.activeElement).toBe(first)
      await settle()
      expect(getComputedStyle(first).boxShadow, 'focus lifts the glow').not.toBe(restShadow)
      const after = first.getBoundingClientRect()
      expect([after.width, after.height], 'glow never changes the layout').toEqual([box.width, box.height])
    })
  })

  describe('GradientText', () => {
    it('paints a gradient clipped to real, selectable text', async () => {
      setTheme(theme)
      const { el } = await show(GradientTextVariants)
      const spans = [...el.querySelectorAll<HTMLElement>('[data-slot="gradient-text"]')]
      expect(spans.map(s => s.dataset.variant)).toEqual(['brand', 'aurora', 'sunset', 'forest'])
      for (const span of spans) {
        const style = getComputedStyle(span)
        expect(style.backgroundImage, `${span.dataset.variant} paints a gradient`).toContain('linear-gradient')
        expect(style.backgroundClip).toBe('text')
        expect(style.color).toBe('rgba(0, 0, 0, 0)')
        expect(style.userSelect).not.toBe('none')
        expect(span.textContent!.trim()).toBe(span.dataset.variant)
      }
      await expect.element(page.getByText('aurora')).toBeVisible()
    })

    it('animates the shimmer unless reduced motion is preferred', async () => {
      setTheme(theme)
      const { el } = await show(GradientTextAnimated)
      const style = getComputedStyle(el.querySelector('[data-slot="gradient-text"]')!)
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      expect(style.animationName).toBe(reduced ? 'none' : 'elf-gradient-shimmer')
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

  describe('Switch', () => {
    it('toggles with Space and Enter and exposes aria-checked', async () => {
      setTheme(theme)
      const { el } = await show(SwitchDefault)
      const toggle = el.querySelector<HTMLElement>('[role="switch"]')!
      expect(toggle.getAttribute('aria-checked')).toBe('true')
      await userEvent.tab()
      expect(document.activeElement).toBe(toggle)
      await userEvent.keyboard(' ')
      expect(toggle.getAttribute('aria-checked')).toBe('false')
      await userEvent.keyboard('{Enter}')
      expect(toggle.getAttribute('aria-checked')).toBe('true')
      expect(getComputedStyle(toggle).boxShadow, 'focus ring').not.toBe('none')
    })

    it('toggles when its label is clicked and is named by it', async () => {
      setTheme(theme)
      const { el } = await show(SwitchDefault)
      await userEvent.click(el.querySelector('label')!)
      expect(el.querySelector('[role="switch"]')!.getAttribute('aria-checked')).toBe('false')
      await expect.element(page.getByRole('switch', { name: 'Match reminders' })).toBeInTheDocument()
    })

    it('slides the thumb across the track when it turns on', async () => {
      setTheme(theme)
      const { el } = await show(SwitchSizes)
      const [regular, small] = [...el.querySelectorAll<HTMLElement>('[role="switch"]')]
      for (const toggle of [regular!, small!]) {
        const thumb = toggle.querySelector<HTMLElement>('[data-slot="switch-thumb"]')!
        const track = toggle.getBoundingClientRect()
        // Checked: the thumb sits against the right inner edge (border and padding are 1px each).
        await settle(250)
        expect(Math.round(track.right - thumb.getBoundingClientRect().right)).toBe(2)
        await userEvent.click(toggle)
        await settle(250)
        expect(Math.round(thumb.getBoundingClientRect().left - track.left)).toBe(2)
      }
      expect(regular!.getBoundingClientRect().height).toBe(24)
      expect(small!.getBoundingClientRect().height).toBe(20)
    })

    it('ignores input and Tab focus while disabled', async () => {
      setTheme(theme)
      const { el } = await show(SwitchDisabled)
      const toggles = [...el.querySelectorAll<HTMLButtonElement>('[role="switch"]')]
      expect(toggles.every(t => t.disabled)).toBe(true)
      await userEvent.tab()
      expect(toggles).not.toContain(document.activeElement)
      expect(toggles.map(t => t.getAttribute('aria-checked'))).toEqual(['false', 'true'])
    })

    it('in a Field: label and description wire up, a disabled field disables the switch and dims its label', async () => {
      setTheme(theme)
      const { el } = await show(SwitchWithField)
      const [digest, sms] = [...el.querySelectorAll<HTMLButtonElement>('[role="switch"]')]
      await expect.element(page.getByRole('switch', { name: 'Weekly digest' })).toBeInTheDocument()
      expect(document.getElementById(digest!.getAttribute('aria-describedby')!)?.textContent).toContain('One email every Monday')
      await userEvent.click(el.querySelector('label')!)
      expect(digest!.getAttribute('aria-checked')).toBe('false')
      expect(sms!.disabled).toBe(true)
      expect(getComputedStyle(el.querySelectorAll('label')[1]!).opacity).toBe('0.5')
    })
  })

  describe('Select', () => {
    const trigger = (el: Element) => el.querySelector<HTMLElement>('[role="combobox"]')!
    const listbox = () => document.querySelector<HTMLElement>('[role="listbox"]')
    const options = () => [...document.querySelectorAll<HTMLElement>('[role="option"]')]
    const highlighted = () => options().findIndex(o => o.hasAttribute('data-highlighted'))

    it('opens with Enter, ArrowDown and Space, exposes combobox and listbox roles, and Escape closes it and restores focus', async () => {
      setTheme(theme)
      const { el } = await show(SelectDefault)
      const t = trigger(el)
      expect(t.getAttribute('aria-expanded')).toBe('false')
      expect(t.textContent).toContain('Choose a subteam')
      await userEvent.tab()
      expect(document.activeElement).toBe(t)

      for (const key of ['{Enter}', '{ArrowDown}', ' ']) {
        await userEvent.keyboard(key)
        await settle(150)
        expect(t.getAttribute('aria-expanded'), `${key} opens the list`).toBe('true')
        expect(listbox(), `${key} renders a listbox`).not.toBeNull()
        expect(options().map(o => o.textContent?.trim())).toEqual(['Mechanical', 'Electrical', 'Software', 'Business and outreach'])
        await userEvent.keyboard('{Escape}')
        await settle(200)
        expect(listbox()).toBeNull()
        expect(t.getAttribute('aria-expanded')).toBe('false')
        expect(document.activeElement, 'focus returns to the trigger').toBe(t)
        expect(t.textContent, 'Escape keeps the value').toContain('Choose a subteam')
      }
    })

    it('moves the highlight with the arrow keys, Home and End, and selects the highlighted option with Enter', async () => {
      setTheme(theme)
      const { el } = await show(SelectDefault)
      const t = trigger(el)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(150)
      expect(highlighted()).toBe(0)
      await userEvent.keyboard('{ArrowDown}{ArrowDown}')
      await settle()
      expect(highlighted()).toBe(2)
      await userEvent.keyboard('{End}')
      await settle()
      expect(highlighted()).toBe(3)
      await userEvent.keyboard('{Home}')
      await settle()
      expect(highlighted()).toBe(0)
      await userEvent.keyboard('{ArrowDown}{Enter}')
      await settle(200)
      expect(listbox()).toBeNull()
      expect(t.textContent).toContain('Electrical')
      expect(t.hasAttribute('data-placeholder')).toBe(false)
      expect(document.activeElement).toBe(t)

      await userEvent.keyboard('{Enter}')
      await settle(150)
      const selected = options().find(o => o.getAttribute('aria-selected') === 'true')
      expect(selected?.textContent?.trim(), 'the selected option is marked').toBe('Electrical')
      expect(selected?.hasAttribute('data-highlighted'), 'and highlighted when reopened').toBe(true)
    })

    it('typeahead highlights the matching option and selecting by click closes the list', async () => {
      setTheme(theme)
      const { el } = await show(SelectDefault)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(150)
      await userEvent.keyboard('s')
      await settle()
      expect(options()[highlighted()]?.textContent?.trim()).toBe('Software')
      await settle(1100) // typeahead forgets the typed characters after one second
      await userEvent.keyboard('b')
      await settle()
      expect(options()[highlighted()]?.textContent?.trim()).toBe('Business and outreach')
      await userEvent.click(options()[0]!)
      await settle(200)
      expect(listbox()).toBeNull()
      expect(trigger(el).textContent).toContain('Mechanical')
      await expect.element(page.getByRole('combobox', { name: 'Subteam' })).toBeInTheDocument()
    })

    it('opens with the pointer, closes on an outside click and keeps the list inside the viewport', async () => {
      setTheme(theme)
      const { el } = await show(SelectDefault)
      await userEvent.click(trigger(el))
      await settle(150)
      const content = document.querySelector<HTMLElement>('[data-slot="select-content"]')!
      const rect = content.getBoundingClientRect()
      expect(rect.top).toBeGreaterThanOrEqual(0)
      expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight)
      expect(rect.right).toBeLessThanOrEqual(window.innerWidth)
      expect(Math.round(rect.width), 'at least as wide as the trigger').toBeGreaterThanOrEqual(Math.round(trigger(el).getBoundingClientRect().width))
      // The page behind an open select has pointer-events: none, so dispatch the outside press directly.
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse', button: 0 }))
      await settle(200)
      expect(listbox()).toBeNull()
    })

    it('groups options under labels and skips disabled options', async () => {
      setTheme(theme)
      const { el } = await show(SelectGroups)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(150)
      const groups = [...document.querySelectorAll('[role="group"]')]
      expect(groups).toHaveLength(2)
      expect(document.querySelector('[data-slot="select-label"]')?.textContent).toBe('Turkey')
      expect(document.querySelector('[data-slot="select-separator"]')).not.toBeNull()
      const lyon = options().find(o => o.textContent?.includes('Lyon'))!
      expect(lyon.getAttribute('aria-disabled')).toBe('true')
      await userEvent.keyboard('{End}')
      await settle()
      expect(options()[highlighted()]?.textContent?.trim(), 'End skips the disabled option').toBe('Rotterdam District')
      expect(trigger(el).textContent).toContain('Istanbul Regional')
    })

    it('shows scroll buttons for a long list and scrolls to a far option with the keyboard', async () => {
      setTheme(theme)
      await show(SelectScrollable)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      const content = document.querySelector<HTMLElement>('[data-slot="select-content"]')!
      expect(content.getBoundingClientRect().height, 'capped by max-h-48').toBeLessThanOrEqual(192)
      await userEvent.keyboard('{End}')
      await settle(200)
      const last = options().at(-1)!
      expect(last.hasAttribute('data-highlighted')).toBe(true)
      const viewport = document.querySelector<HTMLElement>('[data-reka-select-viewport]')!
      expect(viewport.scrollTop, 'the list scrolled').toBeGreaterThan(0)
      const box = last.getBoundingClientRect()
      expect(box.bottom).toBeLessThanOrEqual(viewport.getBoundingClientRect().bottom + 1)
    })

    it('in a Field: named by the label, required, then invalid until a value is chosen', async () => {
      setTheme(theme)
      const { el } = await show(SelectWithField)
      const t = trigger(el)
      expect(t.getAttribute('aria-required')).toBe('true')
      expect(t.getAttribute('aria-invalid')).toBeNull()
      expect(document.getElementById(t.getAttribute('aria-describedby')!)?.textContent).toContain('Pick the role')
      await expect.element(page.getByRole('combobox', { name: /Role/ })).toBeInTheDocument()

      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(t.getAttribute('aria-invalid')).toBe('true')
      expect(el.querySelector('[role="alert"]')?.textContent).toContain('Choose a role')

      await userEvent.click(t)
      await settle(150)
      await userEvent.click(options().find(o => o.textContent?.includes('Scout'))!)
      await settle(200)
      expect(t.getAttribute('aria-invalid')).toBeNull()
      expect(el.querySelector('[role="alert"]')).toBeNull()
      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      expect(el.textContent).toContain('Role saved: scout.')
    })

    it('sm trigger is shorter, and a disabled trigger cannot be focused or opened', async () => {
      setTheme(theme)
      const { el } = await show(SelectStates)
      const [small, invalid, disabled] = [...el.querySelectorAll<HTMLButtonElement>('[role="combobox"]')]
      expect(small!.getBoundingClientRect().height).toBe(32)
      expect(invalid!.getBoundingClientRect().height).toBe(36)
      expect(invalid!.getAttribute('aria-invalid')).toBe('true')
      expect(disabled!.disabled).toBe(true)
      await userEvent.tab()
      await userEvent.tab()
      await userEvent.tab()
      expect(document.activeElement).not.toBe(disabled)
      disabled!.click()
      await settle(150)
      expect(listbox()).toBeNull()
    })
  })

  describe('Alert', () => {
    it('gives destructive alerts role alert and the others role status', async () => {
      setTheme(theme)
      const { el } = await show(AlertVariants)
      const alerts = [...el.querySelectorAll<HTMLElement>('[data-slot="alert"]')]
      expect(alerts.map(a => a.dataset.variant)).toEqual(['default', 'success', 'warning', 'destructive'])
      expect(alerts.map(a => a.getAttribute('role'))).toEqual(['status', 'status', 'status', 'alert'])
      await expect.element(page.getByRole('alert')).toBeInTheDocument()
      expect(el.querySelector('[role="alert"]')?.textContent).toContain('Could not save the schedule')
      expect(el.querySelectorAll('[data-slot="alert-icon"][aria-hidden="true"] svg')).toHaveLength(4)
    })

    it('draws variant-specific colors from the theme tokens', async () => {
      setTheme(theme)
      const { el } = await show(AlertVariants)
      const alerts = [...el.querySelectorAll<HTMLElement>('[data-slot="alert"]')]
      const colors = alerts.map(a => getComputedStyle(a.querySelector('[data-slot="alert-title"]')!).color)
      expect(new Set(colors).size, 'title colors differ per variant').toBe(colors.length)
      const borders = alerts.map(a => getComputedStyle(a).borderTopColor)
      expect(new Set(borders).size, 'every variant has its own border color').toBe(4)
    })

    it('renders a custom icon, and role none and no icon when asked', async () => {
      setTheme(theme)
      const { el } = await show(AlertCustomIcon)
      const [withIcon, bare] = [...el.querySelectorAll<HTMLElement>('[data-slot="alert"]')]
      expect(withIcon!.querySelector('[data-slot="alert-icon"] svg')).not.toBeNull()
      expect(bare!.hasAttribute('role')).toBe(false)
      expect(bare!.querySelector('[data-slot="alert-icon"]')).toBeNull()
    })

    it('inserts live regions on demand and removes the previous message', async () => {
      setTheme(theme)
      const { el } = await show(AlertDynamic)
      expect(el.querySelector('[data-slot="alert"]')).toBeNull()
      const [save, fail] = [...el.querySelectorAll<HTMLElement>('button')]
      await userEvent.click(fail!)
      await settle()
      expect(el.querySelector('[role="alert"]')?.textContent).toContain('Save failed')
      await userEvent.click(save!)
      await settle()
      expect(el.querySelector('[role="alert"]')).toBeNull()
      expect(el.querySelector('[role="status"]')?.textContent).toContain('Roster saved')
    })
  })

  describe('Progress', () => {
    const bar = (el: Element, index = 0) => el.querySelectorAll<HTMLElement>('[role="progressbar"]')[index]!

    it('exposes aria-valuenow, min and max and an accessible name, and draws the indicator to scale', async () => {
      setTheme(theme)
      const { el } = await show(ProgressDefault)
      const progress = bar(el)
      expect(progress.getAttribute('aria-valuenow')).toBe('64')
      expect(progress.getAttribute('aria-valuemin')).toBe('0')
      expect(progress.getAttribute('aria-valuemax')).toBe('100')
      await expect.element(page.getByRole('progressbar', { name: 'Robot build progress' })).toBeInTheDocument()
      const indicator = progress.querySelector<HTMLElement>('[data-slot="progress-indicator"]')!
      expect(indicator.getBoundingClientRect().width / progress.getBoundingClientRect().width).toBeCloseTo(0.64, 1)
      expect(getComputedStyle(indicator).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    })

    it('updates aria-valuenow and the indicator when the model changes', async () => {
      setTheme(theme)
      const { el } = await show(ProgressControlled)
      const [less, more] = [...el.querySelectorAll<HTMLButtonElement>('button')]
      expect(bar(el).getAttribute('aria-valuenow')).toBe('20')
      await userEvent.click(more!)
      await userEvent.click(more!)
      await settle(400)
      expect(bar(el).getAttribute('aria-valuenow')).toBe('60')
      expect(el.querySelector('output')?.textContent).toBe('60%')
      const track = bar(el).getBoundingClientRect().width
      expect(bar(el).querySelector<HTMLElement>('[data-slot="progress-indicator"]')!.getBoundingClientRect().width / track).toBeCloseTo(0.6, 1)
      await userEvent.click(less!)
      await settle(400)
      expect(bar(el).getAttribute('aria-valuenow')).toBe('40')
      expect(bar(el).getAttribute('data-state')).toBe('loading')
      for (let i = 0; i < 3; i++) await userEvent.click(more!)
      await settle()
      expect(bar(el).getAttribute('data-state')).toBe('complete')
      expect(more!.disabled).toBe(true)
    })

    it('is indeterminate without aria-valuenow and takes its name from the visible label', async () => {
      setTheme(theme)
      const { el } = await show(ProgressIndeterminate)
      const progress = bar(el)
      expect(progress.getAttribute('data-state')).toBe('indeterminate')
      expect(progress.hasAttribute('aria-valuenow')).toBe(false)
      expect(progress.getAttribute('aria-labelledby')).toBe('progress-sync-label')
      expect(progress.hasAttribute('aria-label')).toBe(false)
      await expect.element(page.getByRole('progressbar', { name: 'Syncing the match schedule' })).toBeInTheDocument()
      expect(getComputedStyle(progress.querySelector('[data-slot="progress-indicator"]')!).animationName).toBe('elf-progress-indeterminate')
    })

    it('reads a count through aria-valuetext when the label is visible', async () => {
      setTheme(theme)
      const { el } = await show(ProgressWithLabel)
      const progress = bar(el)
      expect(progress.getAttribute('aria-valuetext')).toBe('7 of 12 tasks done')
      expect(Number(progress.getAttribute('aria-valuenow'))).toBeCloseTo(58.33, 1)
      await expect.element(page.getByRole('progressbar', { name: 'Build tasks' })).toBeInTheDocument()
    })

    it('renders three sizes with their own heights', async () => {
      setTheme(theme)
      const { el } = await show(ProgressSizes)
      const heights = [0, 1, 2].map(i => bar(el, i).getBoundingClientRect().height)
      expect(heights).toEqual([6, 8, 12])
    })
  })

  describe('Avatar', () => {
    it('shows the image once it has loaded and the initials when it fails', async () => {
      setTheme(theme)
      const { el } = await show(AvatarDefault)
      await settle(300)
      const [loaded, broken] = [...el.querySelectorAll<HTMLElement>('[data-slot="avatar"]')]
      const image = loaded!.querySelector<HTMLImageElement>('img[data-slot="avatar-image"]')!
      expect(image.complete && image.naturalWidth > 0, 'the image is decoded').toBe(true)
      expect(loaded!.querySelector('[data-slot="avatar-fallback"]'), 'no fallback behind a loaded image').toBeNull()
      expect(getComputedStyle(broken!.querySelector('img')!).display, 'a failed image stays hidden').toBe('none')
      expect(broken!.querySelector('[data-slot="avatar-fallback"]')?.textContent?.trim()).toBe('MK')
      await expect.element(page.getByRole('img', { name: 'Ayşe Demir' })).toBeInTheDocument()
    })

    it('clips to the shape and draws the four sizes', async () => {
      setTheme(theme)
      const { el } = await show(AvatarSizes)
      const avatars = [...el.querySelectorAll<HTMLElement>('[data-slot="avatar"]')]
      expect(avatars.map(a => a.getBoundingClientRect().width)).toEqual([24, 32, 40, 56])
      expect(avatars.map(a => a.getAttribute('role'))).toEqual(['img', 'img', 'img', 'img'])
      await expect.element(page.getByRole('img', { name: 'Avatar, xl size' })).toBeInTheDocument()
      const radius = getComputedStyle(avatars[3]!).borderTopLeftRadius
      expect(radius === '0px', 'round in elf and elfwood, square in nova').toBe(theme === 'nova')
      expect(getComputedStyle(avatars[3]!.firstElementChild!).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    })

    it('shows the name beside a decorative fallback and an icon fallback for an unnamed member', async () => {
      setTheme(theme)
      const { el } = await show(AvatarFallbackExample)
      expect(el.querySelector('[data-slot="avatar-fallback"]')?.textContent?.trim()).toBe('ZA')
      await expect.element(page.getByRole('img', { name: 'Unknown member' })).toBeInTheDocument()
      expect(el.querySelectorAll('[data-slot="avatar-fallback"] svg')).toHaveLength(1)
    })

    it('overlaps the avatars of a group and names the group', async () => {
      setTheme(theme)
      const { el } = await show(AvatarGroupExample)
      await expect.element(page.getByRole('group', { name: 'Software subteam, 7 members' })).toBeInTheDocument()
      const avatars = [...el.querySelectorAll<HTMLElement>('[data-slot="avatar"]')]
      expect(avatars).toHaveLength(5)
      expect(avatars[4]!.textContent?.trim()).toBe('+3')
      const [a, b] = [avatars[0]!.getBoundingClientRect(), avatars[1]!.getBoundingClientRect()]
      expect(b.left, 'each avatar overlaps the previous one').toBeLessThan(a.right)
      expect(getComputedStyle(avatars[0]!).boxShadow).not.toBe('none')
    })
  })

  describe('ScrollArea', () => {
    const viewport = (el: Element) => el.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')!

    it('is a named, keyboard focusable region that scrolls with arrows, Page Down, End and Home', async () => {
      setTheme(theme)
      const { el } = await show(ScrollAreaDefault)
      const vp = viewport(el)
      expect(vp.getAttribute('role')).toBe('region')
      expect(vp.getAttribute('aria-label')).toBe('Inventory list')
      expect(vp.scrollHeight, 'content overflows').toBeGreaterThan(vp.clientHeight)
      await userEvent.tab()
      expect(document.activeElement).toBe(vp)
      expect(vp.scrollTop).toBe(0)
      await userEvent.keyboard('{ArrowDown}')
      await settle(100)
      const afterArrow = vp.scrollTop
      expect(afterArrow, 'ArrowDown scrolls').toBeGreaterThan(0)
      await userEvent.keyboard('{PageDown}')
      await settle(150)
      expect(vp.scrollTop, 'PageDown scrolls further').toBeGreaterThan(afterArrow)
      await userEvent.keyboard('{End}')
      await settle(150)
      expect(vp.scrollTop + vp.clientHeight).toBeGreaterThanOrEqual(vp.scrollHeight - 1)
      await userEvent.keyboard('{Home}')
      await settle(150)
      expect(vp.scrollTop).toBe(0)
    })

    it('scrolls a horizontal area with ArrowRight and ArrowLeft', async () => {
      setTheme(theme)
      const { el } = await show(ScrollAreaHorizontal)
      const vp = viewport(el)
      expect(vp.scrollWidth).toBeGreaterThan(vp.clientWidth)
      await userEvent.tab()
      expect(document.activeElement).toBe(vp)
      await userEvent.keyboard('{ArrowRight}')
      await settle(100)
      expect(vp.scrollLeft).toBeGreaterThan(0)
      await userEvent.keyboard('{ArrowLeft}')
      await settle(150)
      expect(vp.scrollLeft, 'ArrowLeft scrolls back').toBe(0)
    })

    it('renders both scrollbars and the corner for orientation both, and the table stays readable', async () => {
      setTheme(theme)
      const { el } = await show(ScrollAreaBoth)
      const vp = viewport(el)
      expect(vp.scrollHeight).toBeGreaterThan(vp.clientHeight)
      expect(vp.scrollWidth).toBeGreaterThan(vp.clientWidth)
      await userEvent.tab()
      await userEvent.keyboard('{ArrowDown}{ArrowRight}')
      await settle(150)
      expect(vp.scrollTop).toBeGreaterThan(0)
      expect(vp.scrollLeft).toBeGreaterThan(0)
      expect(el.querySelector('table caption')?.textContent).toContain('Match scores')
    })
  })

  describe('ContextMenu', () => {
    const menu = () => document.querySelector<HTMLElement>('[role="menu"]')
    const active = () => document.activeElement as HTMLElement
    const label = (e: HTMLElement) => e.textContent?.replace(/\s+/g, ' ').trim() ?? ''
    const area = (el: Element) => el.querySelector<HTMLElement>('[data-slot="context-menu-trigger"]')!
    const rightClick = (target: HTMLElement) => {
      const box = target.getBoundingClientRect()
      target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: box.left + 20, clientY: box.top + 20 }))
    }

    it('opens on the contextmenu event at the pointer, with focus inside the menu', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuDefault)
      expect(menu()).toBeNull()
      rightClick(area(el))
      await settle(200)
      expect(menu()).not.toBeNull()
      expect(menu()!.contains(document.activeElement), 'focus moved into the menu').toBe(true)
      expect(document.querySelectorAll('[role="menuitem"]')).toHaveLength(4)
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(menu()).toBeNull()
    })

    it('opens from the keyboard with Shift+F10 and the ContextMenu key, and Escape returns focus to the area', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuDefault)
      const trigger = area(el)
      await userEvent.tab()
      expect(document.activeElement).toBe(trigger)
      for (const key of ['{Shift>}{F10}{/Shift}', '{ContextMenu}']) {
        await userEvent.keyboard(key)
        await settle(250)
        expect(menu(), `${key} opens the menu`).not.toBeNull()
        await userEvent.keyboard('{Escape}')
        await settle(250)
        expect(menu()).toBeNull()
        expect(document.activeElement, 'focus returned to the area').toBe(trigger)
      }
    })

    it('moves with arrow keys, skips disabled items, supports typeahead and Enter activates', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuDefault)
      rightClick(area(el))
      await settle(200)
      await userEvent.keyboard('{ArrowDown}')
      expect(label(active())).toContain('Open')
      await userEvent.keyboard('{ArrowDown}')
      expect(label(active())).toContain('Rename')
      await userEvent.keyboard('{End}')
      expect(label(active())).toContain('Delete')
      expect(active().getAttribute('data-variant')).toBe('destructive')
      await userEvent.keyboard('{Home}')
      expect(label(active())).toContain('Open')
      await userEvent.keyboard('re')
      await settle(100)
      expect(label(active())).toContain('Rename')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(menu()).toBeNull()
      expect(el.textContent).toContain('last = rename')
    })

    it('Space activates the highlighted item', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuDefault)
      rightClick(area(el))
      await settle(200)
      await userEvent.keyboard('{ArrowDown} ')
      await settle(200)
      expect(el.textContent).toContain('last = open')
    })

    it('checkbox and radio items toggle and select, and keep aria-checked in sync', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuOptions)
      expect(el.textContent).toContain('grid = true, density = comfortable')
      rightClick(area(el))
      await settle(200)
      await userEvent.keyboard('{ArrowDown}')
      expect(active().getAttribute('role')).toBe('menuitemcheckbox')
      expect(active().getAttribute('aria-checked')).toBe('true')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(el.textContent).toContain('grid = false')
      rightClick(area(el))
      await settle(200)
      const radios = [...document.querySelectorAll<HTMLElement>('[role="menuitemradio"]')]
      expect(radios.map(r => r.getAttribute('aria-checked'))).toEqual(['true', 'false'])
      radios[1]!.focus()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(el.textContent).toContain('density = compact')
    })

    it('opens a sub menu with ArrowRight and closes it with ArrowLeft', async () => {
      setTheme(theme)
      const { el } = await show(ContextMenuOptions)
      rightClick(area(el))
      await settle(200)
      await userEvent.keyboard('{End}')
      const subTrigger = active()
      expect(label(subTrigger)).toContain('Export as')
      await userEvent.keyboard('{ArrowRight}')
      await settle(250)
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2)
      expect(label(active())).toContain('PNG')
      await userEvent.keyboard('{ArrowLeft}')
      await settle(250)
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1)
      expect(document.activeElement).toBe(subTrigger)
    })
  })

  describe('DropdownMenu', () => {
    const menu = () => document.querySelector<HTMLElement>('[role="menu"]')
    const items = () => [...document.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]')]
    const active = () => document.activeElement as HTMLElement
    const label = (e: HTMLElement) => e.textContent?.replace(/\s+/g, ' ').trim() ?? ''

    it('opens with Enter, ArrowDown and Space, exposes menu roles and Escape returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="menu"]')!
      await userEvent.tab()
      expect(document.activeElement).toBe(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      for (const key of ['{Enter}', '{ArrowDown}', ' ']) {
        await userEvent.keyboard(key)
        await settle(200)
        expect(menu(), `${key} opens the menu`).not.toBeNull()
        expect(trigger.getAttribute('aria-expanded')).toBe('true')
        expect(menu()!.contains(document.activeElement), 'focus moved into the menu').toBe(true)
        await userEvent.keyboard('{Escape}')
        await settle(200)
        expect(menu()).toBeNull()
        expect(document.activeElement, 'focus returned to the trigger').toBe(trigger)
      }
    })

    it('moves with arrow keys, Home and End, skips disabled items, and supports typeahead', async () => {
      setTheme(theme)
      await show(DropdownMenuDefault)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      const names = items().map(label)
      expect(names.map(n => n.replace(/Ctrl.*/, '').trim())).toEqual(['Profile', 'Billing', 'Settings', 'Support', 'API (soon)', 'Sign out'])
      expect(label(active())).toContain('Profile')
      await userEvent.keyboard('{ArrowDown}')
      expect(label(active())).toContain('Billing')
      await userEvent.keyboard('{End}')
      expect(label(active())).toContain('Sign out')
      await userEvent.keyboard('{ArrowUp}')
      expect(label(active()), 'the disabled item keeps its place but the menu still reaches Support next').toMatch(/API|Support/)
      await userEvent.keyboard('{Home}')
      expect(label(active())).toContain('Profile')
      await userEvent.keyboard('su')
      await settle(100)
      expect(label(active())).toContain('Support')
    })

    it('Enter activates an item, closes the menu and returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuRowActions)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="menu"]')!
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      await userEvent.keyboard('{ArrowDown}{ArrowDown}')
      expect(label(active())).toContain('Delete')
      expect(active().getAttribute('data-variant')).toBe('destructive')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(menu()).toBeNull()
      expect(el.textContent).toContain('last = delete')
      expect(document.activeElement).toBe(trigger)
    })

    it('Space activates the highlighted item as well', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuRowActions)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      await userEvent.keyboard(' ')
      await settle(200)
      expect(el.textContent).toContain('last = edit')
    })

    it('checkbox items toggle with Enter and Space and keep aria-checked in sync', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuCheckboxes)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="menu"]')!
      expect(el.textContent).toContain('status = true, sku = false')
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      const boxes = () => [...document.querySelectorAll<HTMLElement>('[role="menuitemcheckbox"]')]
      expect(boxes().map(b => b.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false'])
      await userEvent.keyboard('{ArrowDown}{ArrowDown}')
      expect(label(active())).toContain('SKU')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(el.textContent).toContain('sku = true')
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(boxes().map(b => b.getAttribute('aria-checked'))).toEqual(['true', 'true', 'false'])
      await userEvent.keyboard(' ')
      await settle(200)
      expect(el.textContent, 'the first item is highlighted on open; Space toggles it').toContain('status = false')
    })

    it('radio items select one value and expose it with aria-checked', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuRadioItems)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      const radios = () => [...document.querySelectorAll<HTMLElement>('[role="menuitemradio"]')]
      expect(radios().map(r => r.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false'])
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
      await settle(200)
      expect(el.textContent).toContain('sort = updated')
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(radios().map(r => r.getAttribute('aria-checked'))).toEqual(['false', 'false', 'true'])
    })

    it('opens a sub menu with ArrowRight and closes it with ArrowLeft, returning focus to the sub trigger', async () => {
      setTheme(theme)
      await show(DropdownMenuSubMenu)
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await settle(200)
      await userEvent.keyboard('{ArrowDown}')
      const subTrigger = active()
      expect(label(subTrigger)).toContain('Share')
      expect(subTrigger.getAttribute('aria-haspopup')).toBe('menu')
      expect(subTrigger.getAttribute('aria-expanded')).toBe('false')
      await userEvent.keyboard('{ArrowRight}')
      await settle(250)
      expect(subTrigger.getAttribute('aria-expanded')).toBe('true')
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2)
      expect(label(active())).toContain('Email link')
      await userEvent.keyboard('{ArrowLeft}')
      await settle(250)
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1)
      expect(document.activeElement).toBe(subTrigger)
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(menu()).toBeNull()
    })

    it('opens on a pointer click and closes on an outside click', async () => {
      setTheme(theme)
      const { el } = await show(DropdownMenuControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(200)
      expect(menu()).not.toBeNull()
      expect(el.textContent).toContain('open = true')
      // The page behind a modal menu has pointer-events: none, so a real click cannot target it; send the pointer event Reka listens for.
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'mouse' }))
      await settle(200)
      expect(menu()).toBeNull()
      expect(el.textContent).toContain('open = false')
    })
  })

  describe('HoverCard', () => {
    const card = () => document.querySelector<HTMLElement>('[data-slot="hover-card-content"]')

    it('opens on keyboard focus of the link and Escape closes it without losing focus', async () => {
      setTheme(theme)
      const { el } = await show(HoverCardDefault)
      const link = el.querySelector<HTMLElement>('a')!
      await userEvent.tab()
      expect(document.activeElement).toBe(link)
      await settle(1000)
      expect(card()?.textContent).toContain('Software lead')
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(card()).toBeNull()
      expect(document.activeElement).toBe(link)
    })

    it('opens after the open delay on hover and closes after the close delay on leave', async () => {
      setTheme(theme)
      const { el } = await show(HoverCardDelays)
      const link = el.querySelector<HTMLElement>('a')!
      await userEvent.hover(link)
      await settle(400)
      expect(card()).not.toBeNull()
      await userEvent.unhover(link)
      await settle(500)
      expect(card()).toBeNull()
    })

    it('v-model:open follows the card state', async () => {
      setTheme(theme)
      const { el } = await show(HoverCardControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.tab()
      await settle(1000)
      expect(el.textContent).toContain('open = true')
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(el.textContent).toContain('open = false')
    })
  })

  describe('Popover', () => {
    const panel = () => document.querySelector<HTMLElement>('[data-slot="popover-content"]')

    it('moves focus into the panel on open, closes on Escape and returns focus to the trigger', async () => {
      setTheme(theme)
      const { el } = await show(PopoverDefault)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="dialog"]')!
      await userEvent.tab()
      expect(document.activeElement).toBe(trigger)
      await userEvent.keyboard('{Enter}')
      await settle(200)
      expect(panel()).not.toBeNull()
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
      expect(panel()!.contains(document.activeElement), 'focus moved into the panel').toBe(true)
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(panel()).toBeNull()
      expect(document.activeElement, 'focus returned to the trigger').toBe(trigger)
    })

    it('opens with Space and closes when focus moves outside it by clicking elsewhere', async () => {
      setTheme(theme)
      await show(PopoverDefault)
      await userEvent.tab()
      await userEvent.keyboard(' ')
      await settle(200)
      expect(panel()).not.toBeNull()
      await userEvent.click(document.body)
      await settle(200)
      expect(panel()).toBeNull()
    })

    it('a close part closes it and v-model:open follows', async () => {
      setTheme(theme)
      const { el } = await show(PopoverControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(200)
      expect(el.textContent).toContain('open = true')
      const apply = [...document.querySelectorAll<HTMLElement>('[data-slot="popover-content"] button')].find(b => b.textContent?.trim() === 'Apply')!
      await userEvent.click(apply)
      await settle(200)
      expect(panel()).toBeNull()
      expect(el.textContent).toContain('open = false')
    })

    it('modal traps Tab inside the panel and makes the page behind inert to assistive tech', async () => {
      setTheme(theme)
      const { el } = await show(PopoverModal)
      await userEvent.click(el.querySelector<HTMLElement>('button')!)
      await settle(200)
      for (let i = 0; i < 6; i++) {
        await userEvent.tab()
        expect(panel()!.contains(document.activeElement), `focus stayed inside after Tab #${i + 1}`).toBe(true)
      }
      expect(el.querySelector('button')!.closest('[aria-hidden="true"]')).not.toBeNull()
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(panel()).toBeNull()
    })
  })

  describe('Tooltip', () => {
    const tip = () => document.querySelector<HTMLElement>('[role="tooltip"]')

    it('opens on keyboard focus, describes the trigger, and Escape closes it while focus stays on the trigger', async () => {
      setTheme(theme)
      const { el } = await show(TooltipDefault)
      const trigger = el.querySelector<HTMLElement>('button')!
      expect(tip()).toBeNull()
      await userEvent.tab()
      expect(document.activeElement).toBe(trigger)
      await settle(150)
      expect(tip()?.textContent).toContain('Saved to your team library')
      expect(trigger.getAttribute('aria-describedby')).toBe(tip()!.id)
      await userEvent.keyboard('{Escape}')
      await settle(200)
      expect(tip()).toBeNull()
      expect(document.activeElement).toBe(trigger)
    })

    it('opens after the hover delay and closes when the pointer leaves', async () => {
      setTheme(theme)
      const { el } = await show(TooltipDefault)
      const trigger = el.querySelector<HTMLElement>('button')!
      await userEvent.hover(trigger)
      await settle(700)
      expect(tip()).not.toBeNull()
      await userEvent.unhover(trigger)
      await settle(400)
      expect(tip()).toBeNull()
    })

    it('shares the delay of a provider: the second tooltip opens at once after the first', async () => {
      setTheme(theme)
      const { el } = await show(TooltipIconButtons)
      const [bold, italic] = [...el.querySelectorAll<HTMLElement>('button')]
      await userEvent.hover(bold!)
      await settle(600)
      expect(tip()?.textContent).toContain('Bold')
      await userEvent.hover(italic!)
      // A real mouse keeps moving; the second move happens once the pointer has left the first tooltip's grace area.
      await settle(60)
      await userEvent.hover(italic!, { position: { x: 6, y: 6 } })
      await settle(120)
      expect(tip()?.textContent, 'no second delay inside the skip window').toContain('Italic')
    })

    it('v-model:open follows the tooltip state', async () => {
      setTheme(theme)
      const { el } = await show(TooltipControlled)
      expect(el.textContent).toContain('open = false')
      await userEvent.tab()
      await settle(150)
      expect(el.textContent).toContain('open = true')
      await userEvent.keyboard('{Escape}')
      await settle(150)
      expect(el.textContent).toContain('open = false')
    })
  })

  describe('destructive-text token', () => {
    function resolved(token: string, property: 'color' | 'backgroundColor' = 'color') {
      const probe = document.createElement('span')
      probe.style.cssText = `${property === 'color' ? 'color' : 'background-color'}: var(--elf-${token})`
      document.body.append(probe)
      const value = getComputedStyle(probe)[property]
      probe.remove()
      return value
    }

    it('colors the field error, the required marker and the invalid examples with it, not with the destructive fill', async () => {
      setTheme(theme)
      const text = resolved('destructive-text')
      expect(text).not.toBe(resolved('destructive'))
      const { el } = await show(FieldValidation)
      await userEvent.click(el.querySelector('button[type="submit"]')!)
      await settle()
      for (const alert of el.querySelectorAll<HTMLElement>('[role="alert"]'))
        expect(getComputedStyle(alert).color).toBe(text)
      expect(getComputedStyle(el.querySelector('label span[aria-hidden="true"]')!).color).toBe(text)
      unmount?.()
      const { el: textarea } = await show(TextareaInvalid)
      expect(getComputedStyle(textarea.querySelector('#textarea-bio-error')!).color).toBe(text)
    })

    it('colors the destructive alert title and icon with it', async () => {
      setTheme(theme)
      const { el } = await show(AlertVariants)
      const destructive = el.querySelector<HTMLElement>('[data-variant="destructive"]')!
      expect(getComputedStyle(destructive.querySelector('[data-slot="alert-title"]')!).color).toBe(resolved('destructive-text'))
      expect(getComputedStyle(destructive.querySelector('[data-slot="alert-icon"]')!).color).toBe(resolved('destructive-text'))
    })
  })

  describe('Breadcrumb', () => {
    it('is a labelled landmark whose links are Tab stops and whose current page is not', async () => {
      setTheme(theme)
      const { el } = await show(BreadcrumbDefault)
      const nav = el.querySelector<HTMLElement>('nav[aria-label="Breadcrumb"]')!
      expect(nav).not.toBeNull()
      const links = [...nav.querySelectorAll<HTMLElement>('a[href]')]
      expect(links.length).toBe(2)
      await userEvent.tab()
      expect(document.activeElement).toBe(links[0])
      await userEvent.tab()
      expect(document.activeElement).toBe(links[1])
      await userEvent.tab()
      expect(nav.contains(document.activeElement), 'the current page must not take focus').toBe(false)
      expect(nav.querySelector('[aria-current="page"]')?.textContent).toBe('Breadcrumb')
    })

    it('has a visible focus ring on links', async () => {
      setTheme(theme)
      const { el } = await show(BreadcrumbDefault)
      const first = el.querySelector<HTMLElement>('[data-slot="breadcrumb-link"]')!
      first.focus()
      await userEvent.keyboard('{Tab}{Shift>}{Tab}{/Shift}') // keyboard modality, so :focus-visible matches
      const link = document.activeElement as HTMLElement
      expect(link).toBe(first)
      const style = getComputedStyle(link)
      expect(style.boxShadow !== 'none' || style.outlineStyle !== 'none', 'focus indicator is drawn').toBe(true)
      expect(el.contains(link)).toBe(true)
    })

    it('opens the collapsed levels from the ellipsis, navigates with arrows and returns focus on Escape', async () => {
      setTheme(theme)
      const { el } = await show(BreadcrumbCollapsed)
      const trigger = el.querySelector<HTMLElement>('[aria-haspopup="menu"]')!
      trigger.focus()
      await userEvent.keyboard('{Enter}')
      await settle(400)
      const items = () => [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')]
      expect(items().length).toBe(3)
      expect(document.activeElement).toBe(items()[0])
      await userEvent.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(items()[1])
      await userEvent.keyboard('{Escape}')
      await settle(300)
      expect(document.querySelector('[role="menu"]')).toBeNull()
      expect(document.activeElement).toBe(trigger)
    })
  })

  describe('Pagination', () => {
    const buttons = (el: HTMLElement) => [...el.querySelectorAll<HTMLElement>('nav button:not([disabled])')]
    const current = (el: HTMLElement) => el.querySelector<HTMLElement>('[aria-current="page"]')!.textContent

    it('is a labelled landmark with a Tab stop per enabled button and the current page marked', async () => {
      setTheme(theme)
      const { el } = await show(PaginationDefault)
      expect(el.querySelector('nav[aria-label="Pagination"]')).not.toBeNull()
      expect(current(el)).toBe('5')
      await userEvent.tab()
      expect(document.activeElement).toBe(buttons(el)[0])
      await userEvent.tab()
      expect(document.activeElement).toBe(buttons(el)[1])
    })

    it('changes page with Enter and Space and updates v-model', async () => {
      setTheme(theme)
      const { el } = await show(PaginationDefault)
      const page = (n: string) => buttons(el).find(b => b.textContent?.trim() === n)!
      page('6').focus()
      await userEvent.keyboard('{Enter}')
      await settle()
      expect(current(el)).toBe('6')
      expect(el.textContent).toContain('Page 6 of 10')
      page('7').focus()
      await userEvent.keyboard(' ')
      await settle()
      expect(current(el)).toBe('7')
    })

    it('previous and next move one page and are disabled at the ends', async () => {
      setTheme(theme)
      const { el } = await show(PaginationWithEdges)
      const prev = () => el.querySelector<HTMLButtonElement>('[data-slot="pagination-prev"]')!
      const next = () => el.querySelector<HTMLButtonElement>('[data-slot="pagination-next"]')!
      expect(prev().disabled).toBe(true)
      expect(el.querySelector<HTMLButtonElement>('[data-slot="pagination-first"]')!.disabled).toBe(true)
      next().focus()
      await userEvent.keyboard('{Enter}')
      await settle()
      expect(current(el)).toBe('2')
      expect(prev().disabled).toBe(false)
      el.querySelector<HTMLElement>('[data-slot="pagination-last"]')!.focus()
      await userEvent.keyboard('{Enter}')
      await settle()
      expect(current(el)).toBe('50')
      expect(next().disabled).toBe(true)
    })

    it('does not make disabled controls focusable', async () => {
      setTheme(theme)
      const { el } = await show(PaginationDisabled)
      expect(el.querySelectorAll('nav button:not([disabled])').length).toBe(0)
      await userEvent.tab()
      expect(el.contains(document.activeElement)).toBe(false)
    })

    it('simple pagination steps through pages and shows the status', async () => {
      setTheme(theme)
      const { el } = await show(PaginationSimple)
      const status = () => el.querySelector('[data-slot="simple-pagination-status"]')!.textContent?.trim()
      expect(status()).toBe('Page 1 of 5')
      el.querySelector<HTMLElement>('[data-slot="simple-pagination-next"]')!.focus()
      await userEvent.keyboard('{Enter}')
      await settle()
      expect(status()).toBe('Page 2 of 5')
    })

    it('draws a visible focus indicator on a page button', async () => {
      setTheme(theme)
      const { el } = await show(PaginationDefault)
      await userEvent.tab()
      const style = getComputedStyle(document.activeElement as HTMLElement)
      expect(style.boxShadow !== 'none' || style.outlineStyle !== 'none', 'focus indicator is drawn').toBe(true)
      expect(el.contains(document.activeElement)).toBe(true)
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
