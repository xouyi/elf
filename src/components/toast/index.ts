import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Toaster } from './Toaster.vue'
export { toast, toastManager, useToast } from './use-toast'
export type { ElfToastObject, ToastActionOptions, ToastData, ToastFunction, ToastOptions, ToastPromiseOptions, ToastVariant } from './use-toast'

export const toastVariants = cva(
  'group/toast pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border bg-popover p-4 pr-12 text-sm text-popover-foreground shadow-lg outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[limited]:hidden data-[state=closed]:animate-[elf-toast-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-toast-in_150ms_ease-out] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:translate-y-0 data-[swipe=end]:animate-[elf-toast-swipe-out_100ms_ease-out_forwards] data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=cancel]:transition-transform',
  {
    variants: {
      variant: {
        default: '',
        success: 'border-success/40 bg-[color-mix(in_oklab,var(--elf-success)_10%,var(--elf-popover))]',
        warning: 'border-warning/40 bg-[color-mix(in_oklab,var(--elf-warning)_10%,var(--elf-popover))]',
        destructive: 'border-destructive/50 bg-[color-mix(in_oklab,var(--elf-destructive)_10%,var(--elf-popover))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type ToastVariants = VariantProps<typeof toastVariants>

export type ToasterPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToasterProps {
  /** Where the stack sits. On small screens toasts always span the width. */
  position?: ToasterPosition
  /** Maximum number of toasts shown at once; older ones stay queued, hidden, until a slot frees up. */
  limit?: number
  /** Default milliseconds before a toast closes. `0` or `Infinity` keeps toasts until dismissed. */
  duration?: number
  /** Landmark label of the toast region. `{hotkey}` is replaced with the hotkey. */
  label?: string
  /** Name announced before each toast, to tell screen reader users where the interruption comes from. */
  announceLabel?: string
  /** Keys that move focus to the toast region (default `F8`). */
  hotkey?: string[]
  /** Accessible name of each toast's dismiss button. */
  closeLabel?: string
  /** Render the dismiss button on every toast. Swiping and Escape still dismiss without it. */
  closeButton?: boolean
  /** Extra classes for the viewport, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
