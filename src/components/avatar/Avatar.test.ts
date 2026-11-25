import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Avatar, AvatarFallback, AvatarGroup, avatarVariants } from '.'

function avatar(props: Record<string, unknown> = {}, fallback: Record<string, unknown> = { name: 'Ayşe Demir' }) {
  return mount(Avatar, { props, slots: { default: () => h(AvatarFallback, fallback) } })
}

describe('Avatar', () => {
  it('renders a root with data-slots and the default size', () => {
    const w = avatar()
    expect(w.attributes('data-slot')).toBe('avatar')
    expect(w.attributes('data-size')).toBe('default')
    expect(w.classes()).toContain('size-8')
    expect(w.find('[data-slot="avatar-fallback"]').exists()).toBe(true)
  })

  it('shows the initials of a name: first and last word, uppercased', () => {
    expect(avatar().get('[data-slot="avatar-fallback"]').text()).toBe('AD')
    expect(avatar({}, { name: 'mehmet can kaya' }).get('[data-slot="avatar-fallback"]').text()).toBe('MK')
    expect(avatar({}, { name: 'Novatron' }).get('[data-slot="avatar-fallback"]').text()).toBe('N')
    expect(avatar({}, { name: '  ' }).get('[data-slot="avatar-fallback"]').text()).toBe('')
    expect(avatar({}, { name: 'Özge Çelik' }).get('[data-slot="avatar-fallback"]').text()).toBe('ÖÇ')
  })

  it('prefers the slot over the generated initials', () => {
    const w = mount(Avatar, { slots: { default: () => h(AvatarFallback, { name: 'Ayşe Demir' }, () => '+3') } })
    expect(w.get('[data-slot="avatar-fallback"]').text()).toBe('+3')
  })

  it('has four sizes through data-size and the variant helper', () => {
    expect(avatar({ size: 'sm' }).classes()).toContain('size-6')
    expect(avatar({ size: 'lg' }).classes()).toContain('size-10')
    expect(avatar({ size: 'xl' }).attributes('data-size')).toBe('xl')
    expect(avatarVariants({ size: 'xl' })).toContain('size-14')
  })

  it('exposes one named image when label is set, and plain content otherwise', () => {
    const named = avatar({ label: 'Ayşe Demir' })
    expect(named.attributes('role')).toBe('img')
    expect(named.attributes('aria-label')).toBe('Ayşe Demir')
    const plain = avatar()
    expect(plain.attributes('role')).toBeUndefined()
    expect(plain.attributes('aria-label')).toBeUndefined()
  })

  it('merges custom classes', () => {
    expect(avatar({ class: 'ring-2' }).classes()).toContain('ring-2')
  })
})

describe('AvatarGroup', () => {
  it('renders a labelled group that overlaps its avatars', () => {
    const w = mount(AvatarGroup, { attrs: { 'aria-label': 'Team' }, slots: { default: () => [h(Avatar), h(Avatar)] } })
    expect(w.attributes('role')).toBe('group')
    expect(w.attributes('aria-label')).toBe('Team')
    expect(w.attributes('data-slot')).toBe('avatar-group')
    expect(w.classes()).toContain('-space-x-2')
    expect(w.findAll('[data-slot="avatar"]')).toHaveLength(2)
  })
})
