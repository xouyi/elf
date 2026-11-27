import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '../button'

export { default as AlertDialog } from './AlertDialog.vue'
export { default as AlertDialogAction } from './AlertDialogAction.vue'
export { default as AlertDialogCancel } from './AlertDialogCancel.vue'
export { default as AlertDialogContent } from './AlertDialogContent.vue'
export { default as AlertDialogDescription } from './AlertDialogDescription.vue'
export { default as AlertDialogFooter } from './AlertDialogFooter.vue'
export { default as AlertDialogHeader } from './AlertDialogHeader.vue'
export { default as AlertDialogTitle } from './AlertDialogTitle.vue'
export { default as AlertDialogTrigger } from './AlertDialogTrigger.vue'

export interface AlertDialogActionProps {
  /** Button style of the confirming action. Use `destructive` for irreversible actions. */
  variant?: ButtonVariants['variant']
  /** Button size. */
  size?: ButtonVariants['size']
  /** Render as another element or component. */
  as?: string | object
  /** Render the child element instead of a button, merging props and behavior onto it. */
  asChild?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface AlertDialogCancelProps {
  /** Button style of the cancel action. */
  variant?: ButtonVariants['variant']
  /** Button size. */
  size?: ButtonVariants['size']
  /** Render as another element or component. */
  as?: string | object
  /** Render the child element instead of a button, merging props and behavior onto it. */
  asChild?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
