<script setup lang="ts">
import type { AvatarProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { AvatarRoot, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { avatarVariants } from './index'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'size', 'label')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="props.size"
    v-bind="forwardedProps"
    :role="props.label ? 'img' : undefined"
    :aria-label="props.label"
    :class="cn(avatarVariants({ size: props.size }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
