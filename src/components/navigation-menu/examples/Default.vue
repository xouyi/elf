<script setup lang="ts">
import {
  ElfNavigationMenu,
  ElfNavigationMenuContent,
  ElfNavigationMenuItem,
  ElfNavigationMenuLink,
  ElfNavigationMenuList,
  ElfNavigationMenuTrigger,
} from '@xouyi/elfui'

const gettingStarted = [
  { title: 'Installation', description: 'Add the package and a theme.' },
  { title: 'Theming', description: 'Tokens, themes and radius.' },
  { title: 'Accessibility', description: 'Keyboard and screen reader notes.' },
]
const components = [
  { title: 'Dialog', description: 'A modal window.' },
  { title: 'Tabs', description: 'Sections, one at a time.' },
  { title: 'Tooltip', description: 'A short hint on focus or hover.' },
  { title: 'Sheet', description: 'A panel from the screen edge.' },
]
</script>

<template>
  <ElfNavigationMenu>
    <ElfNavigationMenuList>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuTrigger>Getting started</ElfNavigationMenuTrigger>
        <ElfNavigationMenuContent>
          <ul class="grid w-64 gap-1">
            <li v-for="item in gettingStarted" :key="item.title">
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">{{ item.title }}</span>
                <span class="text-muted-foreground">{{ item.description }}</span>
              </ElfNavigationMenuLink>
            </li>
          </ul>
        </ElfNavigationMenuContent>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuTrigger>Components</ElfNavigationMenuTrigger>
        <ElfNavigationMenuContent>
          <ul class="grid w-72 gap-1 sm:w-96 sm:grid-cols-2">
            <li v-for="item in components" :key="item.title">
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">{{ item.title }}</span>
                <span class="text-muted-foreground">{{ item.description }}</span>
              </ElfNavigationMenuLink>
            </li>
          </ul>
        </ElfNavigationMenuContent>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuLink href="#" variant="trigger">
          Docs
        </ElfNavigationMenuLink>
      </ElfNavigationMenuItem>
    </ElfNavigationMenuList>
  </ElfNavigationMenu>
</template>
