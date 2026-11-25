import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Spinner } from './Spinner.vue'

export const spinnerVariants = cva(
  'inline-flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        sm: 'size-3',
        default: 'size-4',
        lg: 'size-6',
        xl: 'size-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type SpinnerVariants = VariantProps<typeof spinnerVariants>

export interface SpinnerProps {
  /** Diameter of the spinner. */
  size?: SpinnerVariants['size']
  /** Text announced to assistive technology through `role="status"`. Not shown on screen. */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
