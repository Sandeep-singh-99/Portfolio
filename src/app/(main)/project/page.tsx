import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Project, { IProject } from "../../../../models/project.model";
import ProjectCard from "@/components/home/ProjectCard";
import Link from "next/link";
import { ArrowLeft, Grid, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default async function ProjectPage() {
  const projects = await fetchProjects();

  return (
    <div className="container mx-auto">
       <div className="flex flex-col mb-2">
          <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
          <h2 className="md:text-xl text-xl font-bold">Projects</h2>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.slice(0, 4).map((project) => (
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

      <div className="text-center mt-10">
        <Link href="/project/all-projects">
          <Button variant="outline" className=" hover:bg-white cursor-pointer ">
            Show all projects <MoveRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
