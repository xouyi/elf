import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '../button'
import { Input } from '../input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '.'

const components = { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, Button, Input }

const meta = { title: 'Components/Dialog', component: Dialog } satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components,
    template: `
      <Dialog>
        <DialogTrigger as-child><Button variant="outline">Edit profile</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update your display name. Save when you are done.</DialogDescription>
          </DialogHeader>
          <Input aria-label="Display name" placeholder="Display name" />
          <DialogFooter>
            <DialogClose as-child><Button variant="outline">Cancel</Button></DialogClose>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>`,
  }),
}

export const OpenByDefault: Story = {
  name: 'Open (visual test)',
  render: () => ({
    components,
    template: `
      <Dialog default-open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete match log?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter show-close-button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>`,
  }),
  parameters: { layout: 'fullscreen' },
}
