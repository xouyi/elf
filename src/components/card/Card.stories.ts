import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { bothThemes } from '../../../.storybook/both-themes'
import { Button } from '../button'
import { Badge } from '../badge'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.'

const components = { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Badge }

const body = `
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Robot status</CardTitle>
      <CardDescription>Drivetrain diagnostics for the last match.</CardDescription>
      <CardAction><Badge variant="success">Ready</Badge></CardAction>
    </CardHeader>
    <CardContent>
      <p class="text-sm">All swerve modules calibrated. Battery at 12.4 V.</p>
    </CardContent>
    <CardFooter class="gap-2">
      <Button size="sm">Open log</Button>
      <Button size="sm" variant="outline">Dismiss</Button>
    </CardFooter>
  </Card>`

const meta = { title: 'Components/Card', component: Card } satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => ({ components, template: body }) }

export const BothThemes: Story = {
  render: bothThemes(components, body),
  parameters: { layout: 'padded' },
}
