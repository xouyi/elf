<script setup lang="ts">
import { Slash } from '@lucide/vue'
import { ElfBreadcrumb, ElfBreadcrumbItem, ElfBreadcrumbLink, ElfBreadcrumbList, ElfBreadcrumbPage, ElfBreadcrumbSeparator } from '@xouyi/elfui'
</script>

<template>
  <ElfBreadcrumb aria-label="Location">
    <ElfBreadcrumbList>
      <ElfBreadcrumbItem>
        <ElfBreadcrumbLink href="#warehouse">
          Warehouse
        </ElfBreadcrumbLink>
      </ElfBreadcrumbItem>
      <ElfBreadcrumbSeparator>
        <Slash />
      </ElfBreadcrumbSeparator>
      <ElfBreadcrumbItem>
        <ElfBreadcrumbLink href="#shelf-a">
          Shelf A
        </ElfBreadcrumbLink>
      </ElfBreadcrumbItem>
      <ElfBreadcrumbSeparator>
        <Slash />
      </ElfBreadcrumbSeparator>
      <ElfBreadcrumbItem>
        <ElfBreadcrumbPage>Bin 12</ElfBreadcrumbPage>
      </ElfBreadcrumbItem>
    </ElfBreadcrumbList>
  </ElfBreadcrumb>
</template>
