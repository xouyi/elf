<script setup lang="ts">
import { ElfInput, ElfVisuallyHidden } from '@elf/ui'
</script>

<template>
  <form class="flex w-72 items-center gap-2" role="search" @submit.prevent>
    <label for="visually-hidden-search">
      <ElfVisuallyHidden>Search members</ElfVisuallyHidden>
    </label>
    <ElfInput id="visually-hidden-search" type="search" placeholder="Search members" />
  </form>
</template>
