<script setup lang="ts">
import { Inbox, LayoutDashboard, Settings } from '@lucide/vue'
import { ElfButton, ElfSidebar, ElfSidebarContent, ElfSidebarGroup, ElfSidebarGroupContent, ElfSidebarInset, ElfSidebarMenu, ElfSidebarMenuButton, ElfSidebarMenuItem, ElfSidebarProvider, ElfSidebarTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const variant = ref<'sidebar' | 'floating' | 'inset'>('floating')
const side = ref<'left' | 'right'>('left')
const items = [
  { title: 'Dashboard', icon: LayoutDashboard },
  { title: 'Inbox', icon: Inbox },
  { title: 'Settings', icon: Settings },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <ElfButton
        v-for="v in (['sidebar', 'floating', 'inset'] as const)"
        :key="v"
        size="sm"
        :variant="variant === v ? 'default' : 'outline'"
        :aria-pressed="variant === v"
        @click="variant = v"
      >
        {{ v }}
      </ElfButton>
      <ElfButton
        v-for="s in (['left', 'right'] as const)"
        :key="s"
        size="sm"
        :variant="side === s ? 'default' : 'outline'"
        :aria-pressed="side === s"
        @click="side = s"
      >
        {{ s }}
      </ElfButton>
    </div>
    <ElfSidebarProvider class="h-72 min-h-0 overflow-hidden rounded-lg border">
      <ElfSidebar :variant="variant" :side="side" collapsible="icon" label="Main navigation">
        <ElfSidebarContent>
          <ElfSidebarGroup>
            <ElfSidebarGroupContent>
              <ElfSidebarMenu>
                <ElfSidebarMenuItem v-for="item in items" :key="item.title">
                  <ElfSidebarMenuButton :is-active="item.title === 'Dashboard'" :tooltip="item.title" as-child>
                    <a href="#" @click.prevent>
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                    </a>
                  </ElfSidebarMenuButton>
                </ElfSidebarMenuItem>
              </ElfSidebarMenu>
            </ElfSidebarGroupContent>
          </ElfSidebarGroup>
        </ElfSidebarContent>
      </ElfSidebar>
      <ElfSidebarInset class="overflow-auto">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-3">
          <ElfSidebarTrigger />
          <span class="text-sm text-muted-foreground">{{ variant }}, {{ side }}</span>
        </header>
      </ElfSidebarInset>
    </ElfSidebarProvider>
  </div>
</template>
