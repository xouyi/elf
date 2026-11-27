<script setup lang="ts">
import type { EmptyPartProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<EmptyPartProps>()
</script>

<template>
  <div
    data-slot="empty-header"
    :class="cn('flex max-w-sm flex-col items-center gap-2 text-center', props.class)"
  >
    <slot />
  </div>
</template>
