import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as StatCard } from './StatCard.vue'
export { default as StatCardLink } from './StatCardLink.vue'

export const statCardVariants = cva(
  'group/stat relative flex flex-col gap-1 rounded-xl border bg-card p-5 text-card-foreground shadow-sm has-[[data-slot=stat-card-link]]:transition-colors has-[[data-slot=stat-card-link]]:hover:bg-accent/50 has-[[data-slot=stat-card-link]:focus-visible]:border-ring has-[[data-slot=stat-card-link]:focus-visible]:ring-3 has-[[data-slot=stat-card-link]:focus-visible]:ring-ring/50',
  {
    variants: {
      tone: {
        default: '',
        success: 'border-success/40',
        warning: 'border-warning/40',
        destructive: 'border-destructive/50',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
)

export type StatCardVariants = VariantProps<typeof statCardVariants>

/** Direction of the change shown by the trend. */
export type StatCardTrendDirection = 'up' | 'down' | 'flat'

export interface StatCardProps {
  /** Short name of the metric. Names the card for assistive technology. Replace the markup with the `label` slot. */
  label?: string
  /** The figure. Numbers are formatted by you, so pass the exact text you want shown (for example `1.284` or `%92`). */
  value?: string | number
  /** Supporting text under the value, such as the comparison period. */
  hint?: string
  /** Change since the last period, for example `+12%`. Shown with an arrow for `trendDirection`. */
  trend?: string
  /** Arrow shown next to the trend. */
  trendDirection?: StatCardTrendDirection
  /**
   * Accessible description of the trend, for example `up 12 percent since last week`. Read instead of the bare trend
   * text. Defaults to the trend text.
   */
  trendLabel?: string
  /**
   * Meaning of the card: tints the border and the trend. The meaning is never carried by colour alone, so keep the
   * trend text or hint explicit.
   */
  tone?: StatCardVariants['tone']
  /** Show skeletons instead of the value, hint and trend and set `aria-busy`. */
  loading?: boolean
  /** Text announced while loading. */
  loadingLabel?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface StatCardLinkProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
