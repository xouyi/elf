<script setup lang="ts">
import type { BreadcrumbEllipsisProps } from './index'
import { Ellipsis } from '@lucide/vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<BreadcrumbEllipsisProps>(), {
  label: 'More',
})
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    :class="cn('inline-flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <Ellipsis class="size-4" aria-hidden="true" />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </span>
</template>
