<script setup lang="ts">
import type { AlertDialogActionProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogAction, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  variant: 'default',
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AlertDialogAction
    data-slot="alert-dialog-action"
    :data-variant="props.variant"
    v-bind="forwardedProps"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), 'max-sm:h-10', props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
