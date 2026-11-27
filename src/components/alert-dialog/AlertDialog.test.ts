import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '.'

const Harness = {
  components: { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger },
  props: { variant: { type: String, default: 'default' } },
  emits: ['confirm'],
  template: `
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete?</AlertDialogTitle>
          <AlertDialogDescription>Cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction :variant="variant" @click="$emit('confirm')">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

const content = () => document.body.querySelector('[role="alertdialog"]')

async function open(props: Record<string, unknown> = {}) {
  wrapper = mount(Harness, { props, attachTo: document.body })
  await wrapper.get('[data-slot="alert-dialog-trigger"]').trigger('click')
  await nextTick()
}

describe('AlertDialog', () => {
  it('is closed initially', () => {
    wrapper = mount(Harness, { attachTo: document.body })
    expect(content()).toBeNull()
  })

  it('opens as an alertdialog labelled by its title and description', async () => {
    await open()
    const dialog = content()!
    expect(dialog).not.toBeNull()
    expect(dialog.getAttribute('aria-labelledby')).toBe(dialog.querySelector('[data-slot="alert-dialog-title"]')!.id)
    expect(dialog.getAttribute('aria-describedby')).toBe(dialog.querySelector('[data-slot="alert-dialog-description"]')!.id)
    expect(document.body.querySelector('[data-slot="alert-dialog-overlay"]')).not.toBeNull()
  })

  it('has no corner close button', async () => {
    await open()
    expect(content()!.querySelector('[data-slot="dialog-close"]')).toBeNull()
  })

  it('renders the action as a default button and the cancel as an outline button', async () => {
    await open()
    expect(document.body.querySelector('[data-slot="alert-dialog-action"]')!.getAttribute('data-variant')).toBe('default')
    expect(document.body.querySelector('[data-slot="alert-dialog-cancel"]')!.className).toContain('border-input')
  })

  it('styles a destructive action', async () => {
    await open({ variant: 'destructive' })
    const action = document.body.querySelector('[data-slot="alert-dialog-action"]')!
    expect(action.getAttribute('data-variant')).toBe('destructive')
    expect(action.className).toContain('bg-destructive')
  })

  it('closes and emits the click when the action is used', async () => {
    await open()
    document.body.querySelector<HTMLElement>('[data-slot="alert-dialog-action"]')!.click()
    await new Promise(r => setTimeout(r, 20))
    expect(wrapper!.emitted('confirm')).toHaveLength(1)
    expect(content()).toBeNull()
  })

  it('closes from Cancel', async () => {
    await open()
    document.body.querySelector<HTMLElement>('[data-slot="alert-dialog-cancel"]')!.click()
    await new Promise(r => setTimeout(r, 20))
    expect(content()).toBeNull()
  })
})
