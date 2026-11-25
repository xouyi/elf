<script setup lang="ts">
import { ElfButton, ElfCheckbox, ElfField, ElfFieldControl, ElfFieldDescription, ElfFieldError, ElfFieldLabel } from '@xouyi/elfui'
import { ref } from 'vue'

const accepted = ref(false)
const submitted = ref(false)
const sent = ref(false)

function submit() {
  submitted.value = true
  sent.value = accepted.value
}
</script>

<template>
  <form class="grid w-80 gap-5" novalidate @submit.prevent="submit">
    <ElfField required :invalid="submitted && !accepted">
      <div class="flex items-center gap-3">
        <ElfFieldControl>
          <ElfCheckbox v-model="accepted" />
        </ElfFieldControl>
        <ElfFieldLabel>I agree to the travel and photo release</ElfFieldLabel>
      </div>
      <ElfFieldDescription>Required for every member attending the event.</ElfFieldDescription>
      <ElfFieldError v-if="submitted && !accepted">
        You must agree before registering.
      </ElfFieldError>
    </ElfField>
    <ElfButton type="submit" class="w-fit">
      Register
    </ElfButton>
    <p v-if="sent" role="status" class="text-sm text-muted-foreground">
      Registration saved.
    </p>
  </form>
</template>
