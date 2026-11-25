<script setup lang="ts">
import { ElfInput } from '@elf/ui'
</script>

<template>
  <div class="grid w-72 gap-2">
    <ElfInput aria-invalid="true" model-value="not-an-email" aria-label="Email" aria-describedby="email-error" />
    <p id="email-error" class="text-sm text-destructive">
      Enter a valid email address.
    </p>
  </div>
</template>
