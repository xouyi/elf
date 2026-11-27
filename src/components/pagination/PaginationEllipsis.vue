<script setup lang="ts">
import type { PaginationEllipsisProps } from './index'
import { Ellipsis } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationEllipsis, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<PaginationEllipsisProps>(), {
  label: 'More pages',
})
const delegatedProps = reactiveOmit(props, 'class', 'label')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-ellipsis-item">
    <PaginationEllipsis
      data-slot="pagination-ellipsis"
      v-bind="forwarded"
      :class="cn('flex size-9 items-center justify-center text-muted-foreground', props.class)"
    >
      <slot>
        <Ellipsis class="size-4" aria-hidden="true" />
      </slot>
      <span class="sr-only">{{ props.label }}</span>
    </PaginationEllipsis>
  </li>
</template>
