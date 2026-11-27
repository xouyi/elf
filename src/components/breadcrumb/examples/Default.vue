<script setup lang="ts">
import { ElfBreadcrumb, ElfBreadcrumbItem, ElfBreadcrumbLink, ElfBreadcrumbList, ElfBreadcrumbPage, ElfBreadcrumbSeparator } from '@xouyi/elfui'
</script>

<template>
  <ElfBreadcrumb>
    <ElfBreadcrumbList>
      <ElfBreadcrumbItem>
        <ElfBreadcrumbLink href="#home">
          Home
        </ElfBreadcrumbLink>
      </ElfBreadcrumbItem>
      <ElfBreadcrumbSeparator />
      <ElfBreadcrumbItem>
        <ElfBreadcrumbLink href="#components">
          Components
        </ElfBreadcrumbLink>
      </ElfBreadcrumbItem>
      <ElfBreadcrumbSeparator />
      <ElfBreadcrumbItem>
        <ElfBreadcrumbPage>Breadcrumb</ElfBreadcrumbPage>
      </ElfBreadcrumbItem>
    </ElfBreadcrumbList>
  </ElfBreadcrumb>
</template>
