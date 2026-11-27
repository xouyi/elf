// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { useElfTheme } from './use-elf-theme'

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
