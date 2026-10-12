"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  _id: string;
  projectName: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink?: string;
  liveLink?: string;
  priority?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  projectName,
  projectSubDesc,
  projectImage,
  projectTechStack,
  githubLink,
  liveLink,
  priority = false,
}) => {
  const hasGithub = Boolean(githubLink && githubLink.trim() !== "");
  const hasLive = Boolean(liveLink && liveLink.trim() !== "");

  return (
    <motion.div
      initial={priority ? false : { opacity: 0, y: 16 }}
      animate={priority ? { opacity: 1, y: 0 } : undefined}
      whileInView={priority ? undefined : { opacity: 1, y: 0 }}
      viewport={priority ? undefined : { once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <div
        className="
          group relative flex flex-col h-full overflow-hidden rounded-2xl
          border border-zinc-200/90 dark:border-zinc-800/90
          bg-white dark:bg-[#161618]
          hover:border-zinc-300 dark:hover:border-zinc-700
          shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60
          transition-all duration-300
        "
      >
        {/* Clickable Image Section with Status Overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Link
            href={`/project/${_id}`}
            aria-label={`View details for ${projectName}`}
            className="block h-full w-full"
          >
            <Image
              src={projectImage}
              alt={projectName}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>

          {/* Top Status & Live Pill on Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-sm pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase">
                {hasLive ? "Live" : "Project"}
              </span>
            </div>

            {/* Quick Action Icons over image */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <TooltipProvider delayDuration={150}>
                {hasGithub && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${projectName}`}
                        className="
                          p-1.5 rounded-full bg-black/60 backdrop-blur-md 
                          text-white/80 hover:text-white hover:bg-black/85
                          border border-white/10 transition-all duration-200
                        "
                      >
                        <Github className="size-3.5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      View Source
                    </TooltipContent>
                  </Tooltip>
                )}

                {hasLive && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${projectName}`}
                        className="
                          p-1.5 rounded-full bg-black/60 backdrop-blur-md 
                          text-white/80 hover:text-white hover:bg-black/85
                          border border-white/10 transition-all duration-200
                        "
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Live Preview
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow space-y-3">
          {/* Title Header */}
          <div>
            <Link
              href={`/project/${_id}`}
              className="inline-block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                {projectName}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mt-1">
              {projectSubDesc}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {projectTechStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="
                  px-2 py-0.5 rounded-md
                  bg-zinc-100 dark:bg-zinc-800/70
                  border border-zinc-200/80 dark:border-zinc-700/50
                  text-[11px] font-medium text-zinc-700 dark:text-zinc-300
                  transition-colors
                "
              >
                {tech}
              </span>
            ))}
            {projectTechStack.length > 4 && (
              <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1">
                +{projectTechStack.length - 4}
              </span>
            )}
          </div>

          {/* Card Footer: View Details CTA */}
          <div className="pt-3 mt-auto border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              Case Study & Stack
            </span>

            <Link
              href={`/project/${_id}`}
              aria-label={`View details for ${projectName}`}
              className="
                group/btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg
                text-xs font-semibold
                bg-zinc-100 hover:bg-zinc-900 hover:text-white
                dark:bg-zinc-800/80 dark:hover:bg-white dark:hover:text-zinc-900
                text-zinc-800 dark:text-zinc-200
                transition-all duration-200
              "
            >
              <span>View Details</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
