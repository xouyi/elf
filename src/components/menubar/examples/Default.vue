<script setup lang="ts">
import {
  ElfKbd,
  ElfMenubar,
  ElfMenubarContent,
  ElfMenubarItem,
  ElfMenubarMenu,
  ElfMenubarSeparator,
  ElfMenubarShortcut,
  ElfMenubarSub,
  ElfMenubarSubContent,
  ElfMenubarSubTrigger,
  ElfMenubarTrigger,
} from '@xouyi/elfui'
</script>

<template>
  <ElfMenubar>
    <ElfMenubarMenu>
      <ElfMenubarTrigger>File</ElfMenubarTrigger>
      <ElfMenubarContent>
        <ElfMenubarItem>
          New lesson
          <ElfMenubarShortcut>
            <ElfKbd>Ctrl</ElfKbd><ElfKbd>N</ElfKbd>
          </ElfMenubarShortcut>
        </ElfMenubarItem>
        <ElfMenubarItem>
          Save
          <ElfMenubarShortcut>
            <ElfKbd>Ctrl</ElfKbd><ElfKbd>S</ElfKbd>
          </ElfMenubarShortcut>
        </ElfMenubarItem>
        <ElfMenubarSub>
          <ElfMenubarSubTrigger>Export</ElfMenubarSubTrigger>
          <ElfMenubarSubContent>
            <ElfMenubarItem>Markdown</ElfMenubarItem>
            <ElfMenubarItem>PDF</ElfMenubarItem>
          </ElfMenubarSubContent>
        </ElfMenubarSub>
        <ElfMenubarSeparator />
        <ElfMenubarItem disabled>
          Print
        </ElfMenubarItem>
      </ElfMenubarContent>
    </ElfMenubarMenu>
    <ElfMenubarMenu>
      <ElfMenubarTrigger>Edit</ElfMenubarTrigger>
      <ElfMenubarContent>
        <ElfMenubarItem>Undo</ElfMenubarItem>
        <ElfMenubarItem>Redo</ElfMenubarItem>
        <ElfMenubarSeparator />
        <ElfMenubarItem variant="destructive">
          Clear all
        </ElfMenubarItem>
      </ElfMenubarContent>
    </ElfMenubarMenu>
    <ElfMenubarMenu>
      <ElfMenubarTrigger>Help</ElfMenubarTrigger>
      <ElfMenubarContent>
        <ElfMenubarItem>Documentation</ElfMenubarItem>
        <ElfMenubarItem>About</ElfMenubarItem>
      </ElfMenubarContent>
    </ElfMenubarMenu>
  </ElfMenubar>
</template>
