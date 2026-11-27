<script setup lang="ts">
import type { GradientTextProps } from './index'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { gradientTextDirections, gradientTextPresets } from './index'

const props = withDefaults(defineProps<GradientTextProps>(), {
  as: 'span',
  variant: 'brand',
  direction: 'r',
  animate: false,
})

const stops = computed(() => {
  const preset = gradientTextPresets[props.variant]
  const base: readonly string[] = 'stops' in preset
    ? preset.stops
    : preset.light.map((light, i) => `light-dark(${light}, ${preset.dark[i]})`)
  const first = props.from ?? base[0]!
  const last = props.to ?? base[base.length - 1]!
  const middle = props.via ?? (base.length > 2 ? base[1] : undefined)
  return [first, middle, last].filter(Boolean).join(', ')
})

const style = computed(() => ({
  backgroundImage: `linear-gradient(${gradientTextDirections[props.direction]}, ${stops.value})`,
  backgroundSize: props.animate ? '200% 200%' : undefined,
}))
</script>

<template>
  <Primitive
    data-slot="gradient-text"
    :data-variant="props.variant"
    :as="props.as"
    :as-child="props.asChild"
    :style="style"
    :class="cn(
      'bg-clip-text text-transparent [box-decoration-break:clone]',
      props.animate && 'animate-[elf-gradient-shimmer_6s_ease-in-out_infinite_alternate] motion-reduce:animate-none',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
