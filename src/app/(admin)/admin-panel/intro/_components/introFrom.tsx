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
  const [isPending, setIsPending] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    toast.loading("Uploading intro...");

    const payload = new FormData();
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
      await response.json();
      setIsPending(false);

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
            {/* {["name", "techStack", "desc"].map((field) => (
              <div key={field} className="grid gap-2">
                <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))} */}
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                type="text"
                id="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="Enter tech stack"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                type="text"
                id="desc"
                value={formData.desc}
                onChange={handleChange}
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
