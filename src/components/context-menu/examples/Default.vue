<script setup lang="ts">
import {
  ElfContextMenu,
  ElfContextMenuContent,
  ElfContextMenuItem,
  ElfContextMenuLabel,
  ElfContextMenuSeparator,
  ElfContextMenuShortcut,
  ElfContextMenuTrigger,
  ElfKbd,
} from '@xouyi/elfui'
import { ref } from 'vue'

const last = ref('none')
</script>

<template>
  <div class="grid gap-3">
    <ElfContextMenu>
      <ElfContextMenuTrigger as-child>
        <div
          role="group"
          aria-label="Item card. Press Shift+F10 or the context menu key for actions."
          tabindex="0"
          class="flex h-32 w-full max-w-sm items-center justify-center rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Right-click, long-press, or focus and press Shift+F10
        </div>
      </ElfContextMenuTrigger>
      <ElfContextMenuContent class="w-56">
        <ElfContextMenuLabel>Battery 12V</ElfContextMenuLabel>
        <ElfContextMenuItem @select="last = 'open'">
          Open
          <ElfContextMenuShortcut>
            <ElfKbd>Enter</ElfKbd>
          </ElfContextMenuShortcut>
        </ElfContextMenuItem>
        <ElfContextMenuItem @select="last = 'rename'">
          Rename
          <ElfContextMenuShortcut>
            <ElfKbd>F2</ElfKbd>
          </ElfContextMenuShortcut>
        </ElfContextMenuItem>
        <ElfContextMenuItem disabled>
          Move (soon)
        </ElfContextMenuItem>
        <ElfContextMenuSeparator />
        <ElfContextMenuItem variant="destructive" @select="last = 'delete'">
          Delete
        </ElfContextMenuItem>
      </ElfContextMenuContent>
    </ElfContextMenu>
    <p class="text-sm text-muted-foreground">
      last = {{ last }}
    </p>
  </div>
</template>
