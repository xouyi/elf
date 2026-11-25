<script setup lang="ts">
import meta from '~/generated/component-meta.json'

interface Row { name: string, type: string, default: string | null, required?: boolean, description: string, deprecated?: boolean }
interface Part { name: string, file: string, props: Row[], emits: { name: string, type: string, description: string }[], slots: { name: string, type: string, description: string }[] }

const props = defineProps<{ component: string }>()
const config = useRuntimeConfig()
const data = (meta as unknown as Record<string, { parts: Part[] }>)[props.component]
if (!data) throw new Error(`ComponentApi: unknown component "${props.component}"`)
const slug = (s: string) => s.toLowerCase()
const typeText = (t: string) => t.replace(/\s+/g, ' ')
</script>

<template>
  <div class="api-table">
    <section v-for="part in data.parts" :key="part.name" class="mb-10">
      <h3 :id="slug(part.name)" class="api-heading mt-8 mb-1 text-lg font-semibold tracking-tight">
        <a :href="`#${slug(part.name)}`" class="text-inherit no-underline">{{ part.name }}</a>
      </h3>
      <p class="mb-3 text-xs text-muted-foreground">
        <a class="underline underline-offset-4 hover:text-foreground" :href="`${config.public.repo}/blob/main/${part.file}`" target="_blank" rel="noopener">{{ part.file }}</a>
      </p>

      <div v-if="part.props.length" class="table-wrap border">
        <table>
          <caption class="sr-only">
            {{ part.name }} props
          </caption>
          <thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Default</th><th scope="col">Description</th></tr></thead>
          <tbody>
            <tr v-for="p in part.props" :key="p.name">
              <td class="font-mono text-[0.8125rem] whitespace-nowrap">
                {{ p.name }}<span v-if="p.required" class="text-destructive" title="Required"> *</span>
              </td>
              <td class="max-w-72 font-mono text-xs break-words text-muted-foreground">
                {{ typeText(p.type) }}
              </td>
              <td class="font-mono text-xs whitespace-nowrap">
                {{ p.default ?? '-' }}
              </td>
              <td class="min-w-56 text-muted-foreground" v-html="inlineMarkdown(p.description) || '-'" />
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-sm text-muted-foreground">
        No props. Attributes fall through to the root element.
      </p>

      <div v-if="part.emits.length" class="table-wrap mt-4 border">
        <table>
          <caption class="sr-only">
            {{ part.name }} events
          </caption>
          <thead><tr><th scope="col">Event</th><th scope="col">Payload</th><th scope="col">Description</th></tr></thead>
          <tbody>
            <tr v-for="e in part.emits" :key="e.name">
              <td class="font-mono text-[0.8125rem] whitespace-nowrap">
                {{ e.name }}
              </td>
              <td class="max-w-72 font-mono text-xs break-words text-muted-foreground">
                {{ typeText(e.type) }}
              </td>
              <td class="text-muted-foreground" v-html="inlineMarkdown(e.description) || '-'" />
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="part.slots.length" class="table-wrap mt-4 border">
        <table>
          <caption class="sr-only">
            {{ part.name }} slots
          </caption>
          <thead><tr><th scope="col">Slot</th><th scope="col">Scope</th><th scope="col">Description</th></tr></thead>
          <tbody>
            <tr v-for="s in part.slots" :key="s.name">
              <td class="font-mono text-[0.8125rem] whitespace-nowrap">
                {{ s.name }}
              </td>
              <td class="max-w-72 font-mono text-xs break-words text-muted-foreground">
                {{ typeText(s.type) }}
              </td>
              <td class="text-muted-foreground" v-html="inlineMarkdown(s.description) || '-'" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
