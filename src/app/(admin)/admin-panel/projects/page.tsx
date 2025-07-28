import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProjectForm from "./_components/projectForm";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";
import { MarkdownRender } from "@/components/MarkdownRender";
import Image from "next/image";
import DeleteProject from "./_components/deleteProject";
import UpdateProjectForm from "./_components/updateProjectForm";


interface Project {
  _id: string;
  id: string;
  projectName: string;
  projectDesc: string;
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
    <section className="p-4 sm:p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Section</h1>
          <p className="text-gray-400 mt-1">
            Manage the project content of your portfolio.
          </p>
        </div>
        <ProjectForm />
      </div>

      <main>
        <Card className="shadow-xl rounded-xl w-full">
          <CardContent className="p-4 w-full">
            {projects.length > 0 ? (
              <div className="flex flex-col gap-4 w-full max-h-960 overflow-y-auto">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className=" border border-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full"
                  >
                    {/* Header with Title and Delete Button */}
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-lg font-semibold text-white truncate">
                        {project.projectName}
                      </h2>
                     <div className="flex items-center gap-2">
                       <UpdateProjectForm id={project._id} />
                      <DeleteProject id={project._id} />
                     </div>
                    </div>

                    {/* Project Image */}
                    <div className="relative mb-3">
                      <Image
                        src={project.projectImage}
                        alt={project.projectName}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="w-full h-48 object-cover rounded-md"
                        width={1920}
                        height={1080}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-md" />
                    </div>

                    {/* Markdown Description */}
                    <div className="prose prose-sm max-w-none text-gray-300 mb-3 line-clamp-3">
                      <MarkdownRender content={project.projectDesc} />
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-3">
                      <h3 className="text-sm font-medium text-gray-400">Tech Stack:</h3>
                      <ul className="flex flex-wrap gap-1.5 mt-1">
                        {project.projectTechStack.map((tech, index) => (
                          <li
                            key={index}
                            className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-full"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        GitHub
                      </a>
                      <span className="text-gray-600">|</span>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Live
                      </a>
                    </div>

                    {/* Created Date */}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No projects found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </section>
  );
}