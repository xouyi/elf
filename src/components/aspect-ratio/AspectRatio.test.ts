import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AspectRatio } from '.'

describe('AspectRatio', () => {
  it('defaults to a square and renders the slot inside the frame', () => {
    const w = mount(AspectRatio, { slots: { default: '<span id="x">media</span>' } })
    const outer = w.element as HTMLElement
    expect(outer.getAttribute('data-reka-aspect-ratio-wrapper')).toBe('')
    expect(outer.style.paddingBottom).toBe('100%')
    const frame = w.get('[data-slot="aspect-ratio"]')
    expect(frame.get('#x').text()).toBe('media')
  })

  it('derives the height from the ratio', () => {
    const w = mount(AspectRatio, { props: { ratio: 16 / 9 } })
    expect((w.element as HTMLElement).style.paddingBottom).toBe('56.25%')
  })

  it('merges class last and keeps the framing classes', () => {
    const w = mount(AspectRatio, { props: { class: 'rounded-none border' } })
    const frame = w.get('[data-slot="aspect-ratio"]')
    expect(frame.classes()).toEqual(expect.arrayContaining(['overflow-hidden', 'border', 'rounded-none']))
    expect(frame.classes()).not.toContain('rounded-lg')
  })
})
