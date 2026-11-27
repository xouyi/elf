<script setup lang="ts">
import type { DataTableSelection } from '@xouyi/elfui'
import { createDataTableColumnHelper, ElfBadge, ElfDataTable } from '@xouyi/elfui'
import { ref } from 'vue'

interface Member {
  id: string
  name: string
  team: string
  status: 'Active' | 'Away'
}

const members: Member[] = [
  { id: 'm1', name: 'Ayşe Demir', team: 'Software', status: 'Active' },
  { id: 'm2', name: 'Mert Kaya', team: 'Mechanical', status: 'Active' },
  { id: 'm3', name: 'Elif Yıldız', team: 'Design', status: 'Away' },
  { id: 'm4', name: 'Can Öztürk', team: 'Electrical', status: 'Active' },
  { id: 'm5', name: 'Deniz Arslan', team: 'Software', status: 'Away' },
]

const col = createDataTableColumnHelper<Member>()
const columns = [
  col.accessor('name', { header: 'Name' }),
  col.accessor('team', { header: 'Team' }),
  col.accessor('status', { header: 'Status', enableSorting: false }),
]

const selection = ref<DataTableSelection>({ m2: true })
</script>

<template>
  <div class="grid w-full gap-3">
    <ElfDataTable
      v-model:selection="selection"
      caption="Team members"
      :columns="columns"
      :data="members"
      row-key="id"
      selectable
    >
      <template #cell-status="{ value }">
        <ElfBadge :variant="value === 'Active' ? 'success' : 'warning'">
          {{ value }}
        </ElfBadge>
      </template>
    </ElfDataTable>
    <p class="text-sm text-muted-foreground">
      Selected ids: {{ Object.keys(selection).filter(id => selection[id]).join(', ') || 'none' }}
    </p>
  </div>
</template>
