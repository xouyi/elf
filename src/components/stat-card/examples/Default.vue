<script setup lang="ts">
import { ElfStatCard } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
    <ElfStatCard
      label="Active members"
      value="48"
      trend="+6"
      trend-direction="up"
      trend-label="up 6 since last month"
      tone="success"
      hint="since last month"
    />
    <ElfStatCard
      label="Open issues"
      value="17"
      trend="-3"
      trend-direction="down"
      trend-label="down 3 since last week"
      hint="since last week"
    />
    <ElfStatCard label="Parts in stock" value="1,284" hint="across 6 shelves" />
  </div>
</template>
