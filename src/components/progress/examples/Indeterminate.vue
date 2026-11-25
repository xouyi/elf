<script setup lang="ts">
import { ElfProgress } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-80 max-w-full gap-2">
    <p id="progress-sync-label" class="text-sm font-medium">
      Syncing the match schedule
    </p>
    <!-- No value: the bar animates and exposes no aria-valuenow, because the duration is unknown. -->
    <ElfProgress :model-value="null" aria-labelledby="progress-sync-label" />
  </div>
</template>
