<script setup lang="ts">
import type { SeparatorProps } from './index'
import { Separator } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
})
</script>

<template>
  <Separator
    data-slot="separator"
    :as="props.as"
    :as-child="props.asChild"
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      props.class,
    )"
  />
</template>
