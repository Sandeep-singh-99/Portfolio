"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Globe, ArrowRight } from "lucide-react";
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  projectName,
  projectSubDesc,
  projectImage,
  projectTechStack,
  githubLink,
  liveLink,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className="
          group relative flex flex-col overflow-hidden rounded-2xl 
          border border-zinc-200 dark:border-[#1e2939]
          bg-white dark:bg-[#171717] 
          shadow-md hover:shadow-xl dark:shadow-none
          transition-all duration-300
          p-0
        "
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={projectImage}
            alt={projectName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="p-3 flex flex-col space-y-2 flex-grow">
          {/* Header: Title & Links */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {projectName}
            </h2>

            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <TooltipProvider>
                {liveLink && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        <Globe size={20} strokeWidth={1.5} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Preview</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {githubLink && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github size={20} strokeWidth={1.5} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Source Code</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
            {projectSubDesc}
          </p>

          {/* Tech Stack */}
          <div className="mt-2">
            <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 mb-2 uppercase tracking-wider">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectTechStack.slice(0, 3).map((tech, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-center
                    px-2.5 py-1 rounded-md
                    bg-zinc-100 dark:bg-zinc-800/50
                    border border-zinc-200 dark:border-zinc-700/50
                    text-xs font-medium text-zinc-700 dark:text-zinc-300
                  "
                >
                  {tech}
                </div>
              ))}
              {projectTechStack.length > 5 && (
                <div className="text-xs text-zinc-500 flex items-center px-1">
                  +{projectTechStack.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/10 dark:bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
                All Systems Operational
              </span>
            </div>

            <Link
              href={`/project/${_id}`}
              className="
                flex items-center gap-1 
                text-sm font-medium text-zinc-600 dark:text-zinc-400 
                hover:text-zinc-900 dark:hover:text-white transition-colors
              "
            >
              View Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
