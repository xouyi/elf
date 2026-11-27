import type { SiteInfo } from '../../lib/site'

/** Package name, version and URLs, read from package.json at build time (see apps/docs/lib/site.ts). */
export function useSite(): SiteInfo {
  return useAppConfig().site as SiteInfo
}
