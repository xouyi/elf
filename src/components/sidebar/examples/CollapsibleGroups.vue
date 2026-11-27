<script setup lang="ts">
import { ChevronRight, FolderKanban, LayoutDashboard } from '@lucide/vue'
import { ElfCollapsible, ElfCollapsibleContent, ElfCollapsibleTrigger, ElfSidebar, ElfSidebarContent, ElfSidebarGroup, ElfSidebarGroupContent, ElfSidebarGroupLabel, ElfSidebarInset, ElfSidebarMenu, ElfSidebarMenuButton, ElfSidebarMenuItem, ElfSidebarMenuSub, ElfSidebarMenuSubButton, ElfSidebarMenuSubItem, ElfSidebarProvider, ElfSidebarTrigger } from '@xouyi/elfui'

const projects = ['Swerve drive', 'Vision', 'Outreach']
</script>

<template>
  <ElfSidebarProvider class="h-80 min-h-0 overflow-hidden rounded-lg border">
    <ElfSidebar collapsible="icon" label="Main navigation">
      <ElfSidebarContent>
        <ElfSidebarGroup>
          <ElfSidebarGroupContent>
            <ElfSidebarMenu>
              <ElfSidebarMenuItem>
                <ElfSidebarMenuButton tooltip="Dashboard" as-child>
                  <a href="#" @click.prevent>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </ElfSidebarMenuButton>
              </ElfSidebarMenuItem>
            </ElfSidebarMenu>
          </ElfSidebarGroupContent>
        </ElfSidebarGroup>
        <ElfCollapsible default-open as-child>
          <ElfSidebarGroup>
            <ElfSidebarGroupLabel as-child>
              <ElfCollapsibleTrigger class="group/label w-full justify-between hover:bg-accent hover:text-accent-foreground">
                Projects
                <ChevronRight class="transition-transform group-data-[state=open]/label:rotate-90 motion-reduce:transition-none" />
              </ElfCollapsibleTrigger>
            </ElfSidebarGroupLabel>
            <ElfCollapsibleContent>
              <ElfSidebarGroupContent>
                <ElfSidebarMenu>
                  <ElfCollapsible as-child class="group/collapsible">
                    <ElfSidebarMenuItem>
                      <ElfCollapsibleTrigger as-child>
                        <ElfSidebarMenuButton tooltip="Projects">
                          <FolderKanban />
                          <span>All projects</span>
                          <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 motion-reduce:transition-none" />
                        </ElfSidebarMenuButton>
                      </ElfCollapsibleTrigger>
                      <ElfCollapsibleContent>
                        <ElfSidebarMenuSub>
                          <ElfSidebarMenuSubItem v-for="project in projects" :key="project">
                            <ElfSidebarMenuSubButton :is-active="project === 'Vision'" as="a" href="#" @click.prevent>
                              <span>{{ project }}</span>
                            </ElfSidebarMenuSubButton>
                          </ElfSidebarMenuSubItem>
                        </ElfSidebarMenuSub>
                      </ElfCollapsibleContent>
                    </ElfSidebarMenuItem>
                  </ElfCollapsible>
                </ElfSidebarMenu>
              </ElfSidebarGroupContent>
            </ElfCollapsibleContent>
          </ElfSidebarGroup>
        </ElfCollapsible>
      </ElfSidebarContent>
    </ElfSidebar>
    <ElfSidebarInset class="overflow-auto">
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <ElfSidebarTrigger />
        <span class="text-sm text-muted-foreground">Collapsible group and sub menu</span>
      </header>
    </ElfSidebarInset>
  </ElfSidebarProvider>
</template>
