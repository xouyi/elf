<script setup lang="ts">
import type { SwitchRootEmits } from 'reka-ui'
import type { SwitchProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { switchVariants } from './index'

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'default',
})
const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    :data-size="props.size"
    v-bind="forwarded"
    :class="cn(switchVariants({ size: props.size }), props.class)"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="pointer-events-none block size-5 rounded-(--elf-radius-pill) bg-muted-foreground transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground group-data-[size=sm]/switch:size-4 group-data-[size=sm]/switch:data-[state=checked]:translate-x-4 motion-reduce:transition-none"
    >
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
