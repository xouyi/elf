<script setup lang="ts">
import { ElfButton, ElfSeparator } from 'elfui'
</script>

<template>
  <div class="grid w-72 gap-4">
    <ElfButton>Sign in with your member account</ElfButton>
    <div class="flex items-center gap-3 text-xs text-muted-foreground uppercase">
      <ElfSeparator class="flex-1" />
      or
      <ElfSeparator class="flex-1" />
    </div>
    <ElfButton variant="outline">
      Request access
    </ElfButton>
  </div>
</template>
