import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-badge border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90',
        success: 'border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90',
        warning: 'border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

export interface BadgeProps extends PrimitiveProps {
  /** Visual style. */
  variant?: BadgeVariants['variant']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
