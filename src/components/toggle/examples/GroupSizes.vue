<script setup lang="ts">
import { ElfToggleGroup, ElfToggleGroupItem } from '@xouyi/elfui'
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <ElfToggleGroup type="single" size="sm" default-value="a" aria-label="Small group">
      <ElfToggleGroupItem value="a">
        Small
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="b">
        Group
      </ElfToggleGroupItem>
    </ElfToggleGroup>
    <ElfToggleGroup type="single" size="lg" variant="outline" default-value="a" aria-label="Large group">
      <ElfToggleGroupItem value="a">
        Large
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="b">
        Group
      </ElfToggleGroupItem>
    </ElfToggleGroup>
  </div>
</template>
