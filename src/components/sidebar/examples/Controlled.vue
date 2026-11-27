<script setup lang="ts">
import { Inbox, LayoutDashboard } from '@lucide/vue'
import { ElfButton, ElfSidebar, ElfSidebarContent, ElfSidebarGroup, ElfSidebarGroupContent, ElfSidebarInset, ElfSidebarMenu, ElfSidebarMenuButton, ElfSidebarMenuItem, ElfSidebarProvider, ElfSidebarTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2 text-sm">
      <ElfButton variant="outline" size="sm" @click="open = !open">
        {{ open ? 'Collapse' : 'Expand' }} from outside
      </ElfButton>
      <span class="text-muted-foreground">open = {{ open }} (remembered in localStorage)</span>
    </div>
    <ElfSidebarProvider v-model:open="open" storage-key="elfui-sidebar-example" class="h-64 min-h-0 overflow-hidden rounded-lg border">
      <ElfSidebar collapsible="icon" label="Main navigation">
        <ElfSidebarContent>
          <ElfSidebarGroup>
            <ElfSidebarGroupContent>
              <ElfSidebarMenu>
                <ElfSidebarMenuItem>
                  <ElfSidebarMenuButton is-active tooltip="Dashboard" as-child>
                    <a href="#" @click.prevent>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </a>
                  </ElfSidebarMenuButton>
                </ElfSidebarMenuItem>
                <ElfSidebarMenuItem>
                  <ElfSidebarMenuButton tooltip="Inbox" as-child>
                    <a href="#" @click.prevent>
                      <Inbox />
                      <span>Inbox</span>
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
          <span class="text-sm text-muted-foreground">Ctrl+B toggles it too.</span>
        </header>
      </ElfSidebarInset>
    </ElfSidebarProvider>
  </div>
</template>
