<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <footer class="border-t">
    <div class="mx-auto flex w-full max-w-[90rem] flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>
        ElfUI v{{ config.public.version }}. MIT licensed. Built with
        <a class="underline underline-offset-4 hover:text-foreground" href="https://reka-ui.com" target="_blank" rel="noopener">Reka UI</a>
        and Tailwind CSS. This site is built with ElfUI.
      </p>
      <p class="flex gap-4">
        <a class="underline underline-offset-4 hover:text-foreground" :href="config.public.repo" target="_blank" rel="noopener">GitHub</a>
        <NuxtLink class="underline underline-offset-4 hover:text-foreground" to="/docs/resources/for-ai">llms.txt</NuxtLink>
        <NuxtLink class="underline underline-offset-4 hover:text-foreground" to="/docs/resources/changelog">Changelog</NuxtLink>
      </p>
    </div>
  </footer>
</template>
