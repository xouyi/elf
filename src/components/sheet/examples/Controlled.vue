<script setup lang="ts">
import { ElfButton, ElfSheet, ElfSheetContent, ElfSheetDescription, ElfSheetHeader, ElfSheetTitle } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfButton variant="outline" @click="open = true">
      Open filters
    </ElfButton>
    <span class="text-sm text-muted-foreground">open = {{ open }}</span>
    <ElfSheet v-model:open="open">
      <ElfSheetContent side="left">
        <ElfSheetHeader>
          <ElfSheetTitle>Filters</ElfSheetTitle>
          <ElfSheetDescription>The open state lives in your component.</ElfSheetDescription>
        </ElfSheetHeader>
      </ElfSheetContent>
    </ElfSheet>
  </div>
</template>
