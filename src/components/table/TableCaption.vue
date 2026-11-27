<script setup lang="ts">
import type { TableCaptionProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<TableCaptionProps>()
</script>

<template>
  <caption
    data-slot="table-caption"
    :class="cn('px-4 py-3 text-left text-sm font-medium text-muted-foreground', props.class)"
  >
    <slot />
  </caption>
</template>
