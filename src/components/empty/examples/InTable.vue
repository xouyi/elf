<script setup lang="ts">
import { Inbox } from '@lucide/vue'
import { ElfEmpty, ElfEmptyDescription, ElfEmptyHeader, ElfEmptyMedia, ElfEmptyTitle, ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'
</script>

<template>
  <ElfTable caption="Open requests">
    <ElfTableHeader>
      <ElfTableRow>
        <ElfTableHead>Request</ElfTableHead>
        <ElfTableHead>Status</ElfTableHead>
      </ElfTableRow>
    </ElfTableHeader>
    <ElfTableBody>
      <ElfTableRow>
        <ElfTableCell :colspan="2">
          <ElfEmpty class="border-0 p-6">
            <ElfEmptyHeader>
              <ElfEmptyMedia>
                <Inbox />
              </ElfEmptyMedia>
              <ElfEmptyTitle>Nothing to review</ElfEmptyTitle>
              <ElfEmptyDescription>New requests will show up here.</ElfEmptyDescription>
            </ElfEmptyHeader>
          </ElfEmpty>
        </ElfTableCell>
      </ElfTableRow>
    </ElfTableBody>
  </ElfTable>
</template>
