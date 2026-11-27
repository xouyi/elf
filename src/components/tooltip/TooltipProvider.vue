<script setup lang="ts">
import type { TooltipProviderProps } from 'reka-ui'
import { TooltipProvider, useForwardProps } from 'reka-ui'
import { provide } from 'vue'
import { tooltipProviderKey } from './context'

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 400,
})
const forwarded = useForwardProps(props)

provide(tooltipProviderKey, true)
</script>

<template>
  <TooltipProvider v-bind="forwarded">
    <slot />
  </TooltipProvider>
</template>
