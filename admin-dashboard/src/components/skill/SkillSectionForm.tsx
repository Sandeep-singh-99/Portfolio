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
import { useSkillStore } from "@/store/useSkillStore"
import { useState } from "react"

export function SkillSectionForm() {
  const { addSkill, isLoading } = useSkillStore()

  const [formData, setFormData] = useState({
    skillName: "",
    image: ""
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] || null;
    setFormData({ ...formData, image: image });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addSkill(formData)
    setFormData({
      skillName: "",
      image: ""
    })
  }
  return (
    <Dialog>
     
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
          <form  onSubmit={handleSubmit}>
            
          
          <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="skills">Skill Name</Label>
                <Input
                  id="skill"
                  name="skill"
                  placeholder="Enter your skill Name"
                  required
                  value={formData.skillName}
                  onChange={(e) =>
                    setFormData({ ...formData, skillName: e.target.value })
                  }
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="skillDescription">Skill Image</Label>
                <Input
                    id="skillImage"
                    name="skillImage"
                    placeholder="Enter your skill image URL"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}
