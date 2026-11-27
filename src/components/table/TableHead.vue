<script setup lang="ts">
import type { TableHeadProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableHeadProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <th
    data-slot="table-head"
    scope="col"
    :aria-sort="props.sort"
    :role="context.stack ? 'columnheader' : undefined"
    :class="cn(
      'h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground',
      'group-data-[density=compact]/table:h-8 group-data-[density=compact]/table:px-3 group-data-[density=comfortable]/table:h-12',
      'group-data-[sticky=true]/table:sticky group-data-[sticky=true]/table:top-0 group-data-[sticky=true]/table:z-10 group-data-[sticky=true]/table:bg-background group-data-[sticky=true]/table:shadow-[inset_0_-1px_0_var(--border)]',
      props.class,
    )"
  >
    <slot />
  </th>
</template>
