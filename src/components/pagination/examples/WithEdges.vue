<script setup lang="ts">
import {
  ElfPagination,
  ElfPaginationContent,
  ElfPaginationEllipsis,
  ElfPaginationFirst,
  ElfPaginationItem,
  ElfPaginationLast,
  ElfPaginationNext,
  ElfPaginationPrev,
} from '@xouyi/elfui'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <ElfPagination v-model:page="page" :total="500" :items-per-page="10" :sibling-count="0" aria-label="Search results">
    <ElfPaginationContent v-slot="{ items }">
      <ElfPaginationFirst />
      <ElfPaginationPrev />
      <template v-for="(item, i) in items" :key="i">
        <ElfPaginationItem v-if="item.type === 'page'" :value="item.value" />
        <ElfPaginationEllipsis v-else />
      </template>
      <ElfPaginationNext />
      <ElfPaginationLast />
    </ElfPaginationContent>
  </ElfPagination>
</template>
