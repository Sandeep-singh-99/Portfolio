"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";
import { Pencil } from "lucide-react";

interface IntroData {
  _id: string;
  name: string;
  desc: string;
  techStack: string[];
}

export default function UpdateIntroForm({ intro }: { intro: IntroData }) {
  const [formData, setFormData] = useState({
    name: intro.name,
    techStack: intro.techStack.join(", "),
    desc: intro.desc,
  });
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    if (!formData.name || !formData.techStack || !formData.desc) {
      toast.error("All text fields are required");
      return;
    }

    payload.append("name", formData.name);
    payload.append("techStack", formData.techStack);
    payload.append("desc", formData.desc);
    if (image) payload.append("image", image);
    if (file) payload.append("file", file);

    try {
      const response = await fetch(`/api/intro/${intro._id}`, {
        method: "PATCH",
        body: payload,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Intro updated successfully");
        setImage(null);
        setFile(null);
      } else {
        toast.error(result.error || "Failed to update intro");
      }
    } catch (error) {
      console.error("Error updating intro:", error);
      toast.error("Failed to update intro");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Intro</DialogTitle>
            <DialogDescription>
              Update your portfolio intro details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                type="text"
                id="techStack"
                value={formData.techStack}
                onChange={(e) =>
                  setFormData({ ...formData, techStack: e.target.value })
                }
                placeholder="Enter tech stack (comma separated)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                type="text"
                id="desc"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                placeholder="Enter description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File (Optional)</Label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
