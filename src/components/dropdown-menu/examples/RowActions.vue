<script setup lang="ts">
import { Copy, Ellipsis, Pencil, Trash2 } from '@lucide/vue'
import {
  ElfButton,
  ElfDropdownMenu,
  ElfDropdownMenuContent,
  ElfDropdownMenuItem,
  ElfDropdownMenuSeparator,
  ElfDropdownMenuTrigger,
} from '@xouyi/elfui'
import { ref } from 'vue'

const last = ref('none')
</script>

<template>
  <div class="flex items-center gap-3">
    <p class="text-sm">
      Battery 12V
    </p>
    <ElfDropdownMenu>
      <ElfDropdownMenuTrigger as-child>
        <ElfButton variant="ghost" size="icon" aria-label="Actions for Battery 12V">
          <Ellipsis />
        </ElfButton>
      </ElfDropdownMenuTrigger>
      <ElfDropdownMenuContent align="start">
        <ElfDropdownMenuItem @select="last = 'edit'">
          <Pencil /> Edit
        </ElfDropdownMenuItem>
        <ElfDropdownMenuItem @select="last = 'duplicate'">
          <Copy /> Duplicate
        </ElfDropdownMenuItem>
        <ElfDropdownMenuSeparator />
        <ElfDropdownMenuItem variant="destructive" @select="last = 'delete'">
          <Trash2 /> Delete
        </ElfDropdownMenuItem>
      </ElfDropdownMenuContent>
    </ElfDropdownMenu>
    <p class="text-sm text-muted-foreground">
      last = {{ last }}
    </p>
  </div>
</template>
