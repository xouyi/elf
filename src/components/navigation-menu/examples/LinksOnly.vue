<script setup lang="ts">
import {
  ElfNavigationMenu,
  ElfNavigationMenuItem,
  ElfNavigationMenuLink,
  ElfNavigationMenuList,
} from '@xouyi/elfui'
</script>

<template>
  <ElfNavigationMenu :viewport="false" aria-label="Main">
    <ElfNavigationMenuList>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuLink href="#" variant="trigger" active>
          Home
        </ElfNavigationMenuLink>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuLink href="#" variant="trigger">
          Courses
        </ElfNavigationMenuLink>
      </ElfNavigationMenuItem>
      <ElfNavigationMenuItem>
        <ElfNavigationMenuLink href="#" variant="trigger">
          Stock
        </ElfNavigationMenuLink>
      </ElfNavigationMenuItem>
    </ElfNavigationMenuList>
  </ElfNavigationMenu>
</template>
