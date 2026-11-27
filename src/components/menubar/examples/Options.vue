<script setup lang="ts">
import { ref } from 'vue'
import {
  ElfMenubar,
  ElfMenubarCheckboxItem,
  ElfMenubarContent,
  ElfMenubarLabel,
  ElfMenubarMenu,
  ElfMenubarRadioGroup,
  ElfMenubarRadioItem,
  ElfMenubarSeparator,
  ElfMenubarTrigger,
} from '@xouyi/elfui'

const showPreview = ref(true)
const showOutline = ref(false)
const layout = ref('split')
</script>

<template>
  <div class="grid gap-3">
    <ElfMenubar>
      <ElfMenubarMenu>
        <ElfMenubarTrigger>View</ElfMenubarTrigger>
        <ElfMenubarContent>
          <ElfMenubarLabel>Panels</ElfMenubarLabel>
          <ElfMenubarCheckboxItem v-model="showPreview">
            Preview
          </ElfMenubarCheckboxItem>
          <ElfMenubarCheckboxItem v-model="showOutline">
            Outline
          </ElfMenubarCheckboxItem>
          <ElfMenubarSeparator />
          <ElfMenubarLabel>Layout</ElfMenubarLabel>
          <ElfMenubarRadioGroup v-model="layout">
            <ElfMenubarRadioItem value="editor">
              Editor only
            </ElfMenubarRadioItem>
            <ElfMenubarRadioItem value="split">
              Split
            </ElfMenubarRadioItem>
          </ElfMenubarRadioGroup>
        </ElfMenubarContent>
      </ElfMenubarMenu>
    </ElfMenubar>
    <p class="text-sm text-muted-foreground">
      Preview {{ showPreview ? 'on' : 'off' }}, outline {{ showOutline ? 'on' : 'off' }}, layout {{ layout }}.
    </p>
  </div>
</template>
