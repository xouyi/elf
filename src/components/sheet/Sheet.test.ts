import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, sheetVariants } from '.'

const Harness = {
  components: { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger },
  props: { side: { type: String, default: undefined }, size: { type: String, default: undefined }, showCloseButton: { type: Boolean, default: true } },
  template: `
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent :side="side" :size="size" :show-close-button="showCloseButton">
        <SheetHeader>
          <SheetTitle>Edit item</SheetTitle>
          <SheetDescription>Make changes.</SheetDescription>
        </SheetHeader>
        <SheetFooter><SheetClose>Done</SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

const content = () => document.body.querySelector<HTMLElement>('[role="dialog"]')

async function open(props: Record<string, unknown> = {}) {
  wrapper = mount(Harness, { props, attachTo: document.body })
  await wrapper.get('[data-slot="sheet-trigger"]').trigger('click')
  await nextTick()
}

describe('Sheet', () => {
  it('is closed initially and opens as a labelled dialog with an overlay', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    expect(content()).toBeNull()
    await wrapper.get('[data-slot="sheet-trigger"]').trigger('click')
    await nextTick()
    const dialog = content()!
    expect(dialog.getAttribute('aria-labelledby')).toBe(dialog.querySelector('[data-slot="sheet-title"]')!.id)
    expect(dialog.getAttribute('aria-describedby')).toBe(dialog.querySelector('[data-slot="sheet-description"]')!.id)
    expect(document.body.querySelector('[data-slot="sheet-overlay"]')).not.toBeNull()
  })

  it('defaults to the right side and reflects the side as data-side', async () => {
    await open()
    expect(content()!.getAttribute('data-side')).toBe('right')
    expect(content()!.className).toContain('right-0')
  })

  it.each(['top', 'right', 'bottom', 'left'] as const)('anchors to the %s edge', async (side) => {
    await open({ side })
    expect(content()!.getAttribute('data-side')).toBe(side)
    expect(content()!.className).toContain(`${side}-0`)
  })

  it('pads the bottom sheet by the safe area', () => {
    expect(sheetVariants({ side: 'bottom' })).toContain('env(safe-area-inset-bottom)')
  })

  it('applies the size to the width of side sheets and the height of top and bottom sheets', () => {
    expect(sheetVariants({ side: 'right', size: 'sm' })).toContain('sm:max-w-xs')
    expect(sheetVariants({ side: 'left', size: 'lg' })).toContain('sm:max-w-xl')
    expect(sheetVariants({ side: 'bottom', size: 'sm' })).toContain('max-h-[40dvh]')
    expect(sheetVariants({ side: 'top', size: 'full' })).toContain('h-dvh')
  })

  it('renders the corner close button unless disabled, and closes with it', async () => {
    await open()
    const close = document.body.querySelector<HTMLElement>('[data-slot="sheet-content"] > [data-slot="sheet-close"]')!
    expect(close.textContent).toContain('Close')
    close.click()
    await new Promise(r => setTimeout(r, 20))
    expect(content()).toBeNull()
    wrapper?.unmount()
    await open({ showCloseButton: false })
    expect(document.body.querySelector('[data-slot="sheet-content"] > [data-slot="sheet-close"]')).toBeNull()
  })

  it('closes with Escape', async () => {
    await open()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise(r => setTimeout(r, 20))
    expect(content()).toBeNull()
  })
})
