import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProjectForm from "./_components/projectForm";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";
import { MarkdownRender } from "@/components/MarkdownRender";
import Image from "next/image";
import DeleteProject from "./_components/deleteProject";
import UpdateProjectForm from "./_components/updateProjectForm";
import { Github, ExternalLink, Calendar, Code, FolderGit2 } from "lucide-react";
import SortableProjectList from "./_components/SortableProjectList";

interface Project {
  _id: string;
  id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink: string;
  liveLink: string;
  projectImagePublicId?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

async function fetchProjectData(): Promise<Project[]> {
  try {
    await ConnectDB();
    const data = await Project.find().sort({ priority: 1 });
    return data.map((project) => ({
      ...project.toObject(),
      _id: project._id.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects: Project[] = await fetchProjectData();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Projects Section
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <ProjectForm />
      </div>

      <Separator />

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Projects
          </h2>
          <span className="text-sm text-muted-foreground">
            {projects.length} total projects
          </span>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
                <FolderGit2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No projects yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Showcase your work by adding your first project.
              </p>
            </CardContent>
          </Card>
        ) : (
          <SortableProjectList initialProjects={projects} />
        )}
      </section>
    </div>
  );
}
