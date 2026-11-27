<script setup lang="ts">
import { ElfButton, ElfSheet, ElfSheetContent, ElfSheetDescription, ElfSheetHeader, ElfSheetTitle, ElfSheetTrigger } from '@xouyi/elfui'

const sizes = ['sm', 'default', 'lg', 'full'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ElfSheet v-for="size in sizes" :key="size">
      <ElfSheetTrigger as-child>
        <ElfButton variant="outline" class="capitalize">
          {{ size }}
        </ElfButton>
      </ElfSheetTrigger>
      <ElfSheetContent :size="size">
        <ElfSheetHeader>
          <ElfSheetTitle class="capitalize">
            {{ size }} sheet
          </ElfSheetTitle>
          <ElfSheetDescription>On a phone every side sheet leaves a strip of the page visible; from the sm breakpoint the size sets the maximum width.</ElfSheetDescription>
        </ElfSheetHeader>
      </ElfSheetContent>
    </ElfSheet>
  </div>
</template>
