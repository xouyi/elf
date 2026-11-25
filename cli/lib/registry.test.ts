import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { collectDependencies, registryDependencyName, resolveItems, resolveRegistryBase } from './registry'

function fakeRegistry(items: Record<string, object>): string {
  const dir = mkdtempSync(join(tmpdir(), 'elfui-reg-'))
  mkdirSync(dir, { recursive: true })
  for (const [name, item] of Object.entries(items)) writeFileSync(join(dir, `${name}.json`), JSON.stringify({ name, files: [], ...item }))
  return dir
}

describe('registryDependencyName', () => {
  it('accepts URLs, namespaced names and plain names', () => {
    expect(registryDependencyName('https://xouyi.github.io/elfUI/r/utils.json')).toBe('utils')
    expect(registryDependencyName('@elf/button')).toBe('button')
    expect(registryDependencyName('card')).toBe('card')
  })
})

describe('resolveItems', () => {
  const dir = fakeRegistry({
    utils: { dependencies: ['clsx'] },
    button: { dependencies: ['reka-ui'], registryDependencies: ['https://example.com/r/utils.json'] },
    dialog: { dependencies: ['reka-ui', '@lucide/vue'], registryDependencies: ['https://example.com/r/utils.json', 'https://example.com/r/button.json'] },
    loop: { registryDependencies: ['loop2'] },
    loop2: { registryDependencies: ['loop'] },
  })

  it('resolves dependencies first, once each', async () => {
    const items = await resolveItems(dir, ['dialog', 'button'])
    expect(items.map(i => i.name)).toEqual(['utils', 'button', 'dialog'])
    expect(collectDependencies(items, 'dependencies')).toEqual(['@lucide/vue', 'clsx', 'reka-ui'])
  })

  it('survives dependency cycles', async () => {
    expect((await resolveItems(dir, ['loop'])).map(i => i.name).sort()).toEqual(['loop', 'loop2'])
  })

  it('reports a missing item', async () => {
    await expect(resolveItems(dir, ['nope'])).rejects.toThrow('not found')
  })
})

describe('resolveRegistryBase', () => {
  it('prefers the flag, then the environment, then the public site', () => {
    expect(resolveRegistryBase('./a', '/b')).toBe('./a')
    expect(resolveRegistryBase(undefined, '/b')).toBe('/b')
    expect(resolveRegistryBase(undefined, undefined)).toBe('https://xouyi.github.io/elfUI/r/')
  })
})
