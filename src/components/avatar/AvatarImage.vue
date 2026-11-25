<script setup lang="ts">
import type { AvatarImageEmits } from 'reka-ui'
import type { AvatarImageProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { AvatarImage, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<AvatarImageProps>()
const emits = defineEmits<AvatarImageEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="cn('aspect-square size-full object-cover', props.class)"
  />
</template>
