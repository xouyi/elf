<script setup lang="ts">
import { ElfKbd, ElfKbdGroup } from '@elf/ui'
</script>

<template>
  <p class="text-sm text-muted-foreground">
    Press
    <ElfKbdGroup>
      <ElfKbd>Ctrl</ElfKbd>
      <span aria-hidden="true">+</span>
      <ElfKbd>K</ElfKbd>
    </ElfKbdGroup>
    to open the command menu.
  </p>
</template>
