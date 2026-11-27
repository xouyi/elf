<script setup lang="ts">
import type { NavigationMenuLinkEmits } from 'reka-ui'
import type { NavigationMenuLinkProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuLink, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { navigationMenuItemLinkClass, navigationMenuTriggerStyle } from './styles'

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  variant: 'item',
})
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    :data-variant="props.variant"
    v-bind="forwarded"
    :class="cn(props.variant === 'trigger' ? navigationMenuTriggerStyle() : navigationMenuItemLinkClass, props.class)"
  >
    <slot />
  </NavigationMenuLink>
</template>
