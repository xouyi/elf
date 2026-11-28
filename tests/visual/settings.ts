/**
 * Visual regression settings: which themes and widths get screenshots.
 *
 * Screenshots are expensive (every example × theme × width) and only catch layout and colour regressions, which the
 * default theme shows for every theme: themes differ in tokens, not in layout. Accessibility in every theme is still
 * covered by the browser tests (axe on every example in every theme).
 *
 * Override for one run: `VISUAL_THEMES=elf,elfwood VISUAL_WIDTHS=1280 bun run test:visual`.
 * Baselines must be regenerated (`bun run baselines`) after changing the defaults below.
 */
export const DEFAULT_VISUAL_THEMES = ['elf']
export const DEFAULT_VISUAL_WIDTHS = [1280, 360]

const list = (value: string | undefined) => value?.split(',').map(s => s.trim()).filter(Boolean)

export const visualThemes: string[] = list(process.env.VISUAL_THEMES) ?? DEFAULT_VISUAL_THEMES

export const visualViewports = (list(process.env.VISUAL_WIDTHS)?.map(Number) ?? DEFAULT_VISUAL_WIDTHS)
  .map(width => ({ label: String(width), width, height: width >= 768 ? 800 : 740 }))
