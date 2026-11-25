<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Check, Minus } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { useFieldContext } from '../field'

const props = defineProps<CheckboxRootProps & {
  /** Marks the checkbox as invalid: sets `aria-invalid="true"` and the destructive border and ring. */
  invalid?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'invalid')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Inside an ElfField the checkbox also reports the field's required state (aria-required and form validation).
const field = useFieldContext()
const required = computed(() => props.required || Boolean(field?.required.value))
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :required="required"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :class="cn(
      'peer size-4 shrink-0 rounded-[max(0px,calc(var(--elf-radius)-6px))] border border-input bg-transparent text-primary-foreground transition-[color,box-shadow] outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/30',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
      props.class,
    )"
  >
    <CheckboxIndicator data-slot="checkbox-indicator" class="flex items-center justify-center text-current">
      <slot v-bind="slotProps">
        <Minus v-if="slotProps.state === 'indeterminate'" class="size-3.5" />
        <Check v-else class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
