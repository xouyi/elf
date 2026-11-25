<script setup lang="ts">
import { Menu } from '@lucide/vue'

const { groups } = await useDocsNav()
const open = ref(false)
const route = useRoute()
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <ElfDialog v-model:open="open">
    <ElfDialogTrigger as-child>
      <ElfButton variant="ghost" size="icon" class="lg:hidden" aria-label="Open navigation">
        <Menu />
      </ElfButton>
    </ElfDialogTrigger>
    <ElfDialogContent class="top-0 left-0 h-dvh max-h-dvh w-[min(20rem,85vw)] max-w-none translate-x-0 translate-y-0 content-start rounded-none border-y-0 border-l-0 sm:max-w-none" aria-describedby="mobile-nav-description">
      <ElfDialogHeader>
        <ElfDialogTitle><AppLogo /></ElfDialogTitle>
        <ElfDialogDescription id="mobile-nav-description" class="sr-only">
          Documentation navigation
        </ElfDialogDescription>
      </ElfDialogHeader>
      <DocsSidebar :groups="groups" @navigate="open = false" />
    </ElfDialogContent>
  </ElfDialog>
</template>
