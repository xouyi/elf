import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '.'

const Harness = {
  components: { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger },
  template: `
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes.</DialogDescription>
        </DialogHeader>
        <input aria-label="name" />
        <DialogFooter show-close-button />
      </DialogContent>
    </Dialog>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

const content = () => document.body.querySelector('[role="dialog"]')

describe('Dialog', () => {
  it('is closed initially and exposes aria attributes on the trigger', () => {
    wrapper = mount(Harness, { attachTo: document.body })
    expect(content()).toBeNull()
    const trigger = wrapper.get('[data-slot="dialog-trigger"]')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('opens on trigger click with labelled content', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await wrapper.get('[data-slot="dialog-trigger"]').trigger('click')
    await nextTick()
    const dialog = content()!
    expect(dialog).not.toBeNull()
    const title = dialog.querySelector('[data-slot="dialog-title"]')!
    const desc = dialog.querySelector('[data-slot="dialog-description"]')!
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id)
    expect(dialog.getAttribute('aria-describedby')).toBe(desc.id)
    expect(document.body.querySelector('[data-slot="dialog-overlay"]')).not.toBeNull()
  })

  it('closes with the Escape key', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await wrapper.get('[data-slot="dialog-trigger"]').trigger('click')
    await nextTick()
    expect(content()).not.toBeNull()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise(r => setTimeout(r, 20))
    expect(content()).toBeNull()
  })

  it('closes with the close button', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await wrapper.get('[data-slot="dialog-trigger"]').trigger('click')
    await nextTick()
    const close = document.body.querySelector<HTMLElement>('[data-slot="dialog-content"] > [data-slot="dialog-close"]')!
    expect(close.textContent).toContain('Close')
    close.click()
    await new Promise(r => setTimeout(r, 20))
    expect(content()).toBeNull()
  })

  it('renders the footer close button when requested', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await wrapper.get('[data-slot="dialog-trigger"]').trigger('click')
    await nextTick()
    expect(document.body.querySelector('[data-slot="dialog-footer"] button')?.textContent).toContain('Close')
  })
})
