import type { UseElfThemeOptions, UseElfThemeReturn } from './use-elf-theme'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { elfThemeBootScript, useElfTheme } from './use-elf-theme'

function setup<T extends string = 'elf' | 'novatron'>(options: UseElfThemeOptions<T> = {}) {
  let result!: UseElfThemeReturn<T>
  const wrapper = mount(defineComponent({
    setup() {
      result = useElfTheme(options)
      return () => h('span', result.theme.value)
    },
  }))
  return { ...result, wrapper }
}

function clearCookies() {
  for (const entry of document.cookie.split('; ')) {
    const name = entry.split('=')[0]
    if (name)
      document.cookie = `${name}=; path=/; max-age=0`
  }
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  clearCookies()
  vi.restoreAllMocks()
})

describe('useElfTheme', () => {
  it('starts with the first shipped theme and lists the accepted names', () => {
    const t = setup()
    expect(t.theme.value).toBe('elf')
    expect(t.themes).toEqual(['elf', 'novatron'])
    expect(t.wrapper.text()).toBe('elf')
  })

  it('setTheme updates the ref, the rendered output and data-theme on <html>', async () => {
    const t = setup()
    t.setTheme('novatron')
    await nextTick()
    expect(t.theme.value).toBe('novatron')
    expect(document.documentElement.dataset.theme).toBe('novatron')
    expect(t.wrapper.text()).toBe('novatron')
  })

  it('ignores unknown names and warns in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const t = setup()
    t.setTheme('purple' as never)
    expect(t.theme.value).toBe('elf')
    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(warn).toHaveBeenCalledOnce()
  })

  it('cycle visits every theme and wraps around', () => {
    const t = setup()
    t.cycle()
    expect(t.theme.value).toBe('novatron')
    t.cycle()
    expect(t.theme.value).toBe('elf')
  })

  it('shares one state between components of the same app', async () => {
    let a!: UseElfThemeReturn
    let b!: UseElfThemeReturn
    mount(defineComponent({
      setup() {
        a = useElfTheme()
        b = useElfTheme()
        return () => h('div')
      },
    }))
    a.setTheme('novatron')
    expect(b.theme.value).toBe('novatron')
  })

  it('keeps separate state for separate apps', () => {
    const one = setup()
    const two = setup()
    one.setTheme('novatron')
    expect(two.theme.value).toBe('elf')
  })

  it('accepts a defaultTheme and an initial theme, and ignores an invalid initial', () => {
    expect(setup({ defaultTheme: 'novatron' }).theme.value).toBe('novatron')
    expect(setup({ initial: 'novatron' }).theme.value).toBe('novatron')
    expect(setup({ initial: 'nope' as never }).theme.value).toBe('elf')
  })

  it('adopts the theme the document was served with when it mounts', async () => {
    document.documentElement.dataset.theme = 'novatron'
    const t = setup()
    await nextTick()
    expect(t.theme.value).toBe('novatron')
  })

  it('supports custom theme names with their own default', () => {
    const t = setup({ themes: ['ocean', 'forest'] as const, defaultTheme: 'forest' })
    expect(t.theme.value).toBe('forest')
    t.setTheme('ocean')
    expect(document.documentElement.dataset.theme).toBe('ocean')
    t.setTheme('novatron' as never)
    expect(t.theme.value).toBe('ocean')
  })

  it('can target another element', () => {
    const box = document.createElement('div')
    const t = setup({ target: box })
    t.setTheme('novatron')
    expect(box.dataset.theme).toBe('novatron')
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  describe('persistence', () => {
    it('stores nothing by default', () => {
      setup().setTheme('novatron')
      expect(localStorage.length).toBe(0)
      expect(document.cookie).toBe('')
    })

    it('writes to localStorage and restores the choice on the next mount', async () => {
      setup({ storage: 'localStorage' }).setTheme('novatron')
      expect(localStorage.getItem('elfui-theme')).toBe('novatron')
      const later = setup({ storage: 'localStorage' })
      await nextTick()
      expect(later.theme.value).toBe('novatron')
      expect(document.documentElement.dataset.theme).toBe('novatron')
    })

    it('writes a cookie and restores the choice', async () => {
      setup({ storage: 'cookie', storageKey: 'my-theme' }).setTheme('novatron')
      expect(document.cookie).toContain('my-theme=novatron')
      document.documentElement.removeAttribute('data-theme')
      const later = setup({ storage: 'cookie', storageKey: 'my-theme' })
      await nextTick()
      expect(later.theme.value).toBe('novatron')
    })

    it('ignores a stored value that is not an accepted theme', async () => {
      localStorage.setItem('elfui-theme', 'rainbow')
      const t = setup({ storage: 'localStorage' })
      await nextTick()
      expect(t.theme.value).toBe('elf')
    })

    it('keeps working when storage throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('blocked')
      })
      const t = setup({ storage: 'localStorage' })
      expect(() => t.setTheme('novatron')).not.toThrow()
      expect(t.theme.value).toBe('novatron')
    })
  })
})

describe('elfThemeBootScript', () => {
  function run(script: string) {
    // The boot script is a string meant for an inline <script>; evaluating it is the point of the test.
    // eslint-disable-next-line no-new-func
    new Function(script)()
  }

  it('applies a stored localStorage theme before paint', () => {
    localStorage.setItem('elfui-theme', 'novatron')
    run(elfThemeBootScript())
    expect(document.documentElement.dataset.theme).toBe('novatron')
  })

  it('applies a stored cookie theme and honors a custom key', () => {
    document.cookie = 'site=novatron; path=/'
    run(elfThemeBootScript({ storage: 'cookie', storageKey: 'site' }))
    expect(document.documentElement.dataset.theme).toBe('novatron')
  })

  it('ignores unknown values and never throws', () => {
    localStorage.setItem('elfui-theme', 'rainbow')
    run(elfThemeBootScript())
    expect(document.documentElement.dataset.theme).toBeUndefined()
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => run(elfThemeBootScript())).not.toThrow()
  })

  it('accepts custom theme names', () => {
    localStorage.setItem('elfui-theme', 'ocean')
    run(elfThemeBootScript({ themes: ['ocean'] }))
    expect(document.documentElement.dataset.theme).toBe('ocean')
  })
})
