<script setup lang="ts">
import { ElfInput } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-72 gap-2">
    <ElfInput aria-invalid="true" model-value="not-an-email" aria-label="Email" aria-describedby="email-error" />
    <p id="email-error" class="text-sm text-[color-mix(in_oklab,var(--color-destructive)_55%,white)]">
      Enter a valid email address.
    </p>
  </div>
</template>
