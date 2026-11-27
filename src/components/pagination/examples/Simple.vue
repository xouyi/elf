<script setup lang="ts">
import { ElfSimplePagination } from '@xouyi/elfui'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <ElfSimplePagination v-model:page="page" :total="45" :items-per-page="10" class="max-w-md" />
</template>
