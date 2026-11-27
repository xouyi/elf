<script setup lang="ts">
import { ElfToggle } from '@xouyi/elfui'
import { Italic } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfToggle aria-label="Italic, default variant">
      <Italic />
    </ElfToggle>
    <ElfToggle variant="outline" aria-label="Italic, outline variant">
      <Italic />
    </ElfToggle>
  </div>
</template>
