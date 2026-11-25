import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { destinationFor, rewriteImports } from './rewrite'

const srcDir = '/p/src'
const uiDir = '/p/src/components/ui'
const source = [
  'import { cn } from \'@/lib/utils\'',
  'import { Button } from "@/components/ui/button"',
  'import { buttonVariants } from \'./index\'',
].join('\n')

describe('rewriteImports', () => {
  it('rewrites to the project alias', () => {
    const out = rewriteImports(source, { fileDir: join(uiDir, 'dialog'), srcDir, uiDir, alias: '~/' })
    expect(out).toContain('from \'~/lib/utils\'')
    expect(out).toContain('from "~/components/ui/button"')
    expect(out).toContain('from \'./index\'')
  })

  it('honours a custom components path', () => {
    const out = rewriteImports(source, { fileDir: '/p/src/ui/dialog', srcDir, uiDir: '/p/src/ui', alias: '@/' })
    expect(out).toContain('from "@/ui/button"')
  })

  it('falls back to relative imports without an alias', () => {
    const out = rewriteImports(source, { fileDir: join(uiDir, 'dialog'), srcDir, uiDir, alias: null })
    expect(out).toContain('from \'../../../lib/utils\'')
    expect(out).toContain('from "../button"')
  })
})

describe('destinationFor', () => {
  it('uses the target for lib files and the ui folder otherwise', () => {
    const t = { srcDir, uiDir }
    expect(destinationFor({ path: 'registry/_generated/lib/utils.ts', target: 'lib/utils.ts' }, t)).toBe('/p/src/lib/utils.ts')
    expect(destinationFor({ path: 'registry/_generated/ui/button/Button.vue' }, t)).toBe('/p/src/components/ui/button/Button.vue')
  })
})
