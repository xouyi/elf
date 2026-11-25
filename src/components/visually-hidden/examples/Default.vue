<script setup lang="ts">
import { ElfButton, ElfVisuallyHidden } from '@xouyi/elfui'
import { Trash2 } from '@lucide/vue'
</script>

<template>
  <ElfButton variant="outline" size="icon">
    <Trash2 />
    <ElfVisuallyHidden>Delete item</ElfVisuallyHidden>
  </ElfButton>
</template>
