<script setup lang="ts">
import { Bot, Inbox, LayoutDashboard, LifeBuoy, Settings, Users } from '@lucide/vue'
import { ElfSidebar, ElfSidebarContent, ElfSidebarFooter, ElfSidebarGroup, ElfSidebarGroupContent, ElfSidebarGroupLabel, ElfSidebarHeader, ElfSidebarInset, ElfSidebarMenu, ElfSidebarMenuBadge, ElfSidebarMenuButton, ElfSidebarMenuItem, ElfSidebarProvider, ElfSidebarRail, ElfSidebarSeparator, ElfSidebarTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const active = ref('Dashboard')
const platform = [
  { title: 'Dashboard', icon: LayoutDashboard },
  { title: 'Inbox', icon: Inbox, badge: '12' },
  { title: 'Team', icon: Users },
  { title: 'Scouting bot', icon: Bot },
]
</script>

<template>
  <ElfSidebarProvider class="h-[26rem] min-h-0 overflow-hidden rounded-lg border">
    <ElfSidebar collapsible="icon" label="Main navigation">
      <ElfSidebarHeader>
        <ElfSidebarMenu>
          <ElfSidebarMenuItem>
            <ElfSidebarMenuButton size="lg" tooltip="Novatron" as-child>
              <a href="#" @click.prevent>
                <span class="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">N</span>
                <span class="font-semibold">Novatron</span>
              </a>
            </ElfSidebarMenuButton>
          </ElfSidebarMenuItem>
        </ElfSidebarMenu>
      </ElfSidebarHeader>
      <ElfSidebarSeparator />
      <ElfSidebarContent>
        <ElfSidebarGroup>
          <ElfSidebarGroupLabel>Platform</ElfSidebarGroupLabel>
          <ElfSidebarGroupContent>
            <ElfSidebarMenu>
              <ElfSidebarMenuItem v-for="item in platform" :key="item.title">
                <ElfSidebarMenuButton :is-active="active === item.title" :tooltip="item.title" as-child>
                  <a href="#" @click.prevent="active = item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </ElfSidebarMenuButton>
                <ElfSidebarMenuBadge v-if="item.badge">
                  {{ item.badge }}
                </ElfSidebarMenuBadge>
              </ElfSidebarMenuItem>
            </ElfSidebarMenu>
          </ElfSidebarGroupContent>
        </ElfSidebarGroup>
      </ElfSidebarContent>
      <ElfSidebarFooter>
        <ElfSidebarMenu>
          <ElfSidebarMenuItem>
            <ElfSidebarMenuButton tooltip="Support" as-child>
              <a href="#" @click.prevent>
                <LifeBuoy />
                <span>Support</span>
              </a>
            </ElfSidebarMenuButton>
          </ElfSidebarMenuItem>
          <ElfSidebarMenuItem>
            <ElfSidebarMenuButton tooltip="Settings" as-child>
              <a href="#" @click.prevent>
                <Settings />
                <span>Settings</span>
              </a>
            </ElfSidebarMenuButton>
          </ElfSidebarMenuItem>
        </ElfSidebarMenu>
      </ElfSidebarFooter>
      <template #rail>
        <ElfSidebarRail />
      </template>
    </ElfSidebar>
    <ElfSidebarInset class="overflow-auto">
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <ElfSidebarTrigger />
        <h2 class="text-sm font-medium">
          {{ active }}
        </h2>
      </header>
      <div class="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
        <p>On a desktop the sidebar collapses to icons: press the button, drag the rail or use Ctrl+B (Cmd+B on a Mac).</p>
        <p>Below 768px it becomes an off-canvas sheet that opens from the same button.</p>
      </div>
    </ElfSidebarInset>
  </ElfSidebarProvider>
</template>
