import type { VariantProps } from 'class-variance-authority'
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Progress } from './Progress.vue'

export const progressVariants = cva(
  'relative w-full overflow-hidden rounded-(--elf-radius-pill) bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type ProgressVariants = VariantProps<typeof progressVariants>

export interface ProgressProps extends ProgressRootProps {
  /** Bar thickness. */
  size?: ProgressVariants['size']
  /**
   * Accessible name of the bar ("Uploading roster.csv"). Use it when there is no visible label;
   * with a visible label point `aria-labelledby` at it instead.
   */
  label?: string
  /** Extra classes for the track, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
  /** Extra classes for the filled indicator, for example to change its color. */
  indicatorClass?: HTMLAttributes['class']
}
