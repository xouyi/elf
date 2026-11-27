<script setup lang="ts">
import { Inbox, LayoutDashboard, Settings } from '@lucide/vue'
import { ElfSidebar, ElfSidebarContent, ElfSidebarGroup, ElfSidebarGroupContent, ElfSidebarGroupLabel, ElfSidebarInset, ElfSidebarMenu, ElfSidebarMenuButton, ElfSidebarMenuItem, ElfSidebarProvider, ElfSidebarRail, ElfSidebarTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfSidebarProvider class="h-72 min-h-0 overflow-hidden rounded-lg border" :default-open="false">
    <ElfSidebar label="Main navigation">
      <ElfSidebarContent>
        <ElfSidebarGroup>
          <ElfSidebarGroupLabel>Workspace</ElfSidebarGroupLabel>
          <ElfSidebarGroupContent>
            <ElfSidebarMenu>
              <ElfSidebarMenuItem>
                <ElfSidebarMenuButton is-active as-child>
                  <a href="#" @click.prevent>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </ElfSidebarMenuButton>
              </ElfSidebarMenuItem>
              <ElfSidebarMenuItem>
                <ElfSidebarMenuButton as-child>
                  <a href="#" @click.prevent>
                    <Inbox />
                    <span>Inbox</span>
                  </a>
                </ElfSidebarMenuButton>
              </ElfSidebarMenuItem>
              <ElfSidebarMenuItem>
                <ElfSidebarMenuButton as-child>
                  <a href="#" @click.prevent>
                    <Settings />
                    <span>Settings</span>
                  </a>
                </ElfSidebarMenuButton>
              </ElfSidebarMenuItem>
            </ElfSidebarMenu>
          </ElfSidebarGroupContent>
        </ElfSidebarGroup>
      </ElfSidebarContent>
      <template #rail>
        <ElfSidebarRail />
      </template>
    </ElfSidebar>
    <ElfSidebarInset class="overflow-auto">
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <ElfSidebarTrigger />
        <h2 class="text-sm font-medium">
          Starts closed
        </h2>
      </header>
      <p class="p-4 text-sm text-muted-foreground">
        With the default collapsible="offcanvas" the sidebar slides out of view and its links leave the tab order.
      </p>
    </ElfSidebarInset>
  </ElfSidebarProvider>
</template>
