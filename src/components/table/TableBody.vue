<script setup lang="ts">
import type { TableSectionProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableSectionProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <tbody
    data-slot="table-body"
    :role="context.stack ? 'rowgroup' : undefined"
    :class="cn('[&_tr:last-child]:border-0', 'group-data-[stack=true]/table:max-sm:block group-data-[stack=true]/table:max-sm:space-y-3', props.class)"
  >
    <slot />
  </tbody>
</template>
