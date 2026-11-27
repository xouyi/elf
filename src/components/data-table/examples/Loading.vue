<script setup lang="ts">
import { createDataTableColumnHelper, ElfDataTable } from '@xouyi/elfui'

interface Task {
  id: string
  title: string
  owner: string
}

const col = createDataTableColumnHelper<Task>()
const columns = [
  col.accessor('title', { header: 'Task' }),
  col.accessor('owner', { header: 'Owner' }),
]
</script>

<template>
  <ElfDataTable caption="Tasks" :columns="columns" :data="[]" loading :loading-rows="4" />
</template>
