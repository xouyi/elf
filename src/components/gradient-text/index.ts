import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as GradientText } from './GradientText.vue'

/** Named colour presets. `brand` follows the active theme; the others have a light and a dark set, picked by the theme's `color-scheme`. */
export type GradientTextVariant = 'brand' | 'aurora' | 'sunset' | 'forest'

/** Direction of the gradient, in Tailwind notation: `r` is left to right, `br` is top-left to bottom-right. */
export type GradientTextDirection = 'r' | 'l' | 'b' | 't' | 'br' | 'bl' | 'tr' | 'tl'

/**
 * Stops of every preset. `brand` uses theme tokens (the primary colour into the foreground colour, both of which meet
 * 4.5:1 on the theme background). The named presets list a `light` set for light themes and a `dark` set for dark themes;
 * `GradientText.test.ts` checks every stop of every set against the background tokens of every theme (4.5:1).
 */
export const gradientTextPresets = {
  brand: { stops: ['var(--elf-primary)', 'var(--elf-foreground)'] },
  aurora: { light: ['#0e7490', '#6d28d9', '#be185d'], dark: ['#22d3ee', '#a78bfa', '#f472b6'] },
  sunset: { light: ['#c2410c', '#b91c1c', '#be185d'], dark: ['#fb923c', '#f87171', '#f472b6'] },
  forest: { light: ['#15803d', '#0f766e', '#4d7c0f'], dark: ['#4ade80', '#2dd4bf', '#a3e635'] },
} as const

export const gradientTextDirections: Record<GradientTextDirection, string> = {
  r: 'to right',
  l: 'to left',
  b: 'to bottom',
  t: 'to top',
  br: 'to bottom right',
  bl: 'to bottom left',
  tr: 'to top right',
  tl: 'to top left',
}

export interface GradientTextProps extends PrimitiveProps {
  /** Colour preset. Defaults to `brand`, which blends the theme's primary colour into its foreground colour. */
  variant?: GradientTextVariant
  /** First colour, any CSS colour (a token works: `var(--elf-primary)`). Overrides the first stop of the preset. */
  from?: string
  /** Optional middle colour. Overrides the middle stop of the preset (a two-stop preset gains one). */
  via?: string
  /** Last colour. Overrides the last stop of the preset. */
  to?: string
  /** Direction of the gradient. */
  direction?: GradientTextDirection
  /** Slowly shifts the gradient back and forth. Static under `prefers-reduced-motion`. */
  animate?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
