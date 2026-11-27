/**
 * Single source of truth for the package name, version and URLs shown on the docs site.
 *
 * Everything is derived from the repository's root package.json at build time, so a release never needs a docs edit.
 * Consumers:
 *   - nuxt.config.ts puts `site` into app config (`useSite()` in Vue components);
 *   - the `content:file:beforeParse` hook calls `applyPlaceholders()` so Markdown (including fenced code blocks,
 *     which Shiki then highlights with the real values) can use the placeholders listed in `placeholderNames`;
 *   - scripts/prepare.ts and the docs checks reuse the same values.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

interface PackageJson {
  name: string
  version: string
  homepage: string
  repository: { url: string } | string
}

const root = join(import.meta.dirname, '..', '..', '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson

const repoUrl = (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url)
  .replace(/^git\+/, '')
  .replace(/\.git$/, '')
const repoSlug = repoUrl.replace(/^https:\/\/github\.com\//, '')
const siteUrl = pkg.homepage.replace(/\/+$/, '')

export interface SiteInfo {
  /** npm package name, e.g. `@xouyi/elfui`. */
  name: string
  /** Version from package.json, without a leading `v`. */
  version: string
  /** GitHub repository URL. */
  repo: string
  /** GitHub `owner/name`. */
  repoSlug: string
  /** Published docs site URL, without a trailing slash. */
  site: string
  /** Base URL of the static shadcn-vue registry (`<registry>/<name>.json`), without a trailing slash. */
  registry: string
  /** Raw GitHub fallback for the registry files, without a trailing slash. */
  registryRaw: string
  /** npm package page. */
  npm: string
}

export const site: SiteInfo = {
  name: pkg.name,
  version: pkg.version,
  repo: repoUrl,
  repoSlug,
  site: siteUrl,
  registry: `${siteUrl}/r`,
  registryRaw: `https://raw.githubusercontent.com/${repoSlug}/main/registry/r`,
  npm: `https://www.npmjs.com/package/${pkg.name}`,
}

/** Markdown placeholder to value. Write `{{version}}` (no spaces) in content; it is replaced before parsing. */
export const placeholders: Record<string, string> = {
  pkg: site.name,
  version: site.version,
  repo: site.repo,
  'repo-slug': site.repoSlug,
  site: site.site,
  registry: site.registry,
  'registry-raw': site.registryRaw,
  npm: site.npm,
}

export const placeholderNames = Object.keys(placeholders)

const pattern = new RegExp(`\\{\\{(${placeholderNames.join('|')})\\}\\}`, 'g')

/** Replaces every known `{{placeholder}}` in raw Markdown, inside fenced code blocks too. Unknown `{{ ... }}` is left alone. */
export function applyPlaceholders(text: string, values: Record<string, string> = placeholders): string {
  return text.replace(pattern, (_m, key: string) => values[key]!)
}
