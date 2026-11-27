<script lang="ts">
import type { AspectRatioProps as RekaAspectRatioProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { AspectRatio, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

export interface AspectRatioProps extends RekaAspectRatioProps {
  /** Width divided by height, for example `16 / 9`. Defaults to `1`. */
  ratio?: number
  /** Extra classes, merged onto the frame through `cn()`. */
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AspectRatioProps>(), { ratio: 1 })
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <AspectRatio
    data-slot="aspect-ratio"
    v-bind="forwarded"
    :class="cn('overflow-hidden rounded-lg bg-muted [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover', props.class)"
  >
    <slot />
  </AspectRatio>
</template>
