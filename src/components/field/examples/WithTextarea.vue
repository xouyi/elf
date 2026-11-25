<script setup lang="ts">
import { ElfField, ElfFieldControl, ElfTextarea } from '@xouyi/elfui'
import { ref } from 'vue'

const bio = ref('Hi')
</script>

<template>
  <ElfField
    label="Bio"
    description="Shown on your public member card."
    error="Write at least 20 characters."
    class="w-80"
  >
    <ElfFieldControl>
      <ElfTextarea v-model="bio" auto-resize />
    </ElfFieldControl>
  </ElfField>
</template>
