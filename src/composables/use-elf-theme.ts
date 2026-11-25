import type { Ref } from 'vue'
import type { ElfTheme } from '../lib/themes'
import { getCurrentInstance, onMounted, readonly, ref } from 'vue'
import { elfThemes } from '../lib/themes'

/** Where `useElfTheme` remembers the chosen theme. */
export type ElfThemeStorage = 'localStorage' | 'cookie' | 'none'

export interface UseElfThemeOptions<T extends string = ElfTheme> {
  /** Theme names the composable accepts. Defaults to the shipped themes; pass your own list to add custom themes (the name type is inferred). */
  themes?: readonly T[]
  /** Theme used until something else decides. Defaults to the first entry of `themes`, which is `elf` for the shipped themes. */
  defaultTheme?: T
  /**
   * Theme to render first. Use it on the server to pass the value read from the request cookie
   * (`useCookie` in Nuxt) so that the server and the client render the same theme.
   */
  initial?: T
  /** Where the choice is remembered between visits. Defaults to `none`: nothing is stored. */
  storage?: ElfThemeStorage
  /** Key of the stored value: the localStorage key or the cookie name. */
  storageKey?: string
  /** Lifetime of the cookie in seconds when `storage` is `cookie`. Defaults to one year. */
  cookieMaxAge?: number
  /** Element that carries the `data-theme` attribute. Defaults to `document.documentElement`. */
  target?: HTMLElement | null
}

export interface UseElfThemeReturn<T extends string = ElfTheme> {
  /** The active theme name. Read-only: change it with `setTheme`. */
  theme: Readonly<Ref<T>>
  /** Every accepted theme name. */
  themes: readonly T[]
  /** Activates a theme: updates `theme`, sets `data-theme` on the target element and stores the choice. Unknown names are ignored. */
  setTheme: (next: T) => void
  /** Activates the next theme of the list, wrapping around at the end. */
  cycle: () => void
}

const DEFAULT_KEY = 'elfui-theme'
const ONE_YEAR = 60 * 60 * 24 * 365

// One theme state per Vue app, so that two server requests never share a theme. Outside a component (client scripts) a single module state is used.
const stores = new WeakMap<object, Ref<string>>()
let fallbackStore: Ref<string> | undefined

function readStored(storage: ElfThemeStorage, key: string): string | undefined {
  try {
    if (storage === 'localStorage')
      return localStorage.getItem(key) ?? undefined
    if (storage === 'cookie') {
      const match = document.cookie.split('; ').find(entry => entry.startsWith(`${encodeURIComponent(key)}=`))
      return match ? decodeURIComponent(match.slice(match.indexOf('=') + 1)) : undefined
    }
  }
  catch {
    // Storage can be blocked (private mode, disabled cookies): the theme still applies for this visit.
  }
  return undefined
}

function writeStored(storage: ElfThemeStorage, key: string, value: string, maxAge: number) {
  try {
    if (storage === 'localStorage')
      localStorage.setItem(key, value)
    else if (storage === 'cookie')
      document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
  }
  catch {
    // See readStored.
  }
}

/**
 * Reads and changes the active theme, stored as `data-theme` on `<html>`.
 *
 * Safe to call during server-side rendering: nothing touches `document` or `window` on the server, and every Vue app
 * (every request) has its own state. On the client the stored choice, if any, is applied when the component mounts;
 * add `elfThemeBootScript()` to the document head to apply it before the first paint.
 *
 * @example
 * const { theme, setTheme } = useElfTheme({ storage: 'localStorage' })
 * setTheme('novatron')
 */
export function useElfTheme<T extends string = ElfTheme>(options: UseElfThemeOptions<T> = {}): UseElfThemeReturn<T> {
  const themes = (options.themes ?? elfThemes) as readonly T[]
  const fallback = options.defaultTheme ?? themes[0]!
  const storage = options.storage ?? 'none'
  const key = options.storageKey ?? DEFAULT_KEY
  const maxAge = options.cookieMaxAge ?? ONE_YEAR
  const accepts = (value: unknown): value is T => typeof value === 'string' && (themes as readonly string[]).includes(value)
  const element = () => (options.target !== undefined ? options.target : typeof document === 'undefined' ? null : document.documentElement)

  const owner = getCurrentInstance()?.appContext.app
  let store = owner ? stores.get(owner) : fallbackStore
  if (!store) {
    store = ref(accepts(options.initial) ? options.initial : fallback) as Ref<string>
    if (owner)
      stores.set(owner, store)
    else
      fallbackStore = store
  }
  const state = store

  function apply(next: T) {
    state.value = next
    const target = element()
    if (target)
      target.dataset.theme = next
  }

  function setTheme(next: T) {
    if (!accepts(next)) {
      if (import.meta.env?.DEV)
        console.warn(`[elfui] useElfTheme: unknown theme "${String(next)}". Accepted: ${themes.join(', ')}.`)
      return
    }
    apply(next)
    writeStored(storage, key, next, maxAge)
  }

  // Runs on the client only. The first render uses the same state as the server; here the page catches up with what the
  // visitor stored, or with the theme the document was served with.
  function sync() {
    const stored = readStored(storage, key)
    const current = element()?.dataset.theme
    const next = [stored, current].find(accepts)
    if (next && next !== state.value)
      apply(next)
  }
  if (getCurrentInstance())
    onMounted(sync)
  else if (typeof document !== 'undefined')
    sync()

  return {
    theme: readonly(state) as Readonly<Ref<T>>,
    themes,
    setTheme,
    cycle() {
      const index = themes.indexOf(state.value as T)
      setTheme(themes[(index + 1) % themes.length]!)
    },
  }
}

export interface ElfThemeBootScriptOptions {
  /** Where the choice is stored. Must match the `storage` option of `useElfTheme`. Defaults to `localStorage`. */
  storage?: Exclude<ElfThemeStorage, 'none'>
  /** Key of the stored value. Must match `storageKey` of `useElfTheme`. */
  storageKey?: string
  /** Accepted theme names. Defaults to the shipped themes. */
  themes?: readonly string[]
}

/**
 * Returns a small inline script that applies the stored theme to `<html>` before the first paint, so there is no flash
 * of the default theme. Put it in the document head, for example with `useHead({ script: [{ innerHTML: elfThemeBootScript() }] })` in Nuxt.
 */
export function elfThemeBootScript(options: ElfThemeBootScriptOptions = {}): string {
  const key = JSON.stringify(options.storageKey ?? DEFAULT_KEY)
  const names = JSON.stringify(options.themes ?? elfThemes)
  const read = options.storage === 'cookie'
    ? `var m=document.cookie.split('; ').find(function(c){return c.indexOf(encodeURIComponent(${key})+'=')===0});var t=m&&decodeURIComponent(m.slice(m.indexOf('=')+1));`
    : `var t=localStorage.getItem(${key});`
  return `try{${read}if(t&&${names}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`
}
