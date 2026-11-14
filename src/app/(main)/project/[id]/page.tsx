import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Grid,
  FileQuestion,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { ConnectDB } from "../../../../../lib/db";
import Project, { IProject } from "../../../../../models/project.model";
import { MDXRender } from "@/components/mdx/MDXRender";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CopyLinkButton,
  HeroShowcaseFrame,
  MotionContainer,
} from "./_components/ProjectClientActions";

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

interface AdjacentProject {
  _id: string;
  projectName: string;
  projectSubDesc?: string;
  projectImage: string;
}

async function fetchAdjacentProjects(currentId: string): Promise<{
  prev: AdjacentProject | null;
  next: AdjacentProject | null;
}> {
  await ConnectDB();
  try {
    const all = await Project.find()
      .select("projectName projectSubDesc projectImage priority createdAt")
      .sort({ priority: 1, createdAt: -1 })
      .lean<IProject[]>();

    const index = all.findIndex((p) => p._id?.toString() === currentId);
    if (index === -1) return { prev: null, next: null };

    const prev =
      index > 0
        ? {
            _id: all[index - 1]._id!.toString(),
            projectName: all[index - 1].projectName,
            projectSubDesc: all[index - 1].projectSubDesc,
            projectImage: all[index - 1].projectImage,
          }
        : null;

    const next =
      index < all.length - 1
        ? {
            _id: all[index + 1]._id!.toString(),
            projectName: all[index + 1].projectName,
            projectSubDesc: all[index + 1].projectSubDesc,
            projectImage: all[index + 1].projectImage,
          }
        : null;

    return { prev, next };
  } catch (error) {
    console.error("Error fetching adjacent projects:", error);
    return { prev: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.projectName} | Projects`;
  const description =
    project.projectSubDesc ||
    `Details and architecture case study for ${project.projectName}, built with ${
      project.projectTechStack?.join(", ") || "modern web technologies"
    }.`;

  return {
    title,
    description,
    keywords: [
      project.projectName,
      ...(project.projectTechStack || []),
      "Sandeep Singh",
      "Full Stack Project",
      "Case Study",
      "Web Architecture",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://sandeep-singh.com/project/${id}`,
      images: project.projectImage
        ? [{ url: project.projectImage, alt: project.projectName }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.projectImage ? [project.projectImage] : [],
    },
    alternates: {
      canonical: `https://sandeep-singh.com/project/${id}`,
    },
  };
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
      <div className="py-16 sm:py-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl space-y-6">
          <div className="size-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <FileQuestion className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Project Not Found
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The project you are looking for doesn’t exist or might have been
              removed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="default" className="w-full sm:w-auto">
              <Link href="/project/all-projects">
                <ArrowLeft className="size-4 mr-2" />
                All Projects
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { prev, next } = await fetchAdjacentProjects(id);

  const hasLive = Boolean(project.liveLink && project.liveLink.trim() !== "");
  const hasGithub = Boolean(
    project.githubLink && project.githubLink.trim() !== ""
  );

  return (
    <MotionContainer className="w-full space-y-12">
      {/* 1. Breadcrumb & Top Navigation */}
      <nav
        aria-label="Breadcrumb navigation"
        className="flex items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/project/all-projects"
            className="group inline-flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Projects</span>
          </Link>
          <ChevronRight className="size-3.5 text-zinc-400 opacity-60" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
            {project.projectName}
          </span>
        </div>

        <CopyLinkButton projectName={project.projectName} />
      </nav>

      {/* 2. Hero Header Section */}
      <header className="space-y-6">
        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          {hasLive ? (
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Production Live
            </Badge>
          ) : hasGithub ? (
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-medium"
            >
              <Github className="size-3" />
              Open Source
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20 font-medium"
            >
              <Sparkles className="size-3" />
              Featured Case Study
            </Badge>
          )}
        </div>

        {/* Project Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {project.projectName}
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {hasLive && (
            <Button
              asChild
              size="lg"
              className="gap-2 font-medium shadow-md shadow-zinc-950/10 dark:shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live website for ${project.projectName}`}
              >
                <ExternalLink className="size-4" />
                <span>Visit Live App</span>
              </a>
            </Button>
          )}

          {hasGithub && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-medium border-zinc-200 dark:border-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.projectName} on GitHub`}
              >
                <Github className="size-4" />
                <span>Source Code</span>
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* 3. Browser Showcase Frame */}
      <HeroShowcaseFrame
        imageSrc={project.projectImage}
        projectName={project.projectName}
        liveLink={project.liveLink}
        githubLink={project.githubLink}
      />

      {/* 4. Built With / Tech Stack Section */}
      {project.projectTechStack && project.projectTechStack.length > 0 && (
        <section
          aria-label="Technologies used"
          className="p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xs space-y-4"
        >
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Technologies & Architecture
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.projectTechStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 transition-all select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      <Separator className="bg-zinc-200/80 dark:bg-zinc-800/80" />

      {/* 5. Case Study / Deep Dive Description */}
      <article className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Sparkles className="size-3.5" />
            <span>Case Study</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Project Overview & Implementation
          </h2>
        </div>

        <div className="pt-2">
          <MDXRender content={project.projectDesc} />
        </div>
      </article>

      <Separator className="bg-zinc-200/80 dark:bg-zinc-800/80" />

      {/* 6. Adjacent Projects Navigation */}
      {(prev || next) && (
        <section
          aria-label="Explore other projects"
          className="space-y-4 pt-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Explore More Projects
            </h3>
            <Link
              href="/project/all-projects"
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/project/${prev._id}`}
                className="group relative flex flex-col p-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all space-y-2 text-left"
              >
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous Project</span>
                </div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {prev.projectName}
                </div>
                {prev.projectSubDesc && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {prev.projectSubDesc}
                  </p>
                )}
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {next && (
              <Link
                href={`/project/${next._id}`}
                className="group relative flex flex-col p-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all space-y-2 text-left sm:text-right"
              >
                <div className="flex items-center sm:justify-end gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <span>Next Project</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {next.projectName}
                </div>
                {next.projectSubDesc && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {next.projectSubDesc}
                  </p>
                )}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* 7. Bottom Collaboration CTA */}
      <footer className="p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900/80 dark:via-zinc-900/40 dark:to-zinc-950/80 text-center space-y-4 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Interested in collaborating?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          Have an idea, project, or full-time role you’d like to discuss? Let’s
          connect and build something exceptional together.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="default" className="cursor-pointer">
            <Link href="/contact">
              <MessageSquare className="size-4 mr-2" />
              Get In Touch
            </Link>
          </Button>
          <Button asChild variant="outline" size="default" className="cursor-pointer">
            <Link href="/project/all-projects">
              <Grid className="size-4 mr-2" />
              Browse All Projects
            </Link>
          </Button>
        </div>
      </footer>
    </MotionContainer>
  );
}
