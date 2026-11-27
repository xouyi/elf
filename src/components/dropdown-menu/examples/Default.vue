<script setup lang="ts">
import { CreditCard, LifeBuoy, LogOut, Settings, User } from '@lucide/vue'
import {
  ElfButton,
  ElfDropdownMenu,
  ElfDropdownMenuContent,
  ElfDropdownMenuGroup,
  ElfDropdownMenuItem,
  ElfDropdownMenuLabel,
  ElfDropdownMenuSeparator,
  ElfDropdownMenuShortcut,
  ElfDropdownMenuTrigger,
  ElfKbd,
} from '@xouyi/elfui'
</script>

<template>
  <ElfDropdownMenu>
    <ElfDropdownMenuTrigger as-child>
      <ElfButton variant="outline">
        My account
      </ElfButton>
    </ElfDropdownMenuTrigger>
    <ElfDropdownMenuContent class="w-56" align="start">
      <ElfDropdownMenuLabel>Signed in as ayse</ElfDropdownMenuLabel>
      <ElfDropdownMenuGroup>
        <ElfDropdownMenuItem>
          <User /> Profile
          <ElfDropdownMenuShortcut>
            <ElfKbd>Ctrl</ElfKbd><ElfKbd>P</ElfKbd>
          </ElfDropdownMenuShortcut>
        </ElfDropdownMenuItem>
        <ElfDropdownMenuItem>
          <CreditCard /> Billing
        </ElfDropdownMenuItem>
        <ElfDropdownMenuItem>
          <Settings /> Settings
          <ElfDropdownMenuShortcut>
            <ElfKbd>Ctrl</ElfKbd><ElfKbd>,</ElfKbd>
          </ElfDropdownMenuShortcut>
        </ElfDropdownMenuItem>
      </ElfDropdownMenuGroup>
      <ElfDropdownMenuSeparator />
      <ElfDropdownMenuItem>
        <LifeBuoy /> Support
      </ElfDropdownMenuItem>
      <ElfDropdownMenuItem disabled>
        API (soon)
      </ElfDropdownMenuItem>
      <ElfDropdownMenuSeparator />
      <ElfDropdownMenuItem>
        <LogOut /> Sign out
      </ElfDropdownMenuItem>
    </ElfDropdownMenuContent>
  </ElfDropdownMenu>
</template>
