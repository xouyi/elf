import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { bothThemes } from '../../../.storybook/both-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const components = { Tabs, TabsContent, TabsList, TabsTrigger }

const body = `
  <Tabs default-value="overview" class="w-full max-w-md">
    <TabsList aria-label="Sections">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="members">Members</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" class="text-sm">Team overview and recent activity.</TabsContent>
    <TabsContent value="members" class="text-sm">Member list and roles.</TabsContent>
    <TabsContent value="settings" class="text-sm">Workspace settings.</TabsContent>
  </Tabs>`

const meta = { title: 'Components/Tabs', component: Tabs } satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => ({ components, template: body }) }

export const BothThemes: Story = {
  render: bothThemes(components, body),
  parameters: { layout: 'padded' },
}
