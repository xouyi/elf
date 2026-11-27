<script setup lang="ts">
import type { AvatarGroupProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<AvatarGroupProps>()
</script>

<template>
  <div
    data-slot="avatar-group"
    role="group"
    :class="cn('flex items-center -space-x-1.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background', props.class)"
  >
    <slot />
  </div>
</template>
