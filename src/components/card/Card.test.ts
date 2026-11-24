import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.'

describe('Card', () => {
  it('composes all parts with data-slot markers', () => {
    const w = mount({
      components: { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle },
      template: `
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Desc</CardDescription>
            <CardAction>Act</CardAction>
          </CardHeader>
          <CardContent>Body</CardContent>
          <CardFooter>Foot</CardFooter>
        </Card>`,
    })
    for (const slot of ['card', 'card-header', 'card-title', 'card-description', 'card-action', 'card-content', 'card-footer']) {
      expect(w.find(`[data-slot="${slot}"]`).exists(), slot).toBe(true)
    }
    expect(w.find('h3').text()).toBe('Title')
    expect(w.find('[data-slot="card"]').classes()).toContain('bg-card')
  })

  it('merges custom classes', () => {
    expect(mount(Card, { props: { class: 'py-2' } }).classes()).toContain('py-2')
  })
})
