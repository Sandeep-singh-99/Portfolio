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

export default function IntroForm() {
  const [formData, setFormData] = useState({
    name: "",
    techStack: "",
    desc: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    if (!formData.name || !formData.techStack || !formData.desc) {
      toast.error("All fields are required");
      return;
    }

    payload.append("name", formData.name);
    payload.append("techStack", formData.techStack);
    payload.append("desc", formData.desc);
    if (image) payload.append("image", image);
    if (file) payload.append("file", file);

    try {
      const response = await fetch("/api/intro", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Intro added successfully");
        setFormData({ name: "", techStack: "", desc: "" });
        setImage(null);
        setFile(null);
      } else {
        toast.error(result.error || "Failed to add intro");
      }

    } catch (error) {
      console.error("Error uploading intro:", error);
      toast.error("Failed to upload intro");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Add Intro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Intro</DialogTitle>
            <DialogDescription>
              Fill the form to add your portfolio intro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Name</Label>
              <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                type="text"
                id="techStack"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="Enter tech stack"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                type="text"
                id="desc"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="Enter description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
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
            <Button type="submit" >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
