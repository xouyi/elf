<script setup lang="ts">
import type { PaginationNextProps } from './index'
import { ChevronRight } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationNext as RekaNext, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationNextProps>(), {
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-next-item">
    <RekaNext
      data-slot="pagination-next"
      v-bind="forwarded"
      :class="cn(buttonVariants({ variant: 'ghost', size: props.size }), props.class)"
    >
      <slot>
        <span class="hidden sm:inline">Next</span>
        <ChevronRight aria-hidden="true" />
      </slot>
    </RekaNext>
  </li>
</template>
