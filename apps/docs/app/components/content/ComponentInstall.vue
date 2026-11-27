<script setup lang="ts">
import meta from '~/generated/component-meta.json'

interface Part { name: string }
interface Meta { dir: string, parts: Part[], registry: { name: string, dependencies: string[], registryDependencies: string[] } }

const props = defineProps<{ component: string }>()
const site = useSite()
const data = (meta as unknown as Record<string, Meta>)[props.component]
if (!data) throw new Error(`ComponentInstall: unknown component "${props.component}"`)

const names = data.parts.map(p => p.name).join(', ')
const importSnippet = `import { ${names} } from '${site.name}'`
const registryUrl = `${site.registry}/${data.registry.name}.json`
const registryCommand = `bunx ${site.name} add ${data.registry.name}`
const shadcnCommand = `bunx shadcn-vue@latest add ${registryUrl}`
const shortCommand = `bunx shadcn-vue@latest add @elf/${data.registry.name}`
</script>

<template>
  <div class="my-6">
    <ElfTabs default-value="package" class="gap-3">
      <ElfTabsList aria-label="Installation method">
        <ElfTabsTrigger value="package" class="px-3">
          Package
        </ElfTabsTrigger>
        <ElfTabsTrigger value="registry" class="px-3">
          Registry
        </ElfTabsTrigger>
      </ElfTabsList>
      <ElfTabsContent value="package" class="doc-content">
        <p>Installed with <code>{{ site.name }}</code> (see <NuxtLink class="text-primary underline-offset-4 hover:underline" to="/docs/getting-started/installation-nuxt">Installation</NuxtLink>). In Nuxt the module auto-imports every part, so no import is needed. Elsewhere:</p>
        <CodeSnippet :code="importSnippet" lang="ts" />
      </ElfTabsContent>
      <ElfTabsContent value="registry" class="doc-content">
        <p>Copy the source into your project with the elfui CLI. Dependencies and registry items are installed for you.</p>
        <CodeSnippet :code="registryCommand" lang="bash" />
        <p>
          The shadcn-vue CLI reads the same registry (<NuxtLink class="text-primary underline-offset-4 hover:underline" to="/docs/getting-started/registry">Registry</NuxtLink>):
        </p>
        <CodeSnippet :code="shadcnCommand" lang="bash" />
        <CodeSnippet :code="shortCommand" lang="bash" />
        <p v-if="data.registry.dependencies.length || data.registry.registryDependencies.length">
          <template v-if="data.registry.dependencies.length">
            npm dependencies: <code v-for="(d, i) in data.registry.dependencies" :key="d">{{ d }}<template v-if="i < data.registry.dependencies.length - 1">, </template></code>.
          </template>
          <template v-if="data.registry.registryDependencies.length">
            Registry dependencies: <code v-for="(d, i) in data.registry.registryDependencies" :key="d">{{ d }}<template v-if="i < data.registry.registryDependencies.length - 1">, </template></code>.
          </template>
        </p>
      </ElfTabsContent>
    </ElfTabs>
  </div>
</template>
