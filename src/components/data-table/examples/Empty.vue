<script setup lang="ts">
import { createDataTableColumnHelper, ElfButton, ElfDataTable, ElfEmpty, ElfEmptyContent, ElfEmptyDescription, ElfEmptyHeader, ElfEmptyTitle } from '@xouyi/elfui'

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
const tasks: Task[] = []
</script>

<template>
  <div class="grid w-full gap-6">
    <ElfDataTable caption="Tasks (default empty state)" :columns="columns" :data="tasks" />
    <ElfDataTable caption="Tasks (custom empty state)" :columns="columns" :data="tasks">
      <template #empty>
        <ElfEmpty class="w-full border-0 py-6">
          <ElfEmptyHeader>
            <ElfEmptyTitle>No tasks yet</ElfEmptyTitle>
            <ElfEmptyDescription>Create the first task for the team.</ElfEmptyDescription>
          </ElfEmptyHeader>
          <ElfEmptyContent>
            <ElfButton>Create task</ElfButton>
          </ElfEmptyContent>
        </ElfEmpty>
      </template>
    </ElfDataTable>
  </div>
</template>
