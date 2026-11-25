<script setup lang="ts">
import { ElfInput, ElfLabel } from '@elf/ui'
</script>

<template>
  <div class="grid w-72 gap-2">
    <ElfLabel for="label-email">
      Email
    </ElfLabel>
    <ElfInput id="label-email" type="email" placeholder="you@example.com" />
  </div>
</template>
