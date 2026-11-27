<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { SheetContentExtraProps } from './index'
import { X } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { dialogOverlayClass } from '../dialog'
import { sheetVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps & SheetContentExtraProps>(), {
  side: 'right',
  size: 'default',
  showCloseButton: true,
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'side', 'size', 'showCloseButton')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      data-slot="sheet-overlay"
      :class="dialogOverlayClass"
    />
    <DialogContent
      data-slot="sheet-content"
      :data-side="props.side"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(sheetVariants({ side: props.side, size: props.size }), props.class)"
    >
      <slot />
      <DialogClose
        v-if="props.showCloseButton"
        data-slot="sheet-close"
        class="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none sm:size-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4"
      >
        <X />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
