<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose } from 'reka-ui'
import { cn } from '../../lib/utils'
import { Button } from '../button'

const props = withDefaults(defineProps<{
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
  /** Render a `Close` button after the slot content. */
  showCloseButton?: boolean
}>(), {
  showCloseButton: false,
})
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
    <DialogClose v-if="props.showCloseButton" as-child>
      <Button variant="outline">
        Close
      </Button>
    </DialogClose>
  </div>
</template>
