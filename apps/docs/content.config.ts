import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        /** Repository-relative path used by "Edit this page"; defaults to the file inside apps/docs/content. */
        editPath: z.string().optional(),
        /** Component directory in src/components that the page documents. */
        component: z.string().optional(),
        /** Reka UI primitive and WAI-ARIA pattern links shown at the top of component pages. */
        links: z.array(z.object({ label: z.string(), to: z.string() })).optional(),
      }),
    }),
  },
})
