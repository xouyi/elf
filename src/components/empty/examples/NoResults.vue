<script setup lang="ts">
import { SearchX } from '@lucide/vue'
import { ElfButton, ElfEmpty, ElfEmptyContent, ElfEmptyDescription, ElfEmptyHeader, ElfEmptyMedia, ElfEmptyTitle } from '@xouyi/elfui'
</script>

<template>
  <ElfEmpty class="w-full max-w-lg border-solid">
    <ElfEmptyHeader>
      <ElfEmptyMedia>
        <SearchX />
      </ElfEmptyMedia>
      <ElfEmptyTitle>No results for "swerve"</ElfEmptyTitle>
      <ElfEmptyDescription>Try a different keyword or clear the filters.</ElfEmptyDescription>
    </ElfEmptyHeader>
    <ElfEmptyContent>
      <ElfButton variant="outline" size="sm">
        Clear filters
      </ElfButton>
    </ElfEmptyContent>
  </ElfEmpty>
</template>
