<script setup lang="ts">
import type { AlertDialogCancelProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogCancel, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  variant: 'outline',
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AlertDialogCancel
    data-slot="alert-dialog-cancel"
    v-bind="forwardedProps"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), 'max-sm:h-10', props.class)"
  >
    <slot />
  </AlertDialogCancel>
</template>
