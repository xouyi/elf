<script setup lang="ts">
import {
  ElfNavigationMenu,
  ElfNavigationMenuContent,
  ElfNavigationMenuIndicator,
  ElfNavigationMenuItem,
  ElfNavigationMenuLink,
  ElfNavigationMenuList,
  ElfNavigationMenuTrigger,
} from '@xouyi/elfui'
</script>

<template>
  <ElfNavigationMenu>
    <ElfNavigationMenuList>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuTrigger>Learn</ElfNavigationMenuTrigger>
        <ElfNavigationMenuContent>
          <ul class="grid w-64 gap-1">
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Courses</span>
                <span class="text-muted-foreground">Training for every subteam.</span>
              </ElfNavigationMenuLink>
            </li>
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Guides</span>
                <span class="text-muted-foreground">Short how-to pages.</span>
              </ElfNavigationMenuLink>
            </li>
          </ul>
        </ElfNavigationMenuContent>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuTrigger>Build</ElfNavigationMenuTrigger>
        <ElfNavigationMenuContent>
          <ul class="grid w-48 gap-1">
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Robot</span>
              </ElfNavigationMenuLink>
            </li>
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Scouting app</span>
              </ElfNavigationMenuLink>
            </li>
          </ul>
        </ElfNavigationMenuContent>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuIndicator />
    </ElfNavigationMenuList>
  </ElfNavigationMenu>
</template>
