<script setup lang="ts">
import { ElfButton, ElfSpinner } from '@xouyi/elfui'
import { ref } from 'vue'

const saving = ref(false)

function save() {
  saving.value = true
  setTimeout(() => (saving.value = false), 1500)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfButton :disabled="saving" :aria-busy="saving" @click="save">
      <ElfSpinner v-if="saving" label="Saving changes" />
      {{ saving ? 'Saving' : 'Save changes' }}
    </ElfButton>
    <ElfButton variant="outline" disabled>
      <ElfSpinner label="Please wait" /> Please wait
    </ElfButton>
  </div>
</template>
