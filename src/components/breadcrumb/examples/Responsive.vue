<script setup lang="ts">
import { ElfBreadcrumb, ElfBreadcrumbItem, ElfBreadcrumbLink, ElfBreadcrumbList, ElfBreadcrumbPage, ElfBreadcrumbSeparator } from '@xouyi/elfui'

const trail = ['Courses', 'Robotics basics', 'Sensors and actuators', 'Reading an encoder signal']
</script>

<template>
  <ElfBreadcrumb aria-label="Lesson location">
    <ElfBreadcrumbList>
      <template v-for="(label, i) in trail" :key="label">
        <ElfBreadcrumbItem v-if="i < trail.length - 1">
          <ElfBreadcrumbLink :href="`#level-${i}`">
            {{ label }}
          </ElfBreadcrumbLink>
        </ElfBreadcrumbItem>
        <ElfBreadcrumbItem v-else>
          <ElfBreadcrumbPage>{{ label }}</ElfBreadcrumbPage>
        </ElfBreadcrumbItem>
        <ElfBreadcrumbSeparator v-if="i < trail.length - 1" />
      </template>
    </ElfBreadcrumbList>
  </ElfBreadcrumb>
</template>
