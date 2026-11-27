<script setup lang="ts">
import {
  ElfButton,
  ElfDropdownMenu,
  ElfDropdownMenuContent,
  ElfDropdownMenuItem,
  ElfDropdownMenuSeparator,
  ElfDropdownMenuSub,
  ElfDropdownMenuSubContent,
  ElfDropdownMenuSubTrigger,
  ElfDropdownMenuTrigger,
} from '@xouyi/elfui'
</script>

<template>
  <ElfDropdownMenu>
    <ElfDropdownMenuTrigger as-child>
      <ElfButton variant="outline">
        Actions
      </ElfButton>
    </ElfDropdownMenuTrigger>
    <ElfDropdownMenuContent class="w-48" align="start">
      <ElfDropdownMenuItem>Duplicate</ElfDropdownMenuItem>
      <ElfDropdownMenuSub>
        <ElfDropdownMenuSubTrigger>Share</ElfDropdownMenuSubTrigger>
        <ElfDropdownMenuSubContent>
          <ElfDropdownMenuItem>Email link</ElfDropdownMenuItem>
          <ElfDropdownMenuItem>Message</ElfDropdownMenuItem>
          <ElfDropdownMenuSeparator />
          <ElfDropdownMenuItem>Copy link</ElfDropdownMenuItem>
        </ElfDropdownMenuSubContent>
      </ElfDropdownMenuSub>
      <ElfDropdownMenuItem>Archive</ElfDropdownMenuItem>
    </ElfDropdownMenuContent>
  </ElfDropdownMenu>
</template>
