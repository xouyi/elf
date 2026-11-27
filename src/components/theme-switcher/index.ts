import type { HTMLAttributes } from 'vue'

export { default as ThemeSwitcher } from './ThemeSwitcher.vue'

/** Layout of `ElfThemeSwitcher`. */
export type ThemeSwitcherVariant = 'select' | 'buttons' | 'toggle'

export interface ThemeSwitcherProps {
  /**
   * Layout: `select` (a dropdown), `buttons` (a segmented radio group, best for two to four themes) or `toggle`
   * (one icon button that switches to the next theme).
   */
  variant?: ThemeSwitcherVariant
  /** Accessible name of the control, also shown as the tooltip of `toggle`. Defaults to `Theme`. */
  label?: string
  /** Visible names by theme name, for example `{ elf: 'Violet' }`. Themes without an entry show their name with a capital letter. */
  labels?: Record<string, string>
  /** Themes to offer. Defaults to the themes of the Nuxt module or `createElfTheme()`, or else the shipped themes. */
  themes?: readonly string[]
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
