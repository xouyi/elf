<script setup lang="ts">
import { ElfStatCard, ElfStatCardLink } from '@xouyi/elfui'
</script>

<template>
  <ElfStatCard value="12" hint="waiting for approval" class="w-full max-w-xs">
    <template #label>
      <ElfStatCardLink href="#pending">
        Pending requests
      </ElfStatCardLink>
    </template>
  </ElfStatCard>
</template>
