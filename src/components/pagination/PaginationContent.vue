<script setup lang="ts">
import type { PaginationListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationList, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<PaginationListProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), {
  as: 'ul',
})
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationList
    v-slot="slotProps"
    role="list"
    data-slot="pagination-content"
    v-bind="forwarded"
    :class="cn('flex flex-row flex-wrap items-center justify-center gap-1', props.class)"
  >
    <slot v-bind="slotProps" />
  </PaginationList>
</template>
