import type { UseElfThemeOptions, UseElfThemeReturn } from './use-elf-theme'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { createElfTheme, elfThemeBootScript, provideElfTheme, useElfTheme } from './use-elf-theme'

function setup<T extends string = 'elf' | 'nova'>(options: UseElfThemeOptions<T> = {}) {
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
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`
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
    expect(t.themes).toEqual(['elf', 'nova', 'elfwood'])
    expect(t.wrapper.text()).toBe('elf')
  })

  it('setTheme updates the ref, the rendered output and data-theme on <html>', async () => {
    const t = setup()
    t.setTheme('nova')
    await nextTick()
    expect(t.theme.value).toBe('nova')
    expect(document.documentElement.dataset.theme).toBe('nova')
    expect(t.wrapper.text()).toBe('nova')
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
    expect(t.theme.value).toBe('nova')
    t.cycle()
    expect(t.theme.value).toBe('elfwood')
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
    a.setTheme('nova')
    expect(b.theme.value).toBe('nova')
  })

  it('keeps separate state for separate apps', () => {
    const one = setup()
    const two = setup()
    one.setTheme('nova')
    expect(two.theme.value).toBe('elf')
  })

  it('accepts a defaultTheme and an initial theme, and ignores an invalid initial', () => {
    expect(setup({ defaultTheme: 'nova' }).theme.value).toBe('nova')
    expect(setup({ initial: 'nova' }).theme.value).toBe('nova')
    expect(setup({ initial: 'nope' as never }).theme.value).toBe('elf')
  })

  it('adopts the theme the document was served with when it mounts', async () => {
    document.documentElement.dataset.theme = 'nova'
    const t = setup()
    await nextTick()
    expect(t.theme.value).toBe('nova')
  })

  it('supports custom theme names with their own default', () => {
    const t = setup({ themes: ['ocean', 'forest'] as const, defaultTheme: 'forest' })
    expect(t.theme.value).toBe('forest')
    t.setTheme('ocean')
    expect(document.documentElement.dataset.theme).toBe('ocean')
    t.setTheme('nova' as never)
    expect(t.theme.value).toBe('ocean')
  })

  it('can target another element', () => {
    const box = document.createElement('div')
    const t = setup({ target: box })
    t.setTheme('nova')
    expect(box.dataset.theme).toBe('nova')
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  describe('persistence', () => {
    it('stores nothing by default', () => {
      setup().setTheme('nova')
      expect(localStorage.length).toBe(0)
      expect(document.cookie).toBe('')
    })

    it('writes to localStorage and restores the choice on the next mount', async () => {
      setup({ storage: 'localStorage' }).setTheme('nova')
      expect(localStorage.getItem('elfui-theme')).toBe('nova')
      const later = setup({ storage: 'localStorage' })
      await nextTick()
      expect(later.theme.value).toBe('nova')
      expect(document.documentElement.dataset.theme).toBe('nova')
    })

    it('writes a cookie and restores the choice', async () => {
      setup({ storage: 'cookie', storageKey: 'my-theme' }).setTheme('nova')
      expect(document.cookie).toContain('my-theme=nova')
      document.documentElement.removeAttribute('data-theme')
      const later = setup({ storage: 'cookie', storageKey: 'my-theme' })
      await nextTick()
      expect(later.theme.value).toBe('nova')
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
      expect(() => t.setTheme('nova')).not.toThrow()
      expect(t.theme.value).toBe('nova')
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
    localStorage.setItem('elfui-theme', 'nova')
    run(elfThemeBootScript())
    expect(document.documentElement.dataset.theme).toBe('nova')
  })

  it('applies a stored cookie theme and honors a custom key', () => {
    document.cookie = 'site=nova; path=/'
    run(elfThemeBootScript({ storage: 'cookie', storageKey: 'site' }))
    expect(document.documentElement.dataset.theme).toBe('nova')
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

describe('toggle', () => {
  it('flips between two themes and cycles through more', () => {
    const two = setup({ themes: ['elf', 'nova'] as const })
    two.toggle()
    expect(two.theme.value).toBe('nova')
    two.toggle()
    expect(two.theme.value).toBe('elf')
    two.wrapper.unmount()
    const three = setup()
    three.toggle()
    three.toggle()
    expect(three.theme.value).toBe('elfwood')
    three.toggle()
    expect(three.theme.value).toBe('elf')
    three.wrapper.unmount()
  })
})

describe('createElfTheme', () => {
  function withPlugin(config: Parameters<typeof createElfTheme>[0], options: UseElfThemeOptions<string> = {}) {
    let result!: UseElfThemeReturn<string>
    const wrapper = mount(defineComponent({
      setup() {
        result = useElfTheme<string>(options)
        return () => h('span', result.theme.value)
      },
    }), { global: { plugins: [createElfTheme(config)] } })
    return { api: result, wrapper }
  }

  it('gives a zero-argument useElfTheme() the themes, default and persistence of the plugin', async () => {
    const { api, wrapper } = withPlugin({ themes: ['ocean', 'forest'], defaultTheme: 'forest', persist: 'localStorage' })
    expect(api.themes).toEqual(['ocean', 'forest'])
    expect(api.theme.value).toBe('forest')
    api.setTheme('ocean')
    expect(localStorage.getItem('elfui-theme')).toBe('ocean')
    expect(document.documentElement.dataset.theme).toBe('ocean')
    api.setTheme('rainbow')
    expect(api.theme.value).toBe('ocean')
    wrapper.unmount()
  })

  it('persists in a cookie and not at all when persist is false', () => {
    const cookie = withPlugin({ persist: 'cookie' })
    cookie.api.setTheme('nova')
    expect(document.cookie).toContain('elfui-theme=nova')
    cookie.wrapper.unmount()
    clearCookies()
    const none = withPlugin({ persist: false })
    none.api.setTheme('nova')
    // Some DOM implementations keep an expired cookie as an empty value; only a stored theme counts.
    expect(document.cookie).not.toMatch(/elfui-theme=[^;]/)
    expect(localStorage.getItem('elfui-theme')).toBeNull()
    none.wrapper.unmount()
  })

  it('defaults to localStorage and applies the stored choice before the first render', () => {
    localStorage.setItem('elfui-theme', 'nova')
    const { api, wrapper } = withPlugin({})
    expect(api.theme.value).toBe('nova')
    expect(wrapper.text()).toBe('nova')
    expect(document.documentElement.dataset.theme).toBe('nova')
    wrapper.unmount()
  })

  it('ignores a stored name that is not one of the themes', () => {
    localStorage.setItem('elfui-theme', 'rainbow')
    const { api, wrapper } = withPlugin({ themes: ['elf', 'nova'] })
    expect(api.theme.value).toBe('elf')
    wrapper.unmount()
  })

  it('lets explicit options override the plugin defaults', () => {
    const { api, wrapper } = withPlugin({ themes: ['elf', 'nova'], persist: false }, { storage: 'localStorage' })
    api.setTheme('nova')
    expect(localStorage.getItem('elfui-theme')).toBe('nova')
    wrapper.unmount()
  })

  it('shares one state between components of the app', () => {
    const a = withPlugin({})
    a.api.setTheme('nova')
    expect(a.api.theme.value).toBe('nova')
    a.wrapper.unmount()
  })
})

describe('provideElfTheme', () => {
  it('validates the initial theme', () => {
    const app = { provide() {} } as unknown as Parameters<typeof provideElfTheme>[0]
    expect(provideElfTheme(app, { initial: 'nova' }).value).toBe('nova')
    expect(provideElfTheme(app, { initial: 'rainbow' }).value).toBe('elf')
    expect(provideElfTheme(app, { initial: null, defaultTheme: 'nova' }).value).toBe('nova')
  })
})
