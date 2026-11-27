<script setup lang="ts">
import type { TableRowProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableRowProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <tr
    data-slot="table-row"
    :data-state="props.selected ? 'selected' : undefined"
    :role="context.stack ? 'row' : undefined"
    :class="cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      'group-data-[stack=true]/table:max-sm:block group-data-[stack=true]/table:max-sm:rounded-lg group-data-[stack=true]/table:max-sm:border group-data-[stack=true]/table:max-sm:bg-card group-data-[stack=true]/table:max-sm:py-1',
      props.class,
    )"
  >
    <slot />
  </tr>
</template>
