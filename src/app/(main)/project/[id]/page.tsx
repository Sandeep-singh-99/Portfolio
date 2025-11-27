// import React from "react";
// import { ConnectDB } from "../../../../../lib/db";
// import Project, { IProject } from "../../../../../models/project.model";
// import { MarkdownRender } from "@/components/MarkdownRender";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// async function fetchProject(id: string): Promise<IProject | null> {
//   await ConnectDB();
//   try {
//     const project = await Project.findById(id).lean<IProject>();
//     if (!project) return null;

//     return {
//       ...project,
//       _id: project._id?.toString(),
//     };
//   } catch (error) {
//     console.error("Error fetching project:", error);
//     return null;
//   }
// }

// export default async function ProjectPageById({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const project = await fetchProject(id);

//   if (!project) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b]">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
//           Project not found
//         </h1>
//         <Link
//           href="/project"
//           className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//         >
//           Back to Projects
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#09090b] pb-20">
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Back Button */}
//         <Link
//           href="/project"
//           className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white pt-10 mb-10 group"
//         >
//           <ArrowLeft size={20} />
//           <span className="font-medium">Back to Projects</span>
//         </Link>

//         {/* --- 1. HERO IMAGE FIRST --- */}
//         <div className="w-full aspect-video relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
//           <Image
//             src={project.projectImage}
//             alt={project.projectName}
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* --- 2. TITLE SECTION --- */}
//         <div className="max-w-4xl mx-auto mt-16 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
//             {project.projectName}
//           </h1>

//           {/* Live & GitHub Links */}
//           <div className="flex items-center justify-center gap-6 mt-6">
//             {project.liveLink && (
//               <a
//                 href={project.liveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//               >
//                 Live Demo
//               </a>
//             )}

//             {project.githubLink && (
//               <a
//                 href={project.githubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-5 py-2 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition dark:bg-zinc-800 dark:hover:bg-zinc-700"
//               >
//                 Source Code
//               </a>
//             )}
//           </div>
//         </div>

//         {/* --- 3. TECH STACK SECTION --- */}
//         <div className="max-w-4xl mx-auto mt-16">
//           <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
//             Tech Stack
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {project.projectTechStack.map((tech, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* --- 4. MAIN DESCRIPTION SECTION --- */}
//         <div className="max-w-4xl mx-auto mt-16">
//           <div className="p-8 md:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
//             <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-img:rounded-2xl">
//               <MarkdownRender content={project.projectDesc} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft size={18} />
            All Projects
          </Link>

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
