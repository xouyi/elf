<script setup lang="ts">
import type { PaginationRootEmits } from 'reka-ui'
import type { PaginationProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<PaginationProps>(), {
  ariaLabel: 'Pagination',
  siblingCount: 1,
  showEdges: true,
})
const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'ariaLabel')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PaginationRoot
    v-slot="slotProps"
    data-slot="pagination"
    :aria-label="props.ariaLabel"
    v-bind="forwarded"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <slot v-bind="slotProps" />
  </PaginationRoot>
</template>
