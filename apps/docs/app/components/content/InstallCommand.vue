<script setup lang="ts">
const props = withDefaults(defineProps<{ extra?: string, dev?: boolean }>(), { extra: '' })
const code = computed(() => `bun add${props.dev ? ' -d' : ''} @xouyi/elfui${props.extra ? ` ${props.extra}` : ''}`)
</script>

<template>
  <CodeSnippet :code="code" lang="bash" />
</template>
