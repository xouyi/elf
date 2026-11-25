<script setup lang="ts">
import type { FieldLabelProps } from './index'
import { cn } from '../../lib/utils'
import { Label } from '../label'
import { useFieldContext } from './context'

const props = defineProps<FieldLabelProps>()
const field = useFieldContext()
</script>

<template>
  <Label
    :id="field?.labelId"
    data-slot="field-label"
    :for="field?.id"
    :class="cn(
      'group-data-[orientation=horizontal]:sm:h-9 group-data-[orientation=horizontal]:sm:w-40 group-data-[orientation=horizontal]:sm:shrink-0',
      props.class,
    )"
  >
    <slot />
    <span v-if="field?.required.value" aria-hidden="true" class="text-destructive-text">*</span>
  </Label>
</template>
