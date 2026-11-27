<script setup lang="ts">
import type { PaginationPrevProps } from './index'
import { ChevronLeft } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationPrev as RekaPrev, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-prev-item">
    <RekaPrev
      data-slot="pagination-prev"
      v-bind="forwarded"
      :class="cn(buttonVariants({ variant: 'ghost', size: props.size }), props.class)"
    >
      <slot>
        <ChevronLeft aria-hidden="true" />
        <span class="hidden sm:inline">Previous</span>
      </slot>
    </RekaPrev>
  </li>
</template>
