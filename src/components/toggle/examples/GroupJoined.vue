<script setup lang="ts">
import { ElfToggleGroup, ElfToggleGroupItem } from '@xouyi/elfui'
</script>

<template>
  <ElfToggleGroup type="single" variant="outline" joined default-value="week" aria-label="Time range">
    <ElfToggleGroupItem value="day">
      Day
    </ElfToggleGroupItem>
    <ElfToggleGroupItem value="week">
      Week
    </ElfToggleGroupItem>
    <ElfToggleGroupItem value="month">
      Month
    </ElfToggleGroupItem>
    <ElfToggleGroupItem value="year" disabled>
      Year
    </ElfToggleGroupItem>
  </ElfToggleGroup>
</template>
