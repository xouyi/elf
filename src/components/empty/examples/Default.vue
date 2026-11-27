<script setup lang="ts">
import { FolderOpen } from '@lucide/vue'
import { ElfButton, ElfEmpty, ElfEmptyContent, ElfEmptyDescription, ElfEmptyHeader, ElfEmptyMedia, ElfEmptyTitle } from '@xouyi/elfui'
</script>

<template>
  <ElfEmpty class="w-full max-w-lg">
    <ElfEmptyHeader>
      <ElfEmptyMedia variant="icon">
        <FolderOpen />
      </ElfEmptyMedia>
      <ElfEmptyTitle>No projects yet</ElfEmptyTitle>
      <ElfEmptyDescription>
        You have not created any projects. Create one to start tracking tasks and parts.
      </ElfEmptyDescription>
    </ElfEmptyHeader>
    <ElfEmptyContent>
      <div class="flex flex-wrap justify-center gap-2">
        <ElfButton>Create project</ElfButton>
        <ElfButton variant="outline">
          Import
        </ElfButton>
      </div>
    </ElfEmptyContent>
  </ElfEmpty>
</template>
