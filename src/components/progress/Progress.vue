<script setup lang="ts">
import type { ProgressRootEmits } from 'reka-ui'
import type { ProgressProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/utils'
import { progressVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ProgressProps>(), {
  size: 'default',
})
const emits = defineEmits<ProgressRootEmits>()

const attrs = useAttrs()
const delegatedProps = reactiveOmit(props, 'class', 'indicatorClass', 'size', 'label', 'getValueLabel')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// The name comes from `label` or aria-label; with aria-labelledby the visible label names the bar. Otherwise Reka's "60%" is used.
function valueLabel(value: number | null | undefined, max: number) {
  const explicit = props.label ?? attrs['aria-label']
  if (explicit)
    return String(explicit)
  if (attrs['aria-labelledby'])
    return undefined
  return props.getValueLabel?.(value, max) ?? (typeof value === 'number' ? `${Math.round(value / max * 100)}%` : undefined)
}

const max = computed(() => (props.max && props.max > 0 ? props.max : 100))
function percent(value: number | null | undefined) {
  return typeof value === 'number' ? Math.min(100, Math.max(0, value / max.value * 100)) : null
}
</script>

<template>
  <ProgressRoot
    v-slot="{ modelValue }"
    data-slot="progress"
    :data-size="props.size"
    v-bind="{ ...attrs, ...forwarded }"
    :get-value-label="valueLabel"
    :class="cn(progressVariants({ size: props.size }), props.class)"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      :style="percent(modelValue) === null ? undefined : { width: `${percent(modelValue)}%` }"
      :class="cn(
        'h-full rounded-(--elf-radius-pill) bg-primary transition-[width] duration-300 motion-reduce:transition-none',
        'data-[state=indeterminate]:absolute data-[state=indeterminate]:w-2/5 data-[state=indeterminate]:animate-[elf-progress-indeterminate_1.4s_ease-in-out_infinite]',
        'motion-reduce:data-[state=indeterminate]:inset-0 motion-reduce:data-[state=indeterminate]:w-full motion-reduce:data-[state=indeterminate]:animate-none motion-reduce:data-[state=indeterminate]:opacity-50',
        props.indicatorClass,
      )"
    />
  </ProgressRoot>
</template>
