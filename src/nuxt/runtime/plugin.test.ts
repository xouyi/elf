// @vitest-environment node
import { createSSRApp, defineComponent, h, toValue } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useElfTheme } from '../../composables/use-elf-theme'

// The Nuxt virtual module is replaced by a stub: the plugin is exercised with a fake request cookie and runtime config.
const state = vi.hoisted(() => ({
  config: {} as Record<string, unknown>,
  cookie: undefined as string | undefined,
  cookieReads: [] as string[],
  head: [] as Record<string, unknown>[],
}))

vi.mock('#imports', () => ({
  defineNuxtPlugin: (setup: (app: unknown) => void) => setup,
  useRuntimeConfig: () => ({ public: { elfui: state.config } }),
  useCookie: (name: string) => {
    state.cookieReads.push(name)
    return { value: state.cookie }
  },
  useHead: (input: Record<string, unknown>) => state.head.push(input),
}))

const { default: plugin } = await import('./plugin')

async function request(config: Record<string, unknown>, cookie?: string) {
  state.config = { themes: ['elf', 'nova', 'elfwood'], defaultTheme: 'elf', persist: 'cookie', storageKey: 'elfui-theme', ...config }
  state.cookie = cookie
  const App = defineComponent({ setup: () => { const api = useElfTheme(); return () => h('main', { 'data-theme': api.theme.value }, api.themes.join(',')) } })
  const app = createSSRApp(App)
  ;(plugin as unknown as (nuxtApp: unknown) => void)({ vueApp: app })
  return renderToString(app)
}

const htmlTheme = () => toValue((state.head.at(-1) as { htmlAttrs: Record<string, unknown> }).htmlAttrs['data-theme'])

beforeEach(() => {
  state.head = []
  state.cookieReads = []
})

describe('Nuxt runtime plugin', () => {
  it('renders the cookie theme into the HTML and into <html data-theme>', async () => {
    expect(await request({}, 'nova')).toBe('<main data-theme="nova">elf,nova,elfwood</main>')
    expect(htmlTheme()).toBe('nova')
    expect(state.cookieReads).toEqual(['elfui-theme'])
  })

  it('falls back to the default theme for a missing or unknown cookie value', async () => {
    expect(await request({ defaultTheme: 'nova' })).toContain('data-theme="nova"')
    expect(await request({ defaultTheme: 'nova' }, 'rainbow')).toContain('data-theme="nova"')
    expect(htmlTheme()).toBe('nova')
  })

  it('does not read the cookie for localStorage or when persistence is off', async () => {
    expect(await request({ persist: 'localStorage' }, 'nova')).toContain('data-theme="elf"')
    expect(await request({ persist: false }, 'nova')).toContain('data-theme="elf"')
    expect(state.cookieReads).toEqual([])
  })

  it('uses the themes of the module options', async () => {
    expect(await request({ themes: ['nova', 'elf'], defaultTheme: 'nova' }, 'elfwood')).toBe('<main data-theme="nova">nova,elf</main>')
  })
})
