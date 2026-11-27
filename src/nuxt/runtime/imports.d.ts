// Minimal typing for the Nuxt virtual module that the runtime plugin imports; Nuxt generates the real one in an app.
declare module '#imports' {
  export function defineNuxtPlugin(setup: (nuxtApp: { vueApp: import('vue').App }) => void): unknown
  export function useCookie<T>(name: string, options?: { readonly?: boolean }): { readonly value: T }
  export function useHead(input: Record<string, unknown>): void
  export function useRuntimeConfig(): { public: Record<string, unknown> }
}
