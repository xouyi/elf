<script setup lang="ts">
import type { BreadcrumbSeparatorProps } from './index'
import { ChevronRight } from '@lucide/vue'
import { cn } from '../../lib/utils'

const props = defineProps<BreadcrumbSeparatorProps>()
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('inline-flex items-center [&>svg]:size-3.5', props.class)"
  >
    <slot>
      <ChevronRight class="rtl:rotate-180" />
    </slot>
  </li>
</template>
