<script setup lang="ts">
import type { FieldContext } from './context'
import type { FieldProps } from './index'
import { computed, provide, ref, useId, useSlots } from 'vue'
import { cn } from '../../lib/utils'
import { fieldContextKey } from './context'
import FieldDescription from './FieldDescription.vue'
import FieldError from './FieldError.vue'
import FieldLabel from './FieldLabel.vue'
import { fieldVariants } from './index'

const props = withDefaults(defineProps<FieldProps>(), {
  orientation: 'vertical',
  invalid: false,
  required: false,
  disabled: false,
})

const slots = useSlots()
const generatedId = useId()
const id = computed(() => props.id ?? `field-${generatedId}`)

// Parts rendered by hand (ElfFieldDescription, ElfFieldError) register themselves while mounted.
const registered = ref({ description: 0, error: 0 })

const hasDescription = computed(() => Boolean(props.description || slots.description) || registered.value.description > 0)
const hasError = computed(() => Boolean(props.error || slots.error) || registered.value.error > 0)

const context: FieldContext = {
  get id() { return id.value },
  get labelId() { return `${id.value}-label` },
  get descriptionId() { return `${id.value}-description` },
  get errorId() { return `${id.value}-error` },
  invalid: computed(() => props.invalid || hasError.value),
  required: computed(() => props.required),
  disabled: computed(() => props.disabled),
  hasDescription,
  hasError,
  register(part) {
    registered.value[part]++
    return () => {
      registered.value[part]--
    }
  },
}
provide(fieldContextKey, context)
</script>

<template>
  <div
    data-slot="field"
    :data-orientation="props.orientation"
    :data-invalid="context.invalid.value || undefined"
    :data-disabled="props.disabled || undefined"
    :class="cn(fieldVariants({ orientation: props.orientation }), props.class)"
  >
    <FieldLabel v-if="props.label || slots.label">
      <slot name="label">
        {{ props.label }}
      </slot>
    </FieldLabel>
    <div data-slot="field-content" class="flex min-w-0 flex-1 flex-col gap-2">
      <slot />
      <FieldDescription v-if="props.description || slots.description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </FieldDescription>
      <FieldError v-if="props.error || slots.error">
        <slot name="error">
          {{ props.error }}
        </slot>
      </FieldError>
    </div>
  </div>
</template>
