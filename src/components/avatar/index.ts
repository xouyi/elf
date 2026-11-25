import type { VariantProps } from 'class-variance-authority'
import type { AvatarFallbackProps as RekaAvatarFallbackProps, AvatarImageProps as RekaAvatarImageProps, AvatarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarGroup } from './AvatarGroup.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const avatarVariants = cva(
  'group/avatar relative inline-flex shrink-0 overflow-hidden rounded-(--elf-radius-pill) align-middle select-none',
  {
    variants: {
      size: {
        sm: 'size-6',
        default: 'size-8',
        lg: 'size-10',
        xl: 'size-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariants>

export interface AvatarProps extends AvatarRootProps {
  /** Diameter of the avatar. */
  size?: AvatarVariants['size']
  /**
   * Accessible name for the whole avatar ("Ayşe Demir"). When set, the avatar is exposed as a single image with this
   * name and its content is hidden from assistive technology. Leave it unset when the person's name is shown next to it.
   */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AvatarImageProps extends RekaAvatarImageProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AvatarFallbackProps extends RekaAvatarFallbackProps {
  /** Full name; its initials (first letters of the first and last word) are shown when the slot is empty. */
  name?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AvatarGroupProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
