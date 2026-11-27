<script setup lang="ts">
import type { PaginationFirstProps } from './index'
import { ChevronsLeft } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationFirst as RekaFirst, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  size: 'icon',
})
const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-first-item">
    <RekaFirst
      data-slot="pagination-first"
      v-bind="forwarded"
      :class="cn(buttonVariants({ variant: 'ghost', size: props.size }), props.class)"
    >
      <slot>
        <ChevronsLeft aria-hidden="true" />
      </slot>
    </RekaFirst>
  </li>
</template>
