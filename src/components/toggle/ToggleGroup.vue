<script setup lang="ts">
import type { ToggleGroupRootEmits } from 'reka-ui'
import type { ToggleGroupProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { provide } from 'vue'
import { cn } from '../../lib/utils'
import { toggleGroupKey } from './index'

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  variant: 'default',
  size: 'default',
  joined: false,
})
const emits = defineEmits<ToggleGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size', 'joined')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

provide(toggleGroupKey, {
  get variant() { return props.variant },
  get size() { return props.size },
  get joined() { return props.joined },
})
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    data-slot="toggle-group"
    :data-variant="props.variant"
    :data-size="props.size"
    v-bind="forwarded"
    :class="cn('flex w-fit flex-wrap items-center', props.joined ? 'gap-0' : 'gap-1', props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
