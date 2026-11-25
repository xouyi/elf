<script setup lang="ts">
withDefaults(defineProps<{ withText?: boolean }>(), { withText: true })
</script>

<template>
  <span class="inline-flex items-center gap-2 font-semibold tracking-tight">
    <svg class="size-6 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7z" class="fill-primary" />
      <path d="M9 8h6M9 12h5M9 16h6" stroke="var(--elf-primary-foreground)" stroke-width="1.8" stroke-linecap="square" />
    </svg>
    <span v-if="withText">ElfUI</span>
  </span>
</template>
