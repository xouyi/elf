<script setup lang="ts">
import { ElfPagination, ElfPaginationContent, ElfPaginationEllipsis, ElfPaginationItem, ElfPaginationNext, ElfPaginationPrev } from '@xouyi/elfui'
</script>

<template>
  <ElfPagination disabled :default-page="2" :total="60" :items-per-page="10">
    <ElfPaginationContent v-slot="{ items }">
      <ElfPaginationPrev />
      <template v-for="(item, i) in items" :key="i">
        <ElfPaginationItem v-if="item.type === 'page'" :value="item.value" />
        <ElfPaginationEllipsis v-else />
      </template>
      <ElfPaginationNext />
    </ElfPaginationContent>
  </ElfPagination>
</template>
