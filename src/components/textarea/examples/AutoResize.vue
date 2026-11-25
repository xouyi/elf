<script setup lang="ts">
import { ElfLabel, ElfTextarea } from '@elf/ui'
import { ref } from 'vue'

const notes = ref('Swerve module 3 drifts under load.\nCheck the encoder offset before the next match.')
</script>

<template>
  <div class="grid w-80 gap-2">
    <ElfLabel for="textarea-notes">
      Pit notes
    </ElfLabel>
    <ElfTextarea id="textarea-notes" v-model="notes" auto-resize :rows="2" class="max-h-48" />
    <p class="text-sm text-muted-foreground">
      Grows with the text up to 12rem, then scrolls.
    </p>
  </div>
</template>
