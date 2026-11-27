<script setup lang="ts">
import {
  ElfNavigationMenu,
  ElfNavigationMenuContent,
  ElfNavigationMenuItem,
  ElfNavigationMenuLink,
  ElfNavigationMenuList,
  ElfNavigationMenuTrigger,
} from '@xouyi/elfui'
</script>

<template>
  <ElfNavigationMenu :viewport="false">
    <ElfNavigationMenuList>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuTrigger>Teams</ElfNavigationMenuTrigger>
        <ElfNavigationMenuContent>
          <ul class="grid w-56 gap-1">
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Mechanics</span>
              </ElfNavigationMenuLink>
            </li>
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Software</span>
              </ElfNavigationMenuLink>
            </li>
            <li>
              <ElfNavigationMenuLink href="#">
                <span class="font-medium">Outreach</span>
              </ElfNavigationMenuLink>
            </li>
          </ul>
        </ElfNavigationMenuContent>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuLink href="#" variant="trigger">
          Contact
        </ElfNavigationMenuLink>
      </ElfNavigationMenuItem>
    </ElfNavigationMenuList>
  </ElfNavigationMenu>
</template>
