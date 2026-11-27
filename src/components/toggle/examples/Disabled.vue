<script setup lang="ts">
import { ElfToggle } from '@xouyi/elfui'
import { Bold } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfToggle disabled aria-label="Bold, disabled">
      <Bold />
    </ElfToggle>
    <ElfToggle variant="outline" disabled default-value aria-label="Bold, on and disabled">
      <Bold />
    </ElfToggle>
  </div>
</template>
