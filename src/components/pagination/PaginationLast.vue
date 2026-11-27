<script setup lang="ts">
import type { PaginationLastProps } from './index'
import { ChevronsRight } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationLast as RekaLast, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationLastProps>(), {
  size: 'icon',
})
const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-last-item">
    <RekaLast
      data-slot="pagination-last"
      v-bind="forwarded"
      :class="cn(buttonVariants({ variant: 'ghost', size: props.size }), props.class)"
    >
      <slot>
        <ChevronsRight aria-hidden="true" />
      </slot>
    </RekaLast>
  </li>
</template>
