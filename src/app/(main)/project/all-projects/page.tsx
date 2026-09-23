import React from "react";
import type { Metadata } from "next";
import ProjectCard from "@/components/home/ProjectCard";
import Link from "next/link";
import { ArrowLeft, Grid, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectDB } from "../../../../../lib/db";
import Project, { IProject } from "../../../../../models/project.model";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore web development and software engineering projects built by Sandeep Singh using Next.js, React, Node.js, and TypeScript.",
  openGraph: {
    title: "Projects | Sandeep Singh",
    description:
      "Explore web development and software engineering projects built by Sandeep Singh.",
    url: "https://sandeep-singh.com/project/all-projects",
  },
  alternates: {
    canonical: "https://sandeep-singh.com/project/all-projects",
  },
};

export const revalidate = 3600;

async function fetchProjects(): Promise<IProject[]> {
  await ConnectDB();
  const projects = await Project.find()
    .sort({ priority: 1 })
    .lean<IProject[]>();
  return projects.map((project) => ({
    ...project,
    _id: project._id?.toString(),
  }));
}

export default async function AllProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          My projects and work across different technologies and domains.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            _id={project._id!}
            projectName={project.projectName}
            projectSubDesc={project.projectSubDesc}
            projectImage={project.projectImage}
            projectTechStack={project.projectTechStack}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </div>
  );
}
