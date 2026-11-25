<script setup lang="ts">
import { ElfVisuallyHidden } from '@xouyi/elfui'

const rows = [
  { name: 'Ayşe Demir', role: 'Captain', status: 'Active' },
  { name: 'Mert Kaya', role: 'Programming lead', status: 'Active' },
  { name: 'Elif Yıldız', role: 'Mentor', status: 'On leave' },
]
</script>

<template>
  <table class="w-full max-w-md border-collapse text-left text-sm">
    <ElfVisuallyHidden as="caption">
      Team roster with role and status
    </ElfVisuallyHidden>
    <thead>
      <tr class="border-b border-border text-muted-foreground">
        <th scope="col" class="py-2 pr-4 font-medium">
          Name
        </th>
        <th scope="col" class="py-2 pr-4 font-medium">
          Role
        </th>
        <th scope="col" class="py-2 font-medium">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name" class="border-b border-border">
        <td class="py-2 pr-4">
          {{ row.name }}
        </td>
        <td class="py-2 pr-4">
          {{ row.role }}
        </td>
        <td class="py-2">
          {{ row.status }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
