<script setup lang="ts">
import type { AvatarFallbackProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { AvatarFallback, useForwardProps } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<AvatarFallbackProps>()
const delegatedProps = reactiveOmit(props, 'class', 'name')
const forwardedProps = useForwardProps(delegatedProps)
const slots = useSlots()

const initials = computed(() => {
  const words = props.name?.trim().split(/\s+/).filter(Boolean) ?? []
  if (words.length === 0)
    return ''
  const letters = words.length === 1 ? [words[0]!] : [words[0]!, words.at(-1)!]
  return letters.map(word => Array.from(word)[0]).join('').toUpperCase()
})
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="forwardedProps"
    :class="cn(
      'flex size-full items-center justify-center bg-muted font-medium tracking-tight text-muted-foreground',
      'text-xs group-data-[size=sm]/avatar:text-[0.625rem] group-data-[size=lg]/avatar:text-sm group-data-[size=xl]/avatar:text-lg',
      props.class,
    )"
  >
    <slot>
      <template v-if="!slots.default">
        {{ initials }}
      </template>
    </slot>
  </AvatarFallback>
</template>
