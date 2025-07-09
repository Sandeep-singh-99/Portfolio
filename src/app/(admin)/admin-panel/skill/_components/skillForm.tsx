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

export default function SkillForm() {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!skillName) {
      toast.error("All fields are required");
      return;
    }

    if (!skillImage) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("skillName", skillName);
    if (skillImage) formData.append("skillImage", skillImage);

    try {
      const response = await fetch("/api/skill", {
        method: "POST",
        body: formData,
      })
      const result = await response.json();
      if (response.ok) {
        toast.success("Skill added successfully");
        setSkillName("");
        setSkillImage(null);
      } else {
        toast.error(result.error || "Failed to add skill");
      }
    } catch (error) {
      console.error("Error uploading skill:", error);
      toast.error("Failed to upload skill");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Skill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>
              Add a new skill to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label>Skill Name</Label>
              <Input type="text" name="name" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label>Skill Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setSkillImage(e.target.files?.[0] || null)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
