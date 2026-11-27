<script setup lang="ts">
import {
  ElfBreadcrumb,
  ElfBreadcrumbEllipsis,
  ElfBreadcrumbItem,
  ElfBreadcrumbLink,
  ElfBreadcrumbList,
  ElfBreadcrumbPage,
  ElfBreadcrumbSeparator,
  ElfDropdownMenu,
  ElfDropdownMenuContent,
  ElfDropdownMenuItem,
  ElfDropdownMenuTrigger,
} from '@xouyi/elfui'
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
        <ElfDropdownMenu>
          <ElfDropdownMenuTrigger class="flex items-center gap-1 rounded-sm outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50" aria-label="Show hidden levels">
            <ElfBreadcrumbEllipsis label="Hidden levels" />
          </ElfDropdownMenuTrigger>
          <ElfDropdownMenuContent align="start">
            <ElfDropdownMenuItem>Documentation</ElfDropdownMenuItem>
            <ElfDropdownMenuItem>Themes</ElfDropdownMenuItem>
            <ElfDropdownMenuItem>GitHub</ElfDropdownMenuItem>
          </ElfDropdownMenuContent>
        </ElfDropdownMenu>
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
