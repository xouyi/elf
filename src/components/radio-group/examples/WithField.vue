<script setup lang="ts">
import { ElfButton, ElfField, ElfFieldControl, ElfLabel, ElfRadioGroup, ElfRadioGroupItem } from '@xouyi/elfui'
import { ref } from 'vue'

const priority = ref('')
const submitted = ref(false)
const sent = ref(false)
const options = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
]

function submit() {
  submitted.value = true
  sent.value = priority.value !== ''
}
</script>

<template>
  <form class="grid w-80 gap-5" novalidate @submit.prevent="submit">
    <ElfField
      label="Priority"
      description="How soon does the part need to ship?"
      required
      :error="submitted && !priority ? 'Choose a priority.' : ''"
    >
      <ElfFieldControl>
        <ElfRadioGroup v-model="priority">
          <div v-for="option in options" :key="option.value" class="flex items-center gap-3">
            <ElfRadioGroupItem :id="`field-priority-${option.value}`" :value="option.value" />
            <ElfLabel :for="`field-priority-${option.value}`">
              {{ option.label }}
            </ElfLabel>
          </div>
        </ElfRadioGroup>
      </ElfFieldControl>
    </ElfField>
    <ElfButton type="submit" class="w-fit">
      Request part
    </ElfButton>
    <p v-if="sent" role="status" class="text-sm text-muted-foreground">
      Request sent with {{ priority }} priority.
    </p>
  </form>
</template>
