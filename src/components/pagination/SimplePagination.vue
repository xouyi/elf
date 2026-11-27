<script setup lang="ts">
import type { PaginationRootEmits } from 'reka-ui'
import type { SimplePaginationProps } from './index'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationNext, PaginationPrev, PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<SimplePaginationProps>(), {
  ariaLabel: 'Pagination',
  prevLabel: 'Previous',
  nextLabel: 'Next',
})
const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'ariaLabel', 'prevLabel', 'nextLabel')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PaginationRoot
    v-slot="{ page, pageCount }"
    data-slot="simple-pagination"
    :aria-label="props.ariaLabel"
    v-bind="forwarded"
    :class="cn('flex w-full items-center justify-between gap-2', props.class)"
  >
    <PaginationPrev
      data-slot="simple-pagination-prev"
      :aria-label="props.prevLabel"
      :class="buttonVariants({ variant: 'outline', size: 'default' })"
    >
      <ChevronLeft aria-hidden="true" />
      <span class="hidden sm:inline">{{ props.prevLabel }}</span>
    </PaginationPrev>
    <p data-slot="simple-pagination-status" class="text-sm text-muted-foreground" aria-live="polite">
      <slot name="status" :page="page" :page-count="pageCount">
        Page {{ page }} of {{ pageCount }}
      </slot>
    </p>
    <PaginationNext
      data-slot="simple-pagination-next"
      :aria-label="props.nextLabel"
      :class="buttonVariants({ variant: 'outline', size: 'default' })"
    >
      <span class="hidden sm:inline">{{ props.nextLabel }}</span>
      <ChevronRight aria-hidden="true" />
    </PaginationNext>
  </PaginationRoot>
</template>
