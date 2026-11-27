import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Sheet } from './Sheet.vue'
export { default as SheetClose } from './SheetClose.vue'
export { default as SheetContent } from './SheetContent.vue'
export { default as SheetDescription } from './SheetDescription.vue'
export { default as SheetFooter } from './SheetFooter.vue'
export { default as SheetHeader } from './SheetHeader.vue'
export { default as SheetTitle } from './SheetTitle.vue'
export { default as SheetTrigger } from './SheetTrigger.vue'

export const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-4 overflow-y-auto bg-popover p-4 text-popover-foreground shadow-lg outline-none sm:p-6',
  {
    variants: {
      side: {
        right: 'inset-y-0 right-0 h-full w-[calc(100%-2.5rem)] border-l data-[state=closed]:animate-[elf-slide-out-right_150ms_ease-in_forwards] data-[state=open]:animate-[elf-slide-in-right_250ms_ease-out]',
        left: 'inset-y-0 left-0 h-full w-[calc(100%-2.5rem)] border-r data-[state=closed]:animate-[elf-slide-out-left_150ms_ease-in_forwards] data-[state=open]:animate-[elf-slide-in-left_250ms_ease-out]',
        top: 'inset-x-0 top-0 h-auto w-full rounded-b-lg border-b data-[state=closed]:animate-[elf-slide-out-top_150ms_ease-in_forwards] data-[state=open]:animate-[elf-slide-in-top_250ms_ease-out]',
        bottom: 'inset-x-0 bottom-0 h-auto w-full rounded-t-lg border-t pb-[max(1rem,env(safe-area-inset-bottom))] data-[state=closed]:animate-[elf-slide-out-bottom_150ms_ease-in_forwards] data-[state=open]:animate-[elf-slide-in-bottom_250ms_ease-out] sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      { side: ['left', 'right'], size: 'sm', class: 'sm:max-w-xs' },
      { side: ['left', 'right'], size: 'default', class: 'sm:max-w-sm' },
      { side: ['left', 'right'], size: 'lg', class: 'sm:max-w-xl' },
      { side: ['left', 'right'], size: 'full', class: 'w-full sm:max-w-none' },
      { side: ['top', 'bottom'], size: 'sm', class: 'max-h-[40dvh]' },
      { side: ['top', 'bottom'], size: 'default', class: 'max-h-[85dvh]' },
      { side: ['top', 'bottom'], size: 'lg', class: 'max-h-[92dvh]' },
      { side: ['top', 'bottom'], size: 'full', class: 'h-dvh max-h-dvh rounded-none' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>

export interface SheetContentExtraProps {
  /** Edge the sheet is anchored to. `bottom` is the mobile pattern: full width with safe-area padding. */
  side?: SheetVariants['side']
  /** Width (left and right) or maximum height (top and bottom). `full` fills the viewport. */
  size?: SheetVariants['size']
  /** Render the built-in close button in the top-right corner. */
  showCloseButton?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
