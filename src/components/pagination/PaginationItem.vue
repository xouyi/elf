<script setup lang="ts">
import type { PaginationItemProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { PaginationListItem, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationItemProps>(), {
  size: 'icon',
})
const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <li data-slot="pagination-item">
    <PaginationListItem
      data-slot="pagination-link"
      v-bind="forwarded"
      :class="cn(buttonVariants({ variant: 'ghost', size: props.size }), 'data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground', props.class)"
    >
      <slot>{{ props.value }}</slot>
    </PaginationListItem>
  </li>
</template>
