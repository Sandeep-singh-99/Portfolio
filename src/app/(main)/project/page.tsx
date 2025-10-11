import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Project from "../../../../models/project.model";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

async function fetchProjectData() {
  await ConnectDB();
  const data = await Project.find().sort({ createdAt: -1 });
  return data;
}

export default async function ProjectPage() {
  const projects = await fetchProjectData();

  const visibleProjects = projects.slice(0, 4);
  const hasMore = projects.length > 4;

  return (
    <div
      id="projects"
      className="container mx-auto pt-10 px-4 sm:px-6 lg:px-12"
    >
      <div className="text-center mb-10">
        <h1 className="md:text-5xl text-3xl tracking-wider p-2 font-bold bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Featured Projects 🚀
        </h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-lg">
          Built with modern tech & clean design
        </p>
      </div>
      {/* Project Cards md:grid-cols-2 gap-10 */}
      <div className="grid md:grid-cols-2 gap-5 ">
        {visibleProjects.map((proj) => (
          <ProjectCard
            key={proj.id}
            _id={proj.id}
            projectSubDesc={proj.projectSubDesc}
            projectName={proj.projectName}
            projectImage={proj.projectImage}
            projectTechStack={proj.projectTechStack}
            githubLink={proj.githubLink}
            liveLink={proj.liveLink}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <Link href="/project/view-all-projects">
            <Button variant="outline" className=" hover:bg-white ">
              View More Projects →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
