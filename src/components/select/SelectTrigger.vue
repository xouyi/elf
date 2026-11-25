<script setup lang="ts">
import type { SelectTriggerProps } from './index'
import { ChevronDown } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { selectTriggerVariants } from './index'

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'size', 'invalid')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="props.size"
    v-bind="forwardedProps"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :class="cn(selectTriggerVariants({ size: props.size }), props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>
