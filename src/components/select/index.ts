import type { VariantProps } from 'class-variance-authority'
import type { SelectTriggerProps as RekaSelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Select } from './Select.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectGroup } from './SelectGroup.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as SelectLabel } from './SelectLabel.vue'
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue'
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue'
export { default as SelectSeparator } from './SelectSeparator.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectValue } from './SelectValue.vue'

export const selectTriggerVariants = cva(
  'flex w-full min-w-0 items-center justify-between gap-2 rounded-md border border-field bg-field-bg px-3 py-2 text-base whitespace-nowrap text-foreground transition-[color,box-shadow] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 data-[placeholder]:text-muted-foreground md:text-sm [&>span]:truncate [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      size: {
        default: 'h-9',
        sm: 'h-8 py-1',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>

export interface SelectTriggerProps extends RekaSelectTriggerProps {
  /** Trigger height. */
  size?: SelectTriggerVariants['size']
  /** Marks the select as invalid: sets `aria-invalid="true"` and the destructive border and ring. */
  invalid?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
