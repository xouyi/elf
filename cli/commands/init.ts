import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { flagString } from '../lib/args'
import type { ParsedArgs } from '../lib/args'
import { patchNuxtConfig, patchViteConfig } from '../lib/config-patch'
import { ensureCssImports } from '../lib/edit'
import { readIfExists, rel, writeFile } from '../lib/fsx'
import type { Ctx } from '../lib/fsx'
import { c, CliError, log } from '../lib/log'
import { install, runnerCommand } from '../lib/pm'
import { detectProject, hasDependency } from '../lib/project'
import type { Project } from '../lib/project'
import { ask, isInteractive } from '../lib/prompt'

export const THEMES = ['elf', 'novatron'] as const
type Theme = typeof THEMES[number]

const TAILWIND_RE = /@import\s+(?:url\()?['"]tailwindcss['"]/
const VITE_CSS_CANDIDATES = ['src/style.css', 'src/main.css', 'src/index.css', 'src/assets/main.css', 'src/assets/base.css', 'src/assets/style.css']
const VITE_ENTRIES = ['src/main.ts', 'src/main.js', 'src/main.mts', 'src/main.mjs']

const manual = (project: Project, theme: Theme) => project.framework === 'nuxt'
  ? [
      'Edit nuxt.config.ts by hand:',
      '  import tailwindcss from \'@tailwindcss/vite\'',
      '  export default defineNuxtConfig({',
      '    modules: [\'elfui/nuxt\'],',
      `    elfui: { theme: '${theme}' },`,
      '    css: [\'~/assets/css/main.css\'],',
      '    vite: { plugins: [tailwindcss()] },',
      '  })',
      'and put these two lines in that CSS file:',
      '  @import \'tailwindcss\';',
      '  @import \'elfui/styles.css\';',
    ].join('\n')
  : [
      'Edit vite.config.ts by hand:',
      '  import tailwindcss from \'@tailwindcss/vite\'',
      '  export default defineConfig({ plugins: [vue(), tailwindcss()] })',
      'and put these lines in your main CSS file:',
      '  @import \'tailwindcss\';',
      '  @import \'elfui/styles.css\';',
      `  @import 'elfui/themes/${theme}.css';`,
    ].join('\n')

function installDependencies(ctx: Ctx, project: Project, noInstall: boolean): void {
  const have = (n: string) => hasDependency(project.pkg, n)
  const spec = process.env.ELFUI_PACKAGE
  const runtime = [
    ...(have('elfui') ? [] : [spec || 'elfui']),
    ...(have('tailwindcss') ? [] : ['tailwindcss']),
    ...(have('@tailwindcss/vite') ? [] : ['@tailwindcss/vite']),
  ]
  const dev = have('typescript') ? [] : ['typescript@5']
  if (runtime.length + dev.length === 0) {
    log.skip('dependencies already installed')
    return
  }
  if (noInstall || ctx.dryRun) {
    log.warn(`${ctx.dryRun ? 'dry run' : '--no-install'}: install manually with ${[...runtime, ...dev].join(' ')}`)
    return
  }
  install(ctx.cwd, project.pm, runtime, false)
  install(ctx.cwd, project.pm, dev, true)
}

function patchCss(ctx: Ctx, file: string, theme: Theme, withTheme: boolean): void {
  const existing = readIfExists(file)
  const wanted = [
    { re: TAILWIND_RE, line: '@import \'tailwindcss\';' },
    { re: /@import\s+['"]elfui\/styles\.css['"]/, line: '@import \'elfui/styles.css\';' },
    ...(withTheme ? [{ re: new RegExp(`@import\\s+['"]elfui/themes/${theme}\\.css['"]`), line: `@import 'elfui/themes/${theme}.css';` }] : []),
  ]
  const { css, changed } = ensureCssImports(existing ?? '', wanted)
  if (existing === null) writeFile(ctx, file, `${css.trimEnd()}\n`, 'create')
  else if (changed) writeFile(ctx, file, css, 'update')
  else log.skip(`${rel(ctx, file)} already imports ElfUI`)
}

function resolveNuxtCss(project: Project, entry: string): string {
  if (entry.startsWith('~~/') || entry.startsWith('./')) return join(project.cwd, entry.replace(/^(?:~~|\.)\//, ''))
  if (entry.startsWith('~/') || entry.startsWith('@/')) return join(project.srcDir, entry.slice(2))
  return resolve(project.cwd, entry.replace(/^\//, ''))
}

function initNuxt(ctx: Ctx, project: Project, theme: Theme): void {
  const src = readIfExists(project.configFile)!
  const result = patchNuxtConfig(src, { theme, defaultCss: '~/assets/css/main.css' })
  if (!result.ok) throw new CliError(`${result.reason}.\n${manual(project, theme)}`)
  if (result.changed) writeFile(ctx, project.configFile, result.src, 'update')
  else log.skip(`${rel(ctx, project.configFile)} already configured`)
  patchCss(ctx, resolveNuxtCss(project, result.css!), theme, false)
}

function findViteCss(project: Project): { css: string | null, entry: string | null } {
  const entry = VITE_ENTRIES.map(e => join(project.cwd, e)).find(existsSync) ?? null
  if (entry) {
    const text = readIfExists(entry)!
    for (const m of text.matchAll(/import\s+['"](\.[^'"]+\.css)['"]/g)) {
      const file = resolve(join(entry, '..'), m[1]!)
      if (existsSync(file)) return { css: file, entry }
    }
  }
  const css = VITE_CSS_CANDIDATES.map(f => join(project.cwd, f)).find(existsSync) ?? null
  return { css, entry }
}

function initVite(ctx: Ctx, project: Project, theme: Theme): void {
  const src = readIfExists(project.configFile)!
  const result = patchViteConfig(src)
  if (!result.ok) throw new CliError(`${result.reason}.\n${manual(project, theme)}`)
  if (result.changed) writeFile(ctx, project.configFile, result.src, 'update')
  else log.skip(`${rel(ctx, project.configFile)} already configured`)

  const { css, entry } = findViteCss(project)
  if (css) {
    patchCss(ctx, css, theme, true)
  }
  else {
    if (!entry) throw new CliError(`Could not find src/main.ts to import a stylesheet from.\n${manual(project, theme)}`)
    const created = join(project.cwd, 'src/style.css')
    patchCss(ctx, created, theme, true)
    const main = readIfExists(entry)!
    const lines = main.split('\n')
    const lastImport = lines.findLastIndex(l => /^import\b/.test(l))
    lines.splice(lastImport + 1, 0, 'import \'./style.css\'')
    writeFile(ctx, entry, lines.join('\n'), 'update')
  }

  // The elf theme is the default (:root:not([data-theme])); novatron is selected through data-theme on <html>.
  const html = join(project.cwd, 'index.html')
  const text = readIfExists(html)
  if (theme !== 'elf' && text && !/<html[^>]*data-theme=/.test(text)) {
    if (/<html[^>]*>/.test(text)) writeFile(ctx, html, text.replace(/<html/, `<html data-theme="${theme}"`), 'update')
    else log.warn(`Add data-theme="${theme}" to your <html> element.`)
  }
}

export async function init(args: ParsedArgs, ctx: Ctx): Promise<number> {
  const project = detectProject(ctx.cwd)
  const yes = args.flags.yes === true
  let theme = flagString(args.flags, 'theme') as Theme | undefined
  if (theme && !THEMES.includes(theme)) throw new CliError(`Unknown theme "${theme}". Choose one of: ${THEMES.join(', ')}.`)
  if (!theme) theme = !yes && isInteractive() ? await ask(`Theme (${THEMES.join('/')})`, 'elf') as Theme : 'elf'
  if (!THEMES.includes(theme)) throw new CliError(`Unknown theme "${theme}". Choose one of: ${THEMES.join(', ')}.`)

  log.info(`${c.bold('ElfUI init')}: ${project.framework === 'nuxt' ? 'Nuxt' : 'Vite + Vue'} project, ${project.pm}, theme ${theme}${ctx.dryRun ? ' (dry run)' : ''}`)
  installDependencies(ctx, project, args.flags['no-install'] === true)
  if (project.framework === 'nuxt') initNuxt(ctx, project, theme)
  else initVite(ctx, project, theme)

  const run = runnerCommand(project.pm)
  log.info(`\nDone. Add components with:\n  ${run} elfui add button dialog\nor import them from the package:\n  import { ElfButton } from 'elfui'${project.framework === 'nuxt' ? ' (auto-imported in Nuxt)' : ''}`)
  return 0
}
