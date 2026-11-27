export { default as Dialog } from './Dialog.vue'
export { default as DialogClose } from './DialogClose.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogDescription } from './DialogDescription.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogOverlay } from './DialogOverlay.vue'
export { default as DialogTitle } from './DialogTitle.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'

/** Backdrop classes, shared by the dialog, alert dialog and sheet overlays. */
export const dialogOverlayClass = 'fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-fade-in_150ms_ease-out]'

/** Centered modal surface classes, shared by the dialog and alert dialog content. */
export const dialogContentClass = 'fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=closed]:animate-[elf-zoom-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-zoom-in_150ms_ease-out] sm:max-w-lg sm:p-6'
