<script setup lang="ts">
const props = withDefaults(defineProps<{ extra?: string, dev?: boolean }>(), { extra: '' })
const config = useRuntimeConfig()
const code = computed(() => `bun add${props.dev ? ' -d' : ''} github:xouyi/elfUI#v${config.public.version}${props.extra ? ` ${props.extra}` : ''}`)
</script>

<template>
  <CodeSnippet :code="code" lang="bash" />
</template>
