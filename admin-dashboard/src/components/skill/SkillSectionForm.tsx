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

export function SkillSectionForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Create Skill Section</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Skill Section</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="skills">Skill Name</Label>
                <Input
                  id="skill"
                  name="skill"
                  placeholder="Enter your skill Name"
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="skillDescription">Skill Image</Label>
                <Input
                    id="skillImage"
                    name="skillImage"
                    placeholder="Enter your skill image URL"
                    type="file"
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
