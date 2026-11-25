<script setup lang="ts">
import { ElfLabel, ElfTextarea } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-80 gap-2">
    <ElfLabel for="textarea-bio">
      Bio
    </ElfLabel>
    <ElfTextarea
      id="textarea-bio"
      invalid
      model-value="Hi"
      aria-describedby="textarea-bio-error"
    />
    <p id="textarea-bio-error" class="text-sm text-destructive-text">
      Write at least 20 characters.
    </p>
  </div>
</template>
