<script setup lang="ts">
import { ElfTabs, ElfTabsContent, ElfTabsList, ElfTabsTrigger } from 'elfui'
import { ref } from 'vue'

const tab = ref('code')
</script>

<template>
  <ElfTabs v-model="tab" activation-mode="manual" class="w-full max-w-md">
    <ElfTabsList aria-label="Editor">
      <ElfTabsTrigger value="code">
        Code
      </ElfTabsTrigger>
      <ElfTabsTrigger value="preview">
        Preview
      </ElfTabsTrigger>
      <ElfTabsTrigger value="history" disabled>
        History
      </ElfTabsTrigger>
    </ElfTabsList>
    <ElfTabsContent value="code" class="text-sm">
      Selected: {{ tab }}. With manual activation, arrows move focus and Enter or Space selects.
    </ElfTabsContent>
    <ElfTabsContent value="preview" class="text-sm">
      Selected: {{ tab }}.
    </ElfTabsContent>
  </ElfTabs>
</template>
