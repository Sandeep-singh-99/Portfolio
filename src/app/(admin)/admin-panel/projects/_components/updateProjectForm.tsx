"use client";

import React, { useEffect, useState } from "react";
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
import { NotebookPen } from "lucide-react";
import axios from "axios";

type FormDataType = {
  projectName: string;
  githubLink: string;
  liveLink: string;
  projectTechStack: string; // stored as comma-separated string
  projectDesc: string;
};

export default function ProjectForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState<FormDataType>({
    projectName: "",
    githubLink: "",
    liveLink: "",
    projectTechStack: "",
    projectDesc: "",
  });

  const [projectImage, setProjectImage] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/project/${id}`);
      const data = response.data.data;
      console.log("Fetched data:", data);

      if (response.status === 200) {
        setFormData({
          projectName: data.projectName || "",
          githubLink: data.githubLink || "",
          liveLink: data.liveLink || "",
          projectTechStack: (data.projectTechStack || []).join(", "),
          projectDesc: data.projectDesc || "",
        });
      } else {
        toast.error(data.message || "Failed to fetch project data");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast.error("Failed to fetch project data");
    }
  };

   useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDescriptionChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, projectDesc: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { projectName, githubLink, liveLink, projectTechStack, projectDesc } = formData;

    if (!projectName || !githubLink || !liveLink || !projectTechStack) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("projectName", projectName);
    formPayload.append("projectDesc", projectDesc);
    formPayload.append("projectTechStack", projectTechStack);
    formPayload.append("githubLink", githubLink);
    formPayload.append("liveLink", liveLink);
    if (projectImage) formPayload.append("projectImage", projectImage);

    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "PATCH",
        body: formPayload,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Project uploaded successfully");
        setFormData({
          projectName: "",
          githubLink: "",
          liveLink: "",
          projectTechStack: "",
          projectDesc: "",
        });
        setProjectImage(null);
      } else {
        toast.error(result.error || "Failed to update project");
      }
    } catch (error) {
      console.error("Error update project:", error);
      toast.error("Failed to update project");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <NotebookPen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[985px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Project</DialogTitle>
            <DialogDescription>Fill in the details for your project.</DialogDescription>
          </DialogHeader>

          <div className="flex justify-between gap-3 py-4">
            <div className="grid w-2/5 gap-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="liveLink">Live Link</Label>
                <Input
                  id="liveLink"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectTechStack">Project Tech Stack (comma separated)</Label>
                <Input
                  id="projectTechStack"
                  value={formData.projectTechStack}
                  onChange={(e) => setFormData({ ...formData, projectTechStack: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectImage">Project Image</Label>
                <Input
                  id="projectImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectImage(e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </div>

            <div className="w-3/5 flex flex-col gap-2">
              <Label htmlFor="projectDesc">Project Description</Label>
              <MDEditor value={formData.projectDesc} onChange={handleDescriptionChange} height={400} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
