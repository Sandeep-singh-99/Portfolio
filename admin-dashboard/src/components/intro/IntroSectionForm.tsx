import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useIntroStore } from "@/store/useIntroStore";

export function IntroSectionForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    techStack: "",
    image: "",
    file: "",
  });

  const { addIntro, isLoading } = useIntroStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const image = e.target.files?.[0] || null;
  setFormData({ ...formData, image: image });
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setFormData({ ...formData, file: file });
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addIntro(formData)
    setFormData({
      name: "",
      description: "",
      techStack: "",
      image: "",
      file: "",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Intro Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Intro Section</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                placeholder="Enter tech stack (comma separated)"
                multiple
                type="text"
                required
                value={formData.techStack}
                onChange={(e) =>
                  setFormData({ ...formData, techStack: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Upload an image"
                required
                
                onChange={handleImageChange}
                
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                placeholder="Upload a file"
                required
                
                onChange={handleFileChange}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Creating..." : "Create Intro Section"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
