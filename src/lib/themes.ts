/** Names of the themes that ship with ElfUI, in the order `useElfTheme().cycle()` visits them. */
export const elfThemes = ['elf', 'nova'] as const

/** A theme that ships with ElfUI. */
export type ElfTheme = (typeof elfThemes)[number]

/** Type guard for the shipped theme names. */
export function isElfTheme(value: unknown): value is ElfTheme {
  return typeof value === 'string' && (elfThemes as readonly string[]).includes(value)
}
