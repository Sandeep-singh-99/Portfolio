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
    const data = await Project.find().sort({ createdAt: -1 });
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project._id}
                className="group flex flex-col overflow-hidden border-muted/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.projectImage}
                    alt={project.projectName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1">
                    <UpdateProjectForm id={project._id} />
                    <DeleteProject id={project._id} />
                  </div>
                </div>

                <CardHeader className="space-y-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1 text-xl">
                      {project.projectName}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 text-sm">
                    {project.projectSubDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Code className="h-3 w-3" />
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.projectTechStack
                        .slice(0, 5)
                        .map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-2 py-0.5 text-xs font-normal"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.projectTechStack.length > 5 && (
                        <Badge
                          variant="outline"
                          className="px-2 py-0.5 text-xs font-normal"
                        >
                          +{project.projectTechStack.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t bg-muted/20 flex justify-between items-center gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Code"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
