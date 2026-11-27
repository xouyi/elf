<script setup lang="ts">
import type { DialogOverlayProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogOverlay } from 'reka-ui'
import { cn } from '../../lib/utils'
import { dialogOverlayClass } from './index'

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
    :class="cn(dialogOverlayClass, props.class)"
  >
    <slot />
  </DialogOverlay>
</template>
