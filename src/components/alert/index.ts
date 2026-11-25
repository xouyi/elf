import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'group/alert relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-card',
        destructive: 'border-destructive/50 bg-destructive/10',
        success: 'border-success/40 bg-success/10',
        warning: 'border-warning/40 bg-warning/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>

export interface AlertProps {
  /** Visual style and default icon. */
  variant?: AlertVariants['variant']
  /**
   * Live region role. `alert` interrupts assistive technology (assertive), `status` is announced politely and `none`
   * renders no role, for messages that are already on the page when it loads. Defaults to `alert` for the
   * `destructive` variant and `status` for the others. Only content added after load is announced.
   */
  role?: 'alert' | 'status' | 'none'
  /** Show the icon. Replace it with the `icon` slot. */
  showIcon?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AlertTitleProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AlertDescriptionProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
