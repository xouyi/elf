// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createElfTheme, provideElfTheme, useElfTheme } from './use-elf-theme'

function request(options: Parameters<typeof useElfTheme>[0] = {}, after?: (api: ReturnType<typeof useElfTheme>) => void) {
  const App = defineComponent({
    setup() {
      const api = useElfTheme({ storage: 'cookie', ...options })
      after?.(api)
      return () => h('main', { 'data-theme': api.theme.value }, api.theme.value)
    },
  })
  return renderToString(createSSRApp(App))
}

describe('useElfTheme on the server', () => {
  it('renders without a document or window', async () => {
    expect(typeof document).toBe('undefined')
    expect(typeof window).toBe('undefined')
    expect(await request()).toBe('<main data-theme="elf">elf</main>')
  })

  it('renders the initial theme passed from the request cookie', async () => {
    expect(await request({ initial: 'nova' })).toBe('<main data-theme="nova">nova</main>')
  })

  it('applies setTheme to the state without touching storage or the DOM', async () => {
    expect(await request({}, api => api.setTheme('nova'))).toBe('<main data-theme="nova">nova</main>')
  })

  it('does not leak a theme from one request into the next', async () => {
    await request({}, api => api.setTheme('nova'))
    expect(await request()).toBe('<main data-theme="elf">elf</main>')
    const [a, b] = await Promise.all([request({ initial: 'nova' }), request({ initial: 'elf' })])
    expect(a).toContain('nova')
    expect(b).toContain('>elf<')
  })
})

describe('shared theme defaults on the server', () => {
  async function renderWith(config: Parameters<typeof provideElfTheme>[1]) {
    const App = defineComponent({
      setup() {
        const api = useElfTheme()
        return () => h('main', { 'data-theme': api.theme.value }, api.themes.join(','))
      },
    })
    const app = createSSRApp(App)
    // What the Nuxt plugin does with the cookie it read from the request.
    provideElfTheme(app, config)
    return renderToString(app)
  }

  it('renders the theme from the request cookie without any option on useElfTheme()', async () => {
    expect(await renderWith({ themes: ['elf', 'nova'], persist: 'cookie', initial: 'nova' })).toBe('<main data-theme="nova">elf,nova</main>')
  })

  it('ignores an unknown or missing cookie value and uses the default theme', async () => {
    expect(await renderWith({ themes: ['elf', 'nova'], defaultTheme: 'nova', initial: 'rainbow' })).toContain('data-theme="nova"')
    expect(await renderWith({ defaultTheme: 'nova', initial: undefined })).toContain('data-theme="nova"')
    expect(await renderWith({ initial: '__proto__' })).toContain('data-theme="elf"')
  })

  it('keeps requests apart', async () => {
    const [a, b] = await Promise.all([renderWith({ initial: 'nova' }), renderWith({ initial: 'elfwood' })])
    expect(a).toContain('data-theme="nova"')
    expect(b).toContain('data-theme="elfwood"')
  })

  it('works through the createElfTheme() plugin on the server (no document)', async () => {
    const App = defineComponent({ setup: () => { const api = useElfTheme(); return () => h('i', api.theme.value) } })
    const app = createSSRApp(App).use(createElfTheme({ themes: ['ocean', 'forest'], persist: 'localStorage' }))
    expect(await renderToString(app)).toBe('<i>ocean</i>')
  })
})
