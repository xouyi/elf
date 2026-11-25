<script setup lang="ts">
import { ElfTabs, ElfTabsContent, ElfTabsList, ElfTabsTrigger } from '@elf/ui'
</script>

<template>
  <ElfTabs default-value="overview" class="w-full max-w-md">
    <ElfTabsList aria-label="Sections">
      <ElfTabsTrigger value="overview">
        Overview
      </ElfTabsTrigger>
      <ElfTabsTrigger value="members">
        Members
      </ElfTabsTrigger>
      <ElfTabsTrigger value="settings">
        Settings
      </ElfTabsTrigger>
    </ElfTabsList>
    <ElfTabsContent value="overview" class="text-sm">
      Team overview and recent activity.
    </ElfTabsContent>
    <ElfTabsContent value="members" class="text-sm">
      Member list and roles.
    </ElfTabsContent>
    <ElfTabsContent value="settings" class="text-sm">
      Workspace settings.
    </ElfTabsContent>
  </ElfTabs>
</template>
