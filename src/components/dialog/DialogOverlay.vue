<script setup lang="ts">
import type { DialogOverlayProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogOverlay } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<DialogOverlayProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="cn('fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-fade-in_150ms_ease-out]', props.class)"
  >
    <slot />
  </DialogOverlay>
</template>
