<script setup lang="ts">
import { ElfButton, ElfSheet, ElfSheetContent, ElfSheetDescription, ElfSheetHeader, ElfSheetTitle, ElfSheetTrigger } from '@xouyi/elfui'

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ElfSheet v-for="side in sides" :key="side">
      <ElfSheetTrigger as-child>
        <ElfButton variant="outline" class="capitalize">
          {{ side }}
        </ElfButton>
      </ElfSheetTrigger>
      <ElfSheetContent :side="side">
        <ElfSheetHeader>
          <ElfSheetTitle class="capitalize">
            {{ side }} sheet
          </ElfSheetTitle>
          <ElfSheetDescription>The panel slides in from the {{ side }} edge.</ElfSheetDescription>
        </ElfSheetHeader>
      </ElfSheetContent>
    </ElfSheet>
  </div>
</template>
