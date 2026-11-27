<script setup lang="ts">
import {
  ElfContextMenu,
  ElfContextMenuCheckboxItem,
  ElfContextMenuContent,
  ElfContextMenuItem,
  ElfContextMenuLabel,
  ElfContextMenuRadioGroup,
  ElfContextMenuRadioItem,
  ElfContextMenuSeparator,
  ElfContextMenuSub,
  ElfContextMenuSubContent,
  ElfContextMenuSubTrigger,
  ElfContextMenuTrigger,
} from '@xouyi/elfui'
import { ref } from 'vue'

const showGrid = ref(true)
const density = ref('comfortable')
</script>

<template>
  <div class="grid gap-3">
    <ElfContextMenu>
      <ElfContextMenuTrigger as-child>
        <div
          role="group"
          aria-label="Canvas. Press Shift+F10 or the context menu key for view options."
          tabindex="0"
          class="flex h-32 w-full max-w-sm items-center justify-center rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          View options (right-click here)
        </div>
      </ElfContextMenuTrigger>
      <ElfContextMenuContent class="w-56">
        <ElfContextMenuCheckboxItem v-model="showGrid">
          Show grid
        </ElfContextMenuCheckboxItem>
        <ElfContextMenuSeparator />
        <ElfContextMenuLabel>Density</ElfContextMenuLabel>
        <ElfContextMenuRadioGroup v-model="density">
          <ElfContextMenuRadioItem value="comfortable">
            Comfortable
          </ElfContextMenuRadioItem>
          <ElfContextMenuRadioItem value="compact">
            Compact
          </ElfContextMenuRadioItem>
        </ElfContextMenuRadioGroup>
        <ElfContextMenuSeparator />
        <ElfContextMenuSub>
          <ElfContextMenuSubTrigger>Export as</ElfContextMenuSubTrigger>
          <ElfContextMenuSubContent>
            <ElfContextMenuItem>PNG</ElfContextMenuItem>
            <ElfContextMenuItem>SVG</ElfContextMenuItem>
          </ElfContextMenuSubContent>
        </ElfContextMenuSub>
      </ElfContextMenuContent>
    </ElfContextMenu>
    <p class="text-sm text-muted-foreground">
      grid = {{ showGrid }}, density = {{ density }}
    </p>
  </div>
</template>
