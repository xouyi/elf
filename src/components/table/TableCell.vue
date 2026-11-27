<script setup lang="ts">
import type { TableCellProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableCellProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <td
    data-slot="table-cell"
    :data-label="props.label"
    :role="context.stack ? 'cell' : undefined"
    :class="cn(
      'p-4 align-middle',
      'group-data-[density=compact]/table:px-3 group-data-[density=compact]/table:py-2 group-data-[density=comfortable]/table:py-5',
      'group-data-[stack=true]/table:max-sm:flex group-data-[stack=true]/table:max-sm:items-baseline group-data-[stack=true]/table:max-sm:justify-between group-data-[stack=true]/table:max-sm:gap-4 group-data-[stack=true]/table:max-sm:px-4 group-data-[stack=true]/table:max-sm:py-2 group-data-[stack=true]/table:max-sm:text-right',
      'group-data-[stack=true]/table:max-sm:before:text-left group-data-[stack=true]/table:max-sm:before:font-medium group-data-[stack=true]/table:max-sm:before:text-muted-foreground group-data-[stack=true]/table:max-sm:before:content-[attr(data-label)]',
      props.class,
    )"
  >
    <slot />
  </td>
</template>
