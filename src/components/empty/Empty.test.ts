import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '.'

describe('Empty', () => {
  it('composes all parts with data-slot markers', () => {
    const w = mount({
      components: { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle },
      template: `
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">i</EmptyMedia>
            <EmptyTitle>Nothing here</EmptyTitle>
            <EmptyDescription>Add something.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>Action</EmptyContent>
        </Empty>`,
    })
    for (const slot of ['empty', 'empty-header', 'empty-media', 'empty-title', 'empty-description', 'empty-content'])
      expect(w.find(`[data-slot="${slot}"]`).exists(), slot).toBe(true)
    expect(w.find('h3').text()).toBe('Nothing here')
    expect(w.find('p').text()).toBe('Add something.')
  })

  it('renders the media as decorative with an icon or bare variant', () => {
    const icon = mount(EmptyMedia, { props: { variant: 'icon' } })
    expect(icon.attributes('aria-hidden')).toBe('true')
    expect(icon.attributes('data-variant')).toBe('icon')
    expect(icon.classes()).toContain('bg-muted')
    const bare = mount(EmptyMedia)
    expect(bare.attributes('data-variant')).toBe('default')
    expect(bare.classes()).not.toContain('bg-muted')
  })

  it('lets the title change its heading level', () => {
    expect(mount(EmptyTitle, { props: { as: 'h2' } }).element.tagName).toBe('H2')
  })

  it('merges custom classes', () => {
    expect(mount(Empty, { props: { class: 'border-solid' } }).classes()).toContain('border-solid')
  })
})
