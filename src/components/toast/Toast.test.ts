import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { toast, Toaster, toastVariants, useToast } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  toast.dismiss()
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const items = () => [...document.body.querySelectorAll<HTMLElement>('[data-slot="toast"]')]
const flush = () => new Promise(r => setTimeout(r, 60))

async function mountToaster(props: Record<string, unknown> = {}) {
  wrapper = mount(Toaster, { props, attachTo: document.body })
  await flush()
}

describe('Toast', () => {
  it('useToast returns the shared toast function', () => {
    expect(useToast().toast).toBe(toast)
  })

  it('renders a toast with title and description in the viewport', async () => {
    await mountToaster()
    toast('Saved', { description: 'All good' })
    await flush()
    const [item] = items()
    expect(item).toBeDefined()
    expect(item!.getAttribute('data-variant')).toBe('default')
    expect(item!.querySelector('[data-slot="toast-title"]')!.textContent).toBe('Saved')
    expect(item!.querySelector('[data-slot="toast-description"]')!.textContent).toBe('All good')
    const region = document.querySelector('[data-slot="toaster"]')!.closest('[role="region"]')!
    expect(region.getAttribute('aria-label')).toBe('Notifications (F8)')
  })

  it('replays toasts shown before the toaster mounted', async () => {
    toast('Early')
    await mountToaster()
    expect(items().map(i => i.textContent)).toEqual([expect.stringContaining('Early')])
  })

  it.each([['success', 'success'], ['warning', 'warning'], ['error', 'destructive']] as const)('toast.%s uses the %s variant with an icon', async (method, variant) => {
    await mountToaster()
    toast[method]('Message')
    await flush()
    expect(items()[0]!.getAttribute('data-variant')).toBe(variant)
    expect(items()[0]!.querySelector('[data-slot="toast-icon"] svg')).not.toBeNull()
  })

  it('has no icon for the default variant', async () => {
    await mountToaster()
    toast('Plain')
    await flush()
    expect(items()[0]!.querySelector('[data-slot="toast-icon"]')).toBeNull()
  })

  it('limits the visible toasts and keeps older ones queued', async () => {
    await mountToaster({ limit: 2 })
    toast('one')
    toast('two')
    toast('three')
    await flush()
    expect(items()).toHaveLength(3)
    expect(items().filter(i => !i.hasAttribute('data-limited'))).toHaveLength(2)
  })

  it('runs the action and closes the toast; altText defaults to the label', async () => {
    await mountToaster()
    let clicked = 0
    toast('Removed', { action: { label: 'Undo', onClick: () => { clicked += 1 } } })
    await flush()
    const action = document.querySelector<HTMLElement>('[data-slot="toast-action"]')!
    expect(action.textContent?.trim()).toBe('Undo')
    action.click()
    await flush()
    expect(clicked).toBe(1)
    await new Promise(r => setTimeout(r, 200))
    expect(items()).toHaveLength(0)
  })

  it('dismisses by id and renders the dismiss button with the configured label', async () => {
    await mountToaster({ closeLabel: 'Kapat' })
    const id = toast('Bye')
    await flush()
    expect(items()[0]!.querySelector('[data-slot="toast-close"]')!.textContent).toContain('Kapat')
    toast.dismiss(id)
    await new Promise(r => setTimeout(r, 250))
    expect(items()).toHaveLength(0)
  })

  it('omits the dismiss button when closeButton is false', async () => {
    await mountToaster({ closeButton: false })
    toast('No close')
    await flush()
    expect(document.querySelector('[data-slot="toast-close"]')).toBeNull()
  })

  it('updates a toast in place', async () => {
    await mountToaster()
    const id = toast('First')
    await flush()
    toast.update(id, { message: 'Second', variant: 'success' })
    await flush()
    expect(items()).toHaveLength(1)
    expect(items()[0]!.textContent).toContain('Second')
    expect(items()[0]!.getAttribute('data-variant')).toBe('success')
  })

  it('promise: loading, then success', async () => {
    await mountToaster()
    let resolve!: (v: string) => void
    const task = new Promise<string>((r) => { resolve = r })
    const result = toast.promise(task, { loading: 'Uploading', success: v => `${v} uploaded`, error: 'Failed' })
    await flush()
    expect(items()[0]!.getAttribute('data-status')).toBe('loading')
    expect(items()[0]!.textContent).toContain('Uploading')
    resolve('a.csv')
    await expect(result).resolves.toBe('a.csv')
    await flush()
    expect(items()).toHaveLength(1)
    expect(items()[0]!.textContent).toContain('a.csv uploaded')
    expect(items()[0]!.getAttribute('data-variant')).toBe('success')
  })

  it('promise: rejection shows a destructive toast and rethrows', async () => {
    await mountToaster()
    const task = Promise.reject(new Error('nope'))
    await expect(toast.promise(task, { loading: 'Uploading', success: 'ok', error: e => (e as Error).message })).rejects.toThrow('nope')
    await flush()
    expect(items()[0]!.getAttribute('data-variant')).toBe('destructive')
    expect(items()[0]!.textContent).toContain('nope')
  })

  it('exposes variant classes', () => {
    expect(toastVariants({ variant: 'destructive' })).toContain('border-destructive/50')
    expect(toastVariants({ variant: 'default' })).toContain('bg-popover')
  })
})
