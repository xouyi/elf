<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { useFieldContext } from '../field'

const props = withDefaults(defineProps<RadioGroupRootProps & {
  /** Marks the group as invalid: sets `aria-invalid="true"` and the destructive border on every item. */
  invalid?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), {
  // Reka defaults to true; without this Vue's boolean casting would forward `false`.
  loop: true,
})
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'invalid')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Inside an ElfField the group is named by the field label (a div cannot be the target of `for`) and reports the required state.
const field = useFieldContext()
const required = computed(() => props.required || Boolean(field?.required.value))
const labelledBy = computed(() => field?.labelId)
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :required="required"
    :aria-labelledby="labelledBy"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :class="cn(
      'group/radio-group grid gap-3 data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-x-5',
      props.class,
    )"
  >
    <slot />
  </RadioGroupRoot>
</template>
