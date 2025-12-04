import React from "react";
import { ConnectDB } from "../../../../../lib/db";
import Project, { IProject } from "../../../../../models/project.model";
import { MarkdownRender } from "@/components/MarkdownRender";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

async function fetchProject(id: string): Promise<IProject | null> {
  await ConnectDB();
  try {
    const project = await Project.findById(id).lean<IProject>();
    if (!project) return null;

    return {
      ...project,
      _id: project._id?.toString(),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPageById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            404 – Project Not Found
          </h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <ArrowLeft size={20} />
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen  py-5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <Image
              src={project.projectImage}
              alt={project.projectName}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Links */}
          <div className="mt-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {project.projectName}
            </h1>

            <div className="flex items-center justify-center gap-4 mt-8">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
                >
                  <ExternalLink size={18} />
                  View Live
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-800 text-white rounded-full font-medium hover:scale-105 transition-transform border border-zinc-800 dark:border-zinc-700"
                >
                  <Github size={18} />
                  Source Code
                </a>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-6">
              Built with
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.projectTechStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <article className="mt-20 prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <MarkdownRender content={project.projectDesc} />
          </article>
        </div>
      </div>
    </>
  );
}
