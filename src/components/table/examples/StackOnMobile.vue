<script setup lang="ts">
import { ElfBadge, ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'

const members = [
  { name: 'Ayşe Demir', role: 'Software', status: 'Active' },
  { name: 'Mert Kaya', role: 'Mechanical', status: 'Active' },
  { name: 'Elif Yıldız', role: 'Design', status: 'Away' },
]
</script>

<template>
  <ElfTable caption="Team members" stack-on-mobile>
    <ElfTableHeader>
      <ElfTableRow>
        <ElfTableHead>Name</ElfTableHead>
        <ElfTableHead>Role</ElfTableHead>
        <ElfTableHead>Status</ElfTableHead>
      </ElfTableRow>
    </ElfTableHeader>
    <ElfTableBody>
      <ElfTableRow v-for="m in members" :key="m.name">
        <ElfTableCell label="Name" class="font-medium">
          {{ m.name }}
        </ElfTableCell>
        <ElfTableCell label="Role">
          {{ m.role }}
        </ElfTableCell>
        <ElfTableCell label="Status">
          <ElfBadge :variant="m.status === 'Active' ? 'success' : 'warning'">
            {{ m.status }}
          </ElfBadge>
        </ElfTableCell>
      </ElfTableRow>
    </ElfTableBody>
  </ElfTable>
</template>
