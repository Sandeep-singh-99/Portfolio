"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import Image from "next/image";
import UpdateProjectForm from "./updateProjectForm";
import DeleteProject from "./deleteProject";
import {
  Github,
  ExternalLink,
  Calendar,
  Code,
  GripVertical,
} from "lucide-react";

interface Project {
  _id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink: string;
  liveLink: string;
  createdAt: string;
}

interface SortableProjectItemProps {
  project: Project;
}

export function SortableProjectItem({ project }: SortableProjectItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="group flex flex-col overflow-hidden border-muted/60 hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={project.projectImage}
            alt={project.projectName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1 z-10">
            <UpdateProjectForm id={project._id} />
            <DeleteProject id={project._id} />
          </div>
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-md cursor-grab active:cursor-grabbing hover:bg-background transition-colors z-10"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
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
              {project.projectTechStack.slice(0, 5).map((tech, index) => (
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
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                title="View Code"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
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
    </div>
  );
}
