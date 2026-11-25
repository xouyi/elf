<script setup lang="ts">
import { ElfKbd, ElfKbdGroup, ElfVisuallyHidden } from 'elfui'
import { ArrowDown, ArrowUp, CornerDownLeft } from '@lucide/vue'
</script>

<template>
  <div class="grid gap-3 text-sm text-muted-foreground">
    <div class="flex items-center gap-2">
      <ElfKbdGroup>
        <ElfKbd>
          <ArrowUp aria-hidden="true" />
          <ElfVisuallyHidden>Arrow up</ElfVisuallyHidden>
        </ElfKbd>
        <ElfKbd>
          <ArrowDown aria-hidden="true" />
          <ElfVisuallyHidden>Arrow down</ElfVisuallyHidden>
        </ElfKbd>
      </ElfKbdGroup>
      Navigate results
    </div>
    <div class="flex items-center gap-2">
      <ElfKbd>
        <CornerDownLeft aria-hidden="true" />
        <ElfVisuallyHidden>Enter</ElfVisuallyHidden>
      </ElfKbd>
      Open the selected result
    </div>
  </div>
</template>
