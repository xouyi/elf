<script setup lang="ts">
import type { TableSectionProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableSectionProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <thead
    data-slot="table-header"
    :role="context.stack ? 'rowgroup' : undefined"
    :class="cn('bg-background [&_tr]:border-b', 'group-data-[stack=true]/table:max-sm:sr-only', props.class)"
  >
    <slot />
  </thead>
</template>
