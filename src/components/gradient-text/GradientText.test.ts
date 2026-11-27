import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { parseColor, ratio, readThemes } from '../../../scripts/lib/color'
import { GradientText, gradientTextPresets } from '.'

const root = join(import.meta.dirname, '../../..')

describe('GradientText', () => {
  it('renders a span with the brand gradient and real text', () => {
    const w = mount(GradientText, { slots: { default: 'Robot' } })
    expect(w.element.tagName).toBe('SPAN')
    expect(w.text()).toBe('Robot')
    expect(w.attributes('data-slot')).toBe('gradient-text')
    expect(w.attributes('data-variant')).toBe('brand')
    expect(w.classes()).toEqual(expect.arrayContaining(['bg-clip-text', 'text-transparent']))
    expect(w.attributes('style')).toContain('linear-gradient(to right, var(--elf-primary), var(--elf-foreground))')
  })

  it('renders another element through as and merges onto the child with asChild', () => {
    expect(mount(GradientText, { props: { as: 'h2' } }).element.tagName).toBe('H2')
    const w = mount(GradientText, { props: { asChild: true }, slots: { default: '<strong>Hi</strong>' } })
    expect(w.element.tagName).toBe('STRONG')
    expect(w.classes()).toContain('text-transparent')
  })

  it('uses light-dark() for the named presets', () => {
    const style = mount(GradientText, { props: { variant: 'aurora' } }).attributes('style')!
    expect(style).toContain('light-dark(#0e7490, #22d3ee)')
    expect(style).toContain('light-dark(#be185d, #f472b6)')
  })

  it('lets from, via and to override the preset and sets the direction', () => {
    const style = mount(GradientText, { props: { from: 'red', via: 'white', to: 'blue', direction: 'br' } }).attributes('style')!
    expect(style).toContain('linear-gradient(to bottom right, red, white, blue)')
  })

  it('keeps the middle stop of a three-stop preset unless via is given', () => {
    expect(mount(GradientText, { props: { variant: 'forest', from: 'red' } }).attributes('style')).toContain('red, light-dark(#0f766e, #2dd4bf), light-dark(#4d7c0f, #a3e635)')
  })

  it('animates only on request and never under reduced motion', () => {
    expect(mount(GradientText).classes().some(c => c.includes('elf-gradient-shimmer'))).toBe(false)
    const w = mount(GradientText, { props: { animate: true } })
    expect(w.classes().some(c => c.includes('elf-gradient-shimmer'))).toBe(true)
    expect(w.classes()).toContain('motion-reduce:animate-none')
    expect(w.attributes('style')).toContain('background-size: 200% 200%')
  })
})

describe('GradientText styles', () => {
  const css = readFileSync(join(root, 'src/styles.css'), 'utf8')

  it('falls back to CanvasText in forced-colors mode and has a shimmer keyframe', () => {
    expect(css).toMatch(/@media \(forced-colors: active\)\s*\{\s*\[data-slot='gradient-text'\][^}]*CanvasText/)
    expect(css).toContain('@keyframes elf-gradient-shimmer')
  })
})

describe('GradientText contrast', () => {
  // Every stop is text on the page, a card or a popover: 4.5:1 (WCAG AA for normal text). No preset is limited to large text.
  for (const theme of readThemes(root)) {
    const light = /color-scheme:\s*light/.test(readFileSync(join(root, 'src/themes', `${theme.name}.css`), 'utf8'))
    describe(`${theme.name} (${light ? 'light' : 'dark'})`, () => {
      for (const [name, preset] of Object.entries(gradientTextPresets)) {
        const stops = 'stops' in preset
          ? preset.stops.map(s => theme.colors[s.replace('var(--elf-', '').replace(')', '')]!)
          : (light ? preset.light : preset.dark).map(parseColor)
        it.each(['background', 'card', 'popover'])(`${name} stops reach 4.5:1 on %s`, (surface) => {
          for (const stop of stops) expect(ratio(stop, theme.colors[surface]!)).toBeGreaterThanOrEqual(4.5)
        })
      }
    })
  }
})
