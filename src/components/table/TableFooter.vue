<script setup lang="ts">
import type { TableSectionProps } from './index'
import { inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'

const props = defineProps<TableSectionProps>()
const context = inject(tableContextKey, { stack: false })
</script>

<template>
  <tfoot
    data-slot="table-footer"
    :role="context.stack ? 'rowgroup' : undefined"
    :class="cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', 'group-data-[stack=true]/table:max-sm:mt-3 group-data-[stack=true]/table:max-sm:block', props.class)"
  >
    <slot />
  </tfoot>
</template>
