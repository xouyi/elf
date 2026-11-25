import type { VariantProps } from 'class-variance-authority'
import type { SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Switch } from './Switch.vue'

export const switchVariants = cva(
  'peer group/switch inline-flex shrink-0 items-center rounded-(--elf-radius-pill) border border-input bg-transparent p-px transition-[color,background-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary',
  {
    variants: {
      size: {
        default: 'h-6 w-11',
        sm: 'h-5 w-9',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type SwitchVariants = VariantProps<typeof switchVariants>

export interface SwitchProps extends SwitchRootProps {
  /** Track and thumb size. */
  size?: SwitchVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
