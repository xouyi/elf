<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { dialogContentClass, dialogOverlayClass } from '../dialog'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<AlertDialogContentProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<AlertDialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      data-slot="alert-dialog-overlay"
      :class="dialogOverlayClass"
    />
    <!-- Reka focuses the Cancel button on open and never closes on outside pointer events. -->
    <AlertDialogContent
      data-slot="alert-dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(dialogContentClass, 'sm:max-w-md', props.class)"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
