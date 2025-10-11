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
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";

export default function ProjectForm() {
  const [productName, setProductName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [projectTechStack, setProjectTechStack] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectDesc, setProjectDesc] = useState("");
  const [projectSubDesc, setProjectSubDesc] = useState("");
  const [priority, setPriority] = useState<number>(0);


  const handleDescriptionChange = (value?: string) => {
    setProjectDesc(value || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productName ||
      !githubLink ||
      !liveLink ||
      !projectTechStack ||
      !projectImage
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("projectName", productName);
    formData.append("projectDesc", projectDesc);
    formData.append("projectSubDesc", projectSubDesc);
    formData.append("projectTechStack", projectTechStack);
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);
    formData.append("priority", String(priority));
    if (projectImage) formData.append("projectImage", projectImage);

    try {
      const response = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Project uploaded successfully");
        setProductName("");
        setGithubLink("");
        setLiveLink("");
        setProjectTechStack("");
        setProjectImage(null);
        setProjectDesc("");
        setProjectSubDesc("");
      } else {
        toast.error(result.error || "Failed to upload Project");
      }
    } catch (error) {
      console.error("Error uploading Project:", error);
      toast.error("Failed to upload Project");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[985px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Fill in the details for your new project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-3 py-4">
            <div className="grid w-2/5">
              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  name="projectName"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="projectSubDesc">Project Subtitle</Label>
                <Input
                  id="projectSubDesc"
                  name="projectSubDesc"
                  type="text"
                  value={projectSubDesc}
                  onChange={(e) => setProjectSubDesc(e.target.value)}
                  placeholder="Enter project subtitle"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">
                  Priority (0 = normal, higher = top)
                </Label>
                <Input
                  id="priority"
                  name="priority"
                  type="number"
                  placeholder="Enter priority (e.g., 5)"
                  onChange={(e) => setPriority(Number(e.target.value))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="githubLink">Github Link</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  type="text"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="Enter Github link"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="liveLink">Live Link</Label>
                <Input
                  id="liveLink"
                  name="liveLink"
                  type="text"
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  placeholder="Enter live link"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectTechStack">Project Tech Stack</Label>
                <Input
                  id="projectTechStack"
                  name="projectTechStack"
                  type="text"
                  value={projectTechStack}
                  onChange={(e) => setProjectTechStack(e.target.value)}
                  placeholder="Enter project tech stack"
                  required
                  multiple
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectImage">Project Image</Label>
                <Input
                  id="projectImage"
                  name="projectImage"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="w-2/3 flex flex-col gap-2">
              <Label htmlFor="projectDesc" className="mt-4">
                Project Description
              </Label>
              <MDEditor
                value={projectDesc}
                onChange={handleDescriptionChange}
                height={400}
              />
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
