<script setup lang="ts">
import { ElfStatCard } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
    <ElfStatCard label="Uptime" value="99.9%" trend="+0.2%" trend-direction="up" trend-label="up 0.2 percent" tone="success" hint="last 30 days" />
    <ElfStatCard label="Low stock" value="9" trend="+4" trend-direction="up" trend-label="4 more than last week" tone="warning" hint="needs a reorder" />
    <ElfStatCard label="Failed logins" value="31" trend="+12" trend-direction="up" trend-label="12 more than yesterday" tone="destructive" hint="today" />
    <ElfStatCard label="Sessions" value="212" trend="0" trend-direction="flat" trend-label="unchanged" hint="today" />
  </div>
</template>
