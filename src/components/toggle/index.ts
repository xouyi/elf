import type { VariantProps } from 'class-variance-authority'
import type { ToggleGroupItemProps, ToggleGroupRootProps, ToggleProps as RekaToggleProps } from 'reka-ui'
import type { HTMLAttributes, InjectionKey } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'
export { default as ToggleGroup } from './ToggleGroup.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'

export const toggleVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 min-w-9 px-2.5',
        sm: 'h-8 min-w-8 px-2',
        lg: 'h-10 min-w-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>

export interface ToggleProps extends RekaToggleProps {
  /** Visual style: `default` is borderless, `outline` adds a border. */
  variant?: ToggleVariants['variant']
  /** Height and padding. */
  size?: ToggleVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ToggleGroupProps extends ToggleGroupRootProps {
  /** Visual style shared by every item in the group. */
  variant?: ToggleVariants['variant']
  /** Size shared by every item in the group. */
  size?: ToggleVariants['size']
  /** Join the items into one segmented control (no gaps, shared borders) instead of separate buttons. */
  joined?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ToggleGroupItemExtraProps extends ToggleGroupItemProps {
  /** Overrides the group variant for this item. */
  variant?: ToggleVariants['variant']
  /** Overrides the group size for this item. */
  size?: ToggleVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ToggleGroupContext {
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  joined?: boolean
}

export const toggleGroupKey: InjectionKey<ToggleGroupContext> = Symbol('elf-toggle-group')
