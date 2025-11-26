import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Project, { IProject } from "../../../../models/project.model";
import ProjectCard from "@/components/ProjectCard";

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
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
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
