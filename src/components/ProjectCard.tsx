"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, ArrowRight, Activity } from "lucide-react";
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
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="
  group relative flex flex-col overflow-hidden rounded-2xl 
  border border-zinc-800/50 dark:border-zinc-800 
  bg-[#0B0B0E]/90 dark:bg-[#0B0B0E]/90 
  backdrop-blur-xl
  shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)]
  hover:shadow-[0_0_60px_-10px_rgba(0,0,0,0.8)]
  transition-all duration-500
">
  {/* Image Section */}
  <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
    <div className="
      absolute inset-0 
      bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/20
      blur-2xl scale-150 opacity-40
      group-hover:opacity-60 transition-all duration-700
    "/>

    <Image
      src={projectImage}
      alt={projectName}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* Dark gradient overlay */}
    <div className="
      absolute inset-0 
      bg-gradient-to-t from-black/70 via-black/20 to-transparent
      group-hover:from-black/50
      transition-all duration-500
    "/>

    {/* Floating icon buttons */}
    <div className="
      absolute right-4 bottom-4 flex gap-2 
      opacity-0 translate-y-2 
      group-hover:opacity-100 group-hover:translate-y-0 
      transition-all duration-300
    ">
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-2 bg-white/20 dark:bg-zinc-900/50 backdrop-blur-md 
            rounded-full text-white hover:text-blue-400 
            hover:scale-110 transition-all shadow-md
          "
        >
          <Github size={18} />
        </a>
      )}
      {liveLink && (
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-2 bg-white/20 dark:bg-zinc-900/50 backdrop-blur-md 
            rounded-full text-white hover:text-blue-400 
            hover:scale-110 transition-all shadow-md
          "
        >
          <Globe size={18} />
        </a>
      )}
    </div>
  </div>

  {/* Content */}
  <CardContent className="p-6 flex flex-col space-y-4">
    
    {/* Title */}
    <div>
      <h2 className="
        text-xl font-semibold text-white tracking-tight 
        group-hover:text-blue-400 transition-colors
      ">
        {projectName}
      </h2>
      <div className="
        h-1 w-12 bg-blue-500 rounded-full mt-2 
        group-hover:w-20 transition-all
      "/>
    </div>

    {/* Description */}
    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
      {projectSubDesc}
    </p>

    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2">
      {projectTechStack.slice(0, 3).map((tech, index) => (
        <Badge
          key={index}
          className="
            bg-zinc-800 text-zinc-300 border border-zinc-700
            hover:bg-blue-900/40 hover:text-blue-300
            transition-colors
          "
        >
          {tech}
        </Badge>
      ))}
      {projectTechStack.length > 3 && (
        <Badge className="text-xs text-zinc-500 border-zinc-700">
          +{projectTechStack.length - 3}
        </Badge>
      )}
    </div>

    {/* Footer */}
    <div className="
      pt-4 mt-auto border-t border-zinc-800/60 
      flex items-center justify-between
    ">
      <span className="text-xs text-zinc-500 flex items-center gap-1">
        <Activity size={14} className="text-green-400" />
        Active Project
      </span>

      <Link
        href={`/project/${_id}`}
        className="
        flex items-center gap-1 
        text-sm font-medium text-zinc-300 
        hover:text-blue-400 transition-colors
        "
      >
        Details
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>

  </CardContent>
</Card>

    </motion.div>
  );
};

export default ProjectCard;
