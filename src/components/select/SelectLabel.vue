<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectLabel } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<SelectLabelProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    v-bind="delegatedProps"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
