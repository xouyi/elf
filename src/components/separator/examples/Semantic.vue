<script setup lang="ts">
import { ElfSeparator } from 'elfui'
</script>

<template>
  <div class="w-72 text-sm">
    <p>Season summary</p>
    <!-- Not decorative: announced as a separator because it divides two regions of content. -->
    <ElfSeparator :decorative="false" class="my-3" />
    <p class="text-muted-foreground">
      Event results
    </p>
  </div>
</template>
