<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { TooltipProvider, TooltipRoot, useForwardPropsEmits } from 'reka-ui'
import { inject } from 'vue'
import { tooltipProviderKey } from './context'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
// Without an ElfTooltipProvider above, the tooltip creates its own so it works standalone.
const hasProvider = inject(tooltipProviderKey, null) !== null
</script>

<template>
  <TooltipRoot
    v-if="hasProvider"
    v-slot="slotProps"
    data-slot="tooltip"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </TooltipRoot>
  <TooltipProvider v-else :delay-duration="400">
    <TooltipRoot
      v-slot="slotProps"
      data-slot="tooltip"
      v-bind="forwarded"
    >
      <slot v-bind="slotProps" />
    </TooltipRoot>
  </TooltipProvider>
</template>
