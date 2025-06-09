import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function IntroSectionForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Create Intro Section</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Intro Section</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Full Name</Label>
              <Input id="name-1" name="name" placeholder="Enter your full name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="description" name="description" placeholder="Enter a brief description" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="techStack">Tech Stack</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  placeholder="e.g. React, Node.js, MongoDB"
                  multiple
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="file">File Upload</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
